//W.define(

W.loadPlugin(
    {
        name: 'airspaces',
        displayName: 'Airspaces',
        //"hasURL": false,  ?needed
        ident: 'airspaces',
        description: 'Airspaces module used by other plugins,  does not work independently.',
    },
    //    '@plugins/airspaces',
    ['map', 'interpolator', 'picker', 'utils', 'rootScope', 'broadcast', 'store', 'http'],
    function (__exports, mapModule, interpolator, picker, utils, rs, bcast, store, http) {
        let map = mapModule.map;
        //const airspacesThis = this;
        //const { refs:elements } = airspacesThis.window;

        let elements;

        __exports.onmount = (node, refs) => {
            elements = refs;
            fetchSchemaAndCountries();
        };

        __exports.ondestroy = () => {
            removeAllAsp();
        };

        ////can be cut from here if not windy module

        //let map;
        let mapLibre;

        /**
         * @param m - leaflet map
         * @desc - in Windy map = W.map.map,  reference2map not called
         **/
        function reference2map(m, mL) {
            if (m) map = m;
            if (mL) mapLibre = mL;
        }

        function appendAspListToDiv(divId) {
            document.querySelector('#' + divId).appendChild(elements.mainDiv);
        }

        let url3 = 'https://www.openaipgeojson.com/',
            url1 = 'https://www.flymap.org.za/openaip/geojsonbr/',
            //url1 = 'https://www.clreis.co.za/airspace_redirect/',
            url2 = 'https://www.flymap.co.za/openaipgeojson/';
        let url = url1;

        let php = ''; //'getFile.php?fname=';

        let countries;
        let schema;
        const schemaSel = {};
        let typeOrIcao = 'type';
        let position;
        let aspOpac = 0.5;
        let prevLayerAr = []; //previously found layers
        const mapLibreSources = [];

        const createListDiv = (s, col = 'transparent') => {
            let div = document.createElement('div');
            div.className = 'list-line-div';
            let bullet = document.createElement('div');
            bullet.className = 'bullet';
            bullet.style.backgroundColor = col;
            let txt = document.createElement('span');
            txt.innerHTML = s;
            txt.className = 'list-line-div-txt';
            let msg = document.createElement('span');
            msg.classList.add('message');
            msg.innerHTML = '&nbsp;&nbsp;&nbsp;Loading....';
            div.appendChild(bullet);
            div.appendChild(txt);
            div.appendChild(msg);
            return div;
        };

        const fetchSchema = fetchTries => {
            //return fetch('https://www.flymap.org.za/openaip/geojson/' + 'schema.json').then((r) => r.json())
            return fetch(url + php + 'schema.json')
                .then(r => r.json())
                .then(r => {
                    //console.log(r);
                    schema = r;
                    for (let k in schema) {
                        schemaSel[k] = [];
                    }

                    const showAll = k => {
                        schemaSel[k].forEach((e, i, ar) => (ar[i] = true));
                        for (let i in schemaSel[k]) schemaSel[k][i] = true;
                        Array.from(elements[k + 'List'].children)
                            .slice(0, -2)
                            .forEach(e => e.classList.add('highlight'));
                        countries.forEach((c, i) => {
                            applyFilter(k, c);
                        });
                    };

                    const hideAll = k => {
                        schemaSel[k].forEach((e, i, ar) => (ar[i] = false));
                        Array.from(elements[k + 'List'].children)
                            .slice(0, -2)
                            .forEach(e => e.classList.remove('highlight'));
                        countries.forEach((c, i) => {
                            applyFilter(k, c);
                        });
                    };

                    ['type', 'icao'].forEach(k => {
                        for (let ix in schema[k]) {
                            let p = { [k]: ix };
                            //console.log(p);
                            let div = createListDiv(schema[k][ix], aspColor(p));
                            div.classList.add('highlight', 'hidden');
                            elements[k + 'List'].appendChild(div);
                            schemaSel[k][+ix] = true;
                            div.dataset.ix = ix;
                            div.addEventListener('click', () => {
                                if (k != typeOrIcao) {
                                    // if selected according to type,  show all classes.
                                    showAll(typeOrIcao);
                                    typeOrIcao = k;
                                }
                                schemaSel[k][ix] = !schemaSel[k][ix];
                                div.classList[schemaSel[k][ix] ? 'add' : 'remove']('highlight');
                                //console.log(k, schema[k][ix], schemaSel[k][+ix]);
                                countries.forEach(c => {
                                    applyFilter(k, c, ix);
                                });
                                if (position) findAsp(position);
                            });
                        }
                        let addAll = createListDiv('Select All');
                        addAll.firstElementChild.style.opacity = '0';
                        elements[k + 'List'].appendChild(addAll);

                        addAll.addEventListener('click', () => {
                            showAll(k);
                            if (position) findAsp(position);
                        });
                        let remAll = createListDiv('Deselect All');
                        remAll.firstElementChild.style.opacity = '0';
                        elements[k + 'List'].appendChild(remAll);
                        remAll.addEventListener('click', () => {
                            hideAll(k);
                            if (position) findAsp(position);
                        });
                    });
                });
        };

        const fetchLastUpdate = () => {
            return fetch(url + php + 'lastUpdate.json')
                .then(r => r.json())
                .then(r => {
                    //console.log(r);
                    elements.lastUpdate.innerHTML = r.lastUpdate;
                    elements.available.innerHTML = r.airspaces;
                });
        };

        let countryFetchPromise = Promise;
        const fetchCountryList = fetchTries => {
            //http.get(url + php + 'countries.json').then(d => {return d.data})//.then(r => JSON.parse(r))
            countryFetchPromise = fetch(url + php + 'countries.json')
                .then(r => r.json())
                .then(r => {
                    console.log('countries fetched', countries);
                    r.sort((a, b) => (a.name > b.name ? 1 : -1));
                    countries = r;
                    countries.forEach((e, i) => {
                        let countryCode = e.name.slice(-2);
                        let s = e.name.slice(0, -3);
                        s = s[0].toUpperCase() + s.slice(1);
                        for (let j = 0, l = s.length; j < l; j++)
                            if (s[j] == '_')
                                s = s.slice(0, j) + ' ' + s[j + 1].toUpperCase() + s.slice(j + 2);
                        s += ' (' + countryCode + ')';
                        let cntdiv = createListDiv(s);
                        e.cntdiv = cntdiv;
                        cntdiv.addEventListener('click', () => {
                            if (!(countries[i].gjLayer || countries[i].mlLayer)) {
                                cntdiv.classList.add('highlight', 'loading-asp');
                                fetchAsp(i, true).then(() =>
                                    setTimeout(() => cntdiv.classList.remove('loading-asp'), 100),
                                );
                            } else {
                                ////
                                removeLayer(i);
                                ///
                                cntdiv.classList.remove('highlight');
                            }
                            if (position) findAsp(position);
                        });
                        elements.airspaceList.appendChild(cntdiv);
                    });
                    let addAll = createListDiv('Select All');
                    elements.airspaceList.appendChild(addAll);
                    addAll.addEventListener('click', () => {
                        countries.forEach((c, i) => {
                            if (!(c.gjLayer || c.mlLayer)) {
                                c.cntdiv.classList.add('highlight', 'loading-asp');
                                fetchAsp(i).then(() => c.cntdiv.classList.remove('loading-asp'));
                            }
                        });
                        if (position) findAsp(position);
                    });
                    let remAll = createListDiv('Deselect All');
                    elements.airspaceList.appendChild(remAll);
                    remAll.addEventListener('click', () => {
                        countries.forEach((c, i) => {
                            if (countries[i].gjLayer || countries[i].mlLayer) {
                                ////

                                removeLayer(i);
                                ///

                                c.cntdiv.classList.remove('highlight');
                            }
                        });
                        if (position) findAsp(position);
                    });
                })
                .catch(error => {
                    console.error('Error:', error, 'Attempt', fetchTries);
                    if (fetchTries < 3) {
                        setTimeout(fetchCountryList, 2000, fetchTries + 1);
                    } else if (fetchTries < 6) {
                        url = url2;
                        setTimeout(fetchCountryList, 2000, fetchTries + 1);
                    } else
                        elements.aipDiv.innerHTML =
                            'Failed to load country list.<br>You can try to reload plugin.';
                });
            return countryFetchPromise;
        };

        ////drag

        function addDrag() {
            elements.aipInfo.style.top = 'calc(100% - 120px)';
            elements.aipDiv.style.bottom = '120px';
            elements.dragHandle.style.top = 'calc(100% - 120px)';
            let el = elements.dragHandle;
            let top, topOffs;
            let mouseDown = false;
            const handleStart = e => {
                e.preventDefault();
                e.stopPropagation();
                top = el.offsetTop;
                let pos = e.targetTouches ? e.targetTouches[0] : e;
                topOffs = top - pos.pageY;
                mouseDown = true;
            };
            const handleEnd = e => {
                mouseDown = false;
                document.removeEventListener('mouseup', handleEnd);
                document.removeEventListener('mousemove', handleMove);
            };
            const handleCancel = e => {
                console.log('cancel', e);
            };
            const handleMove = e => {
                if (!mouseDown) return;
                let pos = e.targetTouches ? e.targetTouches[0] : e;
                el.style.top = topOffs + pos.clientY + 20 + 'px';
                elements.aipInfo.style.top = topOffs + pos.clientY + 20 + 'px';
                elements.aipDiv.style.bottom =
                    'calc(100% - ' + (topOffs + pos.clientY + 20) + 'px)';
            };
            el.addEventListener('touchstart', handleStart);
            el.addEventListener('touchend', handleEnd);
            el.addEventListener('touchcancel', handleCancel);
            el.addEventListener('touchmove', handleMove);
            el.addEventListener('mousedown', e => {
                handleStart(e);
                document.addEventListener('mouseup', handleEnd);
                document.addEventListener('mousemove', handleMove);
            });
        }
        //addDrag();
        /////

        /////  map interaction,   either  leaflet or mapLibre

        function loadGeoJson2Leaflet(i) {
            countries[i].gjLayer = L.geoJSON(countries[i].asp, {
                style: feature => {
                    return {
                        interactive: false,
                        weight: 1,
                        fill: 0,
                        opacity: aspOpac,
                        color: aspColor(feature.properties),
                    };
                },
                onEachFeature: (feature, layer) => {
                    countries[i].asp.features.find(
                        f => f.properties._id == feature.properties._id,
                    ).featureLayer = layer;
                },
            }).addTo(map);
        }

        function loadGeoJson2mapLibre(i) {
            let n = countries[i].name;

            if (!mapLibreSources.includes(n)) {
                const filter = (k, v) => {
                    if (k == 'featureLayer') return undefined;
                    else return v;
                };
                let clone = JSON.parse(JSON.stringify(countries[i].asp, filter));
                clone.features.forEach(f => {
                    f.properties.ulval =
                        f.properties.ul.value *
                        (f.properties.ul.unit == 1
                            ? 0.3048
                            : f.properties.ul.unit == 6
                              ? 30.48
                              : 1);
                    f.properties.llval =
                        f.properties.ll.value *
                        (f.properties.ll.unit == 1
                            ? 0.3048
                            : f.properties.ll.unit == 6
                              ? 30.48
                              : 1);
                });
                let cloneGJ = {
                    type: 'geojson',
                    data: clone,
                    promoteId: '_id',
                };

                mapLibreSources.push(n);
                mapLibre.addSource(n, cloneGJ);
            }

            let lineColor = ['case'];
            for (let type = 1; type <= 3; type++) {
                lineColor.push(['==', ['get', 'type'], type], aspColor({ type }));
            }
            for (let icao = 0; icao <= 8; icao++) {
                lineColor.push(['==', ['get', 'icao'], icao], aspColor({ icao }));
            }
            lineColor.push('black');

            mapLibre.addLayer({
                id: n,
                type: 'line',
                source: n,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': lineColor,
                    'line-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'no-highlight'], true],
                        aspOpac,
                        1,
                    ],
                    'line-width': [
                        'case',
                        ['boolean', ['feature-state', 'no-highlight'], true],
                        1,
                        3,
                    ],
                },
            });

            for (let ic = 0; ic < 9; ic++) {
                let shift = (ic + 1) * 10;
                mapLibre.addLayer({
                    id: n + '_extrusion_' + ic,
                    type: 'fill-extrusion',
                    source: n, //+'_extrusion',
                    filter: ['==', ['get', 'icao'], ic],
                    paint: {
                        'fill-extrusion-color': lineColor,
                        'fill-extrusion-height': ['number', ['-', ['get', 'ulval'], shift]],
                        'fill-extrusion-base': ['number', ['+', ['get', 'llval'], shift]],
                        'fill-extrusion-opacity': 0.2,
                    },
                    layout: {
                        visibility: on3d ? 'visible' : 'none',
                    },
                });
            }
            countries[i].mlLayer = true;
        }

        function filterTypeIcao() {
            const availType = [],
                availIcao = [];
            countries.forEach(c => {
                if ((map && !c.gjLayer) || (mapLibre && !c.mlLayer)) return;
                c.asp.features.forEach(({ properties: { type, icao } }) => {
                    if (!availType.includes(type)) availType.push(type);
                    if (!availIcao.includes(icao)) availIcao.push(icao);
                });
            });
            for (let c of elements.typeList.children) {
                if (c.dataset.ix === undefined) continue;
                c.classList[availType.includes(+c.dataset.ix) ? 'remove' : 'add']('hidden');
            }
            for (let c of elements.icaoList.children) {
                if (c.dataset.ix === undefined) continue;
                c.classList[availIcao.includes(+c.dataset.ix) ? 'remove' : 'add']('hidden');
            }
            return { availType, availIcao };
        }

        function load(i) {
            if (map) loadGeoJson2Leaflet(i);
            if (mapLibre) loadGeoJson2mapLibre(i);
            filterTypeIcao();
        }

        function removeLayer(i) {
            if (map) {
                map.removeLayer(countries[i].gjLayer);
                delete countries[i].gjLayer;
            }
            if (mapLibre) {
                mapLibre.removeLayer(countries[i].name);
                mapLibre.removeLayer(countries[i].name + '_extrusion');
                countries[i].mlLayer = false;
            }
            filterTypeIcao();
        }

        //only for mapLibre
        function toggleExtrusion(on) {
            on3d = on;
            if (mapLibre) {
                countries.forEach(c => {
                    //console.log(c);
                    if (c.mlLayer) {
                        //console.log(c.name);
                        mapLibre.setLayoutProperty(
                            c.name + '_extrusion',
                            'visibility',
                            on ? 'visible' : 'none',
                        );
                    }
                });
            }
        }

        function fitBounds(bnds) {
            if (map) map.fitBounds(bnds);
            if (mapLibre)
                mapLibre.fitBounds([
                    [bnds[0][1], bnds[0][0]],
                    [bnds[1][1], bnds[1][0]],
                ]);
        }

        /**
         * @param k:  type or icao
         * @param c: country
         * @param ix : index of schemaSelected,  if undefined,  then use position 0,  all will be the same
         **/
        function applyFilter(k, c, ix) {
            if (map) {
                if (c.gjLayer) {
                    c.asp.features.forEach(f => {
                        if (f.properties[k] == ix || ix === undefined) {
                            //f.featureLayer.setStyle({ opacity: schemaSel[k][ix === undefined ? 0 : ix] ? aspOpac : 0 });
                            let keep = schemaSel[k][ix === undefined ? 0 : ix];
                            f.featureLayer[keep ? 'addTo' : 'remove'](map);
                        }
                    });
                }
            }

            if (mapLibre) {
                if (mapLibre.getLayer(c.name)) {
                    mapLibre.setFilter(c.name, [
                        'boolean',
                        ['at', ['get', k], ['literal', schemaSel[k]]],
                    ]);
                    mapLibre.setFilter(c.name + '_extrusion', [
                        'boolean',
                        ['at', ['get', k], ['literal', schemaSel[k]]],
                    ]);
                }
            }
        }

        function highLightFeature(f, country) {
            if (map) {
                f.featureLayer.setStyle({ color: aspColor(f.properties), weight: 2, opacity: 1 });
            }
            if (mapLibre) {
                mapLibre.setFeatureState(
                    { source: country, id: f.properties._id },
                    { 'no-highlight': false },
                );
            }
        }

        function removeHighLight(f, country) {
            if (map) {
                let opacity =
                    schemaSel.type[f.properties.type] && schemaSel.icao[f.properties.icao]
                        ? aspOpac
                        : 0;
                f.featureLayer.setStyle({ color: aspColor(f.properties), weight: 1, opacity });
            }
            if (mapLibre) {
                mapLibre.setFeatureState(
                    { source: country, id: f.properties._id },
                    { 'no-highlight': true },
                );
            }
        }

        ///// end of map interaction

        const getOpac = () => {
            return aspOpac;
        };

        /**
         * fetch and load on available map
         */
        const fetchAsp = function (i, fitbnds, cbf) {
            let bnds = countries[i].bounds[0];
            if (fitbnds) fitBounds(bnds);
            if (!countries[i].fetched) {
                countries[i].fetched = true;
                //http.get(`${url+php}${countries[i].name}.geojson`).then(d => d.data).then(r => {
                return fetch(`${url + php}${countries[i].name}.geojson`)
                    .then(r => r.json())
                    .then(r => {
                        countries[i].asp = r; //JSON.parse(r);
                        load(i);
                        //if (cbf) cbf(countries[i]);  // not used?
                    })
                    .catch(err => {
                        countries[i].fetched = false;
                        console.log('failed to fetch', err);
                    });
            } else if (!countries[i].gjLayer) {
                load(i);
                return Promise.resolve();
                //if (cbf) cbf(countries[i]);   //not used
            }
        };

        const aspColor = function (p) {
            let n =
                p.type !== void 0 && Number(p.type) >= 1 && Number(p.type <= 3)
                    ? schema.type[p.type]
                    : p.icao !== void 0
                      ? schema.icao[p.icao]
                      : 'default';

            let light = true;

            if (light) {
                switch (n.toUpperCase()) {
                    case 'RESTRICTED':
                        return 'lightpink';
                    case 'PROHIBITED':
                        return 'orange';
                    case 'DANGER':
                        return 'orangered';
                    case 'CTR':
                        return 'lightblue';
                    case 'A':
                        return 'yellow';
                    case 'B':
                        return 'white';
                    case 'C':
                        return 'cyan';
                    case 'D':
                        return 'aqua';
                    case 'E':
                        return 'peachpuff';
                    case 'F':
                        return 'lawngreen';
                    case 'B':
                        return 'lightcyan';
                    case 'G':
                        return 'lightyellow';
                    case 'SUA':
                        return 'lightgreen';
                    //case 'WAVE': return 'mistyrose';
                    //case 'RMZ': return 'palegreen';
                    //case 'gliding': return 'lightsalmon';
                    //case 'FIR': return 'aquamarine';
                    default:
                        return 'white';
                }
            } else {
                switch (n.toUpperCase()) {
                    //dark colors
                    case 'RESTRICTED':
                        return 'pink';
                    case 'PROHIBITED':
                        return 'darkorange';
                    case 'DANGER':
                        return 'orangered';
                    case 'CTR':
                        return 'blue';
                    case 'A':
                        return 'darkblue';
                    case 'C':
                        return 'darkcyan';
                    case 'D':
                        return 'DarkTurquoise';
                    case 'E':
                        return 'brown';
                    case 'F':
                        return 'darkgreen';
                    case 'B':
                        return 'cyan';
                    case 'G':
                        return 'fuchsia';
                    case 'SUA':
                        return 'green';
                    default:
                        return 'rgb(20,20,20)';
                }
            }
        };

        function fetchSchemaAndCountries() {
            fetchLastUpdate(0);
            fetchSchema(0);
            fetchCountryList(0);
            addDrag();
        }
        if (elements) fetchSchemaAndCountries(); //   do this when elements exist,  with windy,  use onmount function

        //algorithm from github - substack - point-in-polygon, MITlic
        const checkPoly = function (point, vs) {
            var x = point[0],
                y = point[1];
            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i][0],
                    yi = vs[i][1];
                var xj = vs[j][0],
                    yj = vs[j][1];
                var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
                if (intersect) inside = !inside;
            }
            return inside;
        };
        ///

        function altUnit(u) {
            switch (schema.altUnit[u].toUpperCase()) {
                case 'FEET':
                    return 'ft';
                case 'FLIGHT LEVEL':
                    return 'FL';
                case 'METER':
                    return 'm';
            }
        }
        function makeText4Picker(aspAr) {
            let txt = '';
            aspAr.forEach(p => {
                txt += `<div onclick='
                    let d=this.nextElementSibling;
                        if(d.style.display=="none"){
                            d.style.display=""
                        } else{
                            d.style.display="none"
                        }' style = 'color:${aspColor(p)}; cursor:pointer; z-Index:999; word-wrap:normal;'>
                        ${p.name} &nbsp;&nbsp;&nbsp;
                    </div>
                    <div style='display:none'>
                        <span style='font-size:9px;'>&nbsp;&nbsp;Cat:&nbsp;${schema.icao[p.icao]}</span><br>
                        <span style='font-size:9px;'>&nbsp;&nbsp;Type:&nbsp;${schema.type[p.type]}</span><br>
                        <span style='font-size:9px;'>&nbsp;&nbsp;${p.ll.value}${altUnit(p.ll.unit)} ${schema.altRef[p.ll.referenceDatum]}-${p.ul.value}${altUnit(p.ul.unit)} ${schema.altRef[p.ul.referenceDatum]}</span>
                    </div>`;
            });
            return txt;
        }
        function makeText4Info(aspAr) {
            let txt = '';
            aspAr.forEach(p => {
                txt += `<div><b>${p.name}</b></div>
                    <div>
                        <span style='font-size:10px;'>&nbsp;&nbsp;&nbsp;&nbsp;Cat:&nbsp;${schema.icao[p.icao]}</span>
                        <span style='font-size:10px;'>&nbsp;&nbsp;&nbsp;&nbsp;Type:&nbsp;${schema.type[p.type]}</span><br>
                        <span style='font-size:10px;'>&nbsp;&nbsp;&nbsp;&nbsp;${p.ll.value}${altUnit(p.ll.unit)} ${schema.altRef[p.ll.referenceDatum]}-${p.ul.value}${altUnit(p.ul.unit)} ${schema.altRef[p.ul.referenceDatum]}</span><br>
                        ${p.freq ? '<span style="font-size:9px;">&nbsp;&nbsp&nbsp;&nbsp;Freq:&nbsp; ' + p.freq[0].val + '</span>' : ''}
                        <br><br>
                    </div>`;
            });
            return txt;
        }

        //--find airspace:
        function findAsp(e, showInInfo) {
            let txt = '';
            let aspAr = [];

            position = e;

            if (countries) {
                let c = [e.lon || e.lng, e.lat]; //points obj for geojson
                let cc = [e.lat, e.lon || e.lng]; //points obj for leaflet

                let layerAr = []; // found layers

                /** b: [[ minlat , minlng], [maxlat, maxlng]],
                 *  c: [lat,lng] */
                const contains = (b, cc) =>
                    cc[0] >= b[0][0] && cc[0] <= b[1][0] && cc[1] >= b[0][1] && cc[1] <= b[1][1];

                const cntryBounds = i => countries[i].bounds.some(bb => contains(bb, cc));

                for (let i = 0; i < countries.length; i++) {
                    if (
                        (countries[i].gjLayer ||
                            (mapLibre && mapLibre.getLayer(countries[i].name))) &&
                        cntryBounds(i)
                    ) {
                        let { features } = countries[i].asp;
                        features.forEach(f => {
                            if (
                                contains(f.properties.bnd, cc) && //airspace bounds stored in properties.
                                (isNaN(f.properties.type) || schemaSel.type[f.properties.type]) &&
                                (isNaN(f.properties.icao) || schemaSel.icao[f.properties.icao])
                            ) {
                                if (checkPoly(c, f.geometry.coordinates[0])) {
                                    aspAr.push(f.properties);
                                    layerAr.push({ f, country: countries[i].name });
                                    highLightFeature(f, countries[i].name);
                                }
                            }
                        });
                    }
                }
                prevLayerAr.forEach(({ f, country }) => {
                    let id = f.properties._id;
                    let prevFeaturePersists = layerAr.find(({ f: ff }) => ff.properties._id == id);
                    if (!prevFeaturePersists) {
                        removeHighLight(f, country);
                    }
                });
                txt = makeText4Picker(aspAr);
                prevLayerAr = layerAr.map(e => e);
            }
            elements.aipInfo.innerHTML = makeText4Info(aspAr);

            return { txt, aspAr };
        }

        function clearAsp() {
            //clear all airspaces highlights
            prevLayerAr.forEach(({ f, country }) => removeHighLight(f, country));
            prevLayerAr = [];
        }

        function removeAllAsp() {
            countries.forEach(c => {
                if (map && c.gjLayer) {
                    map.removeLayer(c.gjLayer);
                    delete c.gjLayer;
                }
                if (mapLibre && c.mlLayer) {
                    mapLibre.removeLayer(c.name);
                    mapLibre.removeLayer(c.name + '_extrusion');
                    c.mlLayer = false;
                }
                c.cntdiv.classList.remove('highlight');
            });
        }

        function setOpac(op) {
            //change opacity
            /*  todo
            aspOpac = op / 100;
            for (let i = 0; i < countries.length; i++) {
                if (countries[i].gjLayer) {
                    countries[i].asp.features.forEach(f => {
                        //if not highlighted then set opac
                        if (prevLayerAr.find(pl => pl.properties._id == f.properties._id)) {
                            e.setStyle({ color: aspColor(e.feature.properties), weight: 1, opacity: aspOpac });
                        }
                    });
                }
            };
            */
        }

        function getCountries() {
            return countryFetchPromise.then(() => countries);
        }

        //export default { findAsp, clearAsp, opac, appendAspListToDiv, reference2map, plugins_openAIPasp };
        //return
        __exports.airspaces = {
            findAsp,
            clearAsp,
            getCountries,
            appendAspListToDiv,
            reference2map,
            prevLayerAr,
            elements,
            //plugins_openAIPasp,
            fetchAsp,
            findAsp,
            clearAsp,
            removeAllAsp,
            load,
            setOpac,
            getOpac,
            toggleExtrusion, //only applicable for mapLibre
        };
    },

    /////// to here

    `<div id="openaip_airspaces_id" data-ref="mainDiv">
    <div class="aipHead">
        <a style="text-decoration:underline" href="http://www.openaip.net" target="_blank">openAIP</a>  airspaces:
    </div>
    <div  data-ref="aipDiv" class="plugin-content">
        <input type="checkbox" class="section-checkbox"/>
        <label class="section-head">Country List</label>
        <div class="space-div"></div>
        <div data-ref="airspaceList" class=" airspace-list"></div>

        <input type="checkbox" class="section-checkbox"/>
        <label class="section-head">Select Type</label>
        <div class="space-div"></div>
        <div data-ref="typeList" class="type-list"></div>

        <input type="checkbox" class="section-checkbox"/>
        <label class="section-head">Select Icao Class</label>
        <div class="space-div"></div>
        <div data-ref="icaoList" class="icao-list"></div>

    </div>
    <div  data-ref="aipInfo" class="plugin-content aipInfo">
    </div>
    <div  class="aipFoot">
        Airspaces data from <a style="text-decoration:underline" href="http://www.openaip.net" target="_blank">openAIP</a>.<br>
        Available airspaces: <span data-ref="available"></span>. Updated: <span data-ref="lastUpdate"></span>.
    </div>
    <div data-ref="dragHandle" class="drag-handle">

    </div>
</div>`,
    `[data-ref="aipDiv"]{position:absolute;top:30px !important;width:100%;background-color:transparent !important;border-style:solid !important;border-width:.75px 0 !important;border-color:rgba(128,128,128,0.5) !important;border-radius:0px !important;color:inherit !important}[data-ref="aipDiv"] .section-head{position:relative;font-size:16px;line-height:1.4em}[data-ref="aipDiv"] .section-checkbox{font-size:16px;-webkit-appearance:none;appearance:none;background-color:transparent;width:30px;color:inherit !important;cursor:pointer}[data-ref="aipDiv"] .section-checkbox:focus{outline:0}[data-ref="aipDiv"] .section-checkbox::before{content:'\\25BD\\00a0\\00a0'}[data-ref="aipDiv"] .section-checkbox:checked::before{padding-top:3px;content:'\\25B7\\00a0\\00a0'}[data-ref="aipDiv"] .space-div{height:2px}[data-ref="aipDiv"] .section-checkbox:checked+label+.space-div{height:10px}[data-ref="aipDiv"] .section-checkbox:checked+label+.space-div+div{display:none}[data-ref="aipDiv"] .section-content{margin-bottom:4px}[data-ref="aipDiv"] .icao-list{padding-bottom:10px}.list-line-div{margin:1px;border:0px;font-size:13px;line-height:1.3;margin-left:15px}.list-line-div .bullet{height:8px;width:8px;border-radius:8px;border:1px solid;display:inline-block;margin-right:10px;opacity:0}.list-line-div .list-line-div-txt{padding:1px;cursor:pointer;border-radius:3px;width:fit-contents;opacity:.8}.list-line-div.highlight .list-line-div-txt{font-weight:bold;opacity:1}.list-line-div.highlight .bullet{opacity:1}.list-line-div .message{display:none}.list-line-div.loading-asp .message{display:inline-block}.list-line-div .closing-x-small{text-transform:none;line-height:1.3;color:white;background-color:#9D0300;cursor:pointer;position:absolute;margin:2px 0px 0px 12px;font-size:10px;z-index:10;width:1.3em;height:1.3em;border-radius:1.3em;display:none;opacity:.5;text-align:center}.list-line-div .closing-x-small::before{content:"\\2716"}.list-line-div:hover .closing-x-small{opacity:1}.list-line-div:hover .list-line-div-txt{background-color:rgba(0,0,0,0.3);padding:0px 4px 0px 4px}.list-line-div.hidden{display:none}.aipHead{position:absolute;font-size:14px;font-weight:bold;height:20px;margin:5px 0px 0px 1px}.aipInfo{position:absolute;padding:5px;font-size:11px;color:black;bottom:27px;width:100%;overflow-y:scroll;background-color:transparent !important;border-style:solid !important;border-width:.75px 0 !important;border-color:rgba(128,128,128,0.5) !important;border-radius:0px !important;color:inherit !important}.aipFoot{position:absolute;font-size:9px;bottom:0px;height:27px;margin-left:1px}.drag-handle{box-sizing:border-box;height:30px;width:90px;position:absolute;margin-left:-45px;margin-top:-15px;left:calc(50%);cursor:pointer}.drag-handle::before{content:' ';box-sizing:border-box;position:absolute;left:30px;top:10px;width:30px;height:10px;border:1px solid #969696;border-radius:4px;background-color:rgba(230,230,230,0.5)}`,
);
