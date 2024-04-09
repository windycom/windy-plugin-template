<div class="plugin__mobile-header">
    {title}
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={() => bcast.emit('rqstOpen', 'menu')}
    >
        {title}
        {#if reverseName && loc}
            {@const { lat, lon } = loc}
            <div class="plugin__title__subtitle">
                {reverseName} at {normalizeLatLon(lat)}, {normalizeLatLon(lon)}
            </div>
        {/if}
    </div>

    {#if queryString}
        <a href="https://www.meteoblue.com/" target="_blank" rel="noreferrer" class="mb-30">
            <img src="{baseUrl}?{queryString}" /></a
        >
    {:else}
        <p>Loading...</p>
    {/if}

    <div class="size-l mt-15">
        🤚🏻 Drag the marker or click anywhere in the map to change location.
    </div>

    <div class="rounded-box mt-30 bg-secondary">
        <p class="mt-30">
            Swiss🇨🇭 company <a href="https://www.meteoblue.com/" class="dotted" target="_top"
                >Meteoblue</a
            > provides the best point forecast we are aware of.
        </p>
        <p>
            They combine multiple numerical models, enhance it with actual radar and satellite data,
            and using AI, they provide the best point forecast for the next days.
        </p>
        <p>
            For non commercial use (hope Windy.com is eligible for that), they enable to embed their
            meteograms.
        </p>
    </div>
</section>

<script lang="ts">
    import bcast from '@windy/broadcast';
    import { getGPSlocation } from '@windy/geolocation';
    import { map } from '@windy/map';
    import { setTitle } from '@windy/location';
    import * as reverse from '@windy/reverseName';
    import { isValidLatLonObj, qs, normalizeLatLon } from '@windy/utils';
    import { singleclick } from '@windy/singleclick';
    import metrics from '@windy/metrics';

    import { onDestroy, onMount } from 'svelte';

    import config from './pluginConfig';

    import type { LatLon } from '@windy/interfaces.d';

    let marker: L.Marker | null = null;
    let loc: LatLon | null = null;
    let reverseName: string | null = null;
    let queryString: string | null = null;

    const { title, name } = config;
    const baseUrl = 'https://my.meteoblue.com/images/meteogram';

    const draggablePulsatingIcon = new L.DivIcon({
        className: 'icon-dot wp-mb-mg-cursor-move',
        html: '<div class="pulsating-icon repeat"></div>',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
    });

    const hideMarker = () => {
        if (marker) {
            marker.remove();
            marker = null;
        }
    };

    // kmh" "ms-1" "mph" "kn" "bft"
    const windyUnits2MeteoblueUnits = {
        '°C': 'C',
        '°F': 'F',
        'm/s': 'ms-1',
        'km/h': 'kmh',
        mph: 'mph',
        kt: 'kn',
        bft: 'bft',
        mm: 'mm',
        in: 'inch',
    };

    const createQueryString = (lat: number, lon: number) => {
        const tempUnit = metrics.temp.metric as keyof typeof windyUnits2MeteoblueUnits;
        const windUnit = metrics.wind.metric as keyof typeof windyUnits2MeteoblueUnits;
        const precipUnit = metrics.rain.metric as keyof typeof windyUnits2MeteoblueUnits;

        queryString = qs({
            lat,
            lon,
            temperature_units: windyUnits2MeteoblueUnits[tempUnit],
            wind_units: windyUnits2MeteoblueUnits[windUnit],
            precipitation_units: windyUnits2MeteoblueUnits[precipUnit],
            windspeed_units: windyUnits2MeteoblueUnits[windUnit],
            format: 'webp',
            apikey: 'XCqirFfRTW8tBuQc',
        });
    };

    const showMeteogram = ({ lat, lon }: LatLon) => {
        loc = { lat, lon };

        hideMarker();
        createQueryString(lat, lon);

        marker = L.marker([lat, lon], {
            draggable: true,
            icon: draggablePulsatingIcon,
        }).addTo(map);

        marker.on('dragend', function (event) {
            const { lat, lng } = event.target.getLatLng();
            showMeteogram({ lat, lon: lng });
        });

        reverse.get(loc).then(({ name }) => {
            reverseName = name;
            setTitle(`MB meteogram for ${name}`);
        });
    };

    // If plugin is opened from RH menu, it is called with location
    // if not, the location param is undefined
    export const onopen = (location?: LatLon) => {
        reverseName = null;
        queryString = null;
        if (isValidLatLonObj(location)) {
            showMeteogram(location);
        } else {
            getGPSlocation()
                .then(loc => {
                    const zoom = Math.max(8, map.getZoom());
                    map.setView([loc.lat, loc.lon], zoom, { animate: true });
                    showMeteogram(loc);
                })
                .catch(e => {
                    console.error(e);
                });
        }
    };

    onMount(() => {
        singleclick.on(name, showMeteogram);
    });

    onDestroy(() => {
        singleclick.off(name, showMeteogram);
        hideMarker();
    });
</script>

<style lang="less">
    img {
        width: 100%;
    }
    p {
        line-height: 1.8;
    }
    :global(.wp-mb-mg-cursor-move) {
        z-index: 1000;
        cursor: move;
    }
</style>
