# Display WKT, GPX, KML, topoJSON, CSV on Windy
Using [Leaflet's Omnivore Plugin](https://github.com/mapbox/leaflet-omnivore) we can display quite a bunch of formats on Windy.

Use omnivore just in case of emergency. Recommended format is **GeoJSON**

## Examples of displayed format
### CSV
```
lat,lon,name
50,14,"Hello World"
51,14.2,"I am other point"
```

### GPX
```html
<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/0" version="1.0" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd" creator="gpx.py -- https://github.com/tkrajina/gpxpy">
<rte>
<rtept lat="44.907783722" lon="6.05487864642">
<ele>1298.0</ele></rtept>
<rtept lat="44.9077732488" lon="6.05518996909">
<ele>1301.0</ele></rtept>
<rtept lat="44.9077638115" lon="6.05547047546">
<ele>1304.0</ele></rtept>
```

### KML
```html
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Placemark>
    <name>Simple placemark</name>
    <description>Attached to the ground. Intelligently places itself
       at the height of the underlying terrain.</description>
    <Point>
      <coordinates>-122.0822035425683,37.42228990140251,0</coordinates>
    </Point>
  </Placemark>
  <Placemark>
    <name>Simple placemark two</name>
    <description>Attached to the ground. Intelligently places itself
       at the height of the underlying terrain.</description>
    <Point>
      <coordinates>-120.0822035425683,37.42228990140251,0</coordinates>
    </Point>
  </Placemark>
</kml>
```

### WKT
```js
MultiPoint(20 20, 10 10, 30 30)
```

### Polyline
```js
{"type":"Topology","objects":{"collection":{"type":"GeometryCollection","geometries":[{"type":"LineString","arcs":[0]}]}},"arcs":[[[0,2202],[3273,6332],[655,-8534],[1726,7176],[4345,2823]]],"bbox":[3.1640625,41.77131167976407,62.22656249999999,54.57206165565852],"transform":{"scale":[0.005906840684068406,0.0012802030178912344],"translate":[3.1640625,41
```


-----------------

See [Windy Plugins API](../docs/WINDY_PLUGIN.md) to have better idea how plugin system works or [Windy API documentation](../docs/WINDY_API.md)
