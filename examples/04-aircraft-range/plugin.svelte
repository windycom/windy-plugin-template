<div class="plugin__mobile-header">
    { title }
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={ () => bcast.emit('rqstOpen', 'menu') }
    >
    { title }
    </div>
    <p>
        This plugin requires lat, lon as starting parameter.
    </p>
    <p>
        It can be opened from the contextmenu (RH mouse click on map) and it is sensitive to singleclicks on the map.
    </p>
    <p class="size-l">
        Click on the map to change the location.
    </p>
    <hr />
    {#each aircrafts as aircraft,index }
        {@const { model, passenger_capacity, range, max_speed, icao, length, wingspan } = aircraft}
        <div class="card mb-20 clickable" class:selected={ index === selected } on:click={ () => selected = index }>
            <div class="card__wrapper">
                <div class="card__image" style="background-image:url('https://gallery-admin.windy.com/albums/a/jet.jpg?w=300')">
                    <span class="badge fg-white size-xs bg-red">{ icao }</span>
                </div>
                <div class="card__content">
                    <div class="card__title">
                    { model }
                    </div>
                    Capacity: { passenger_capacity }PAX. Range: {range}. Max speed: {max_speed}kt, Length: {length}m, Wingspan: {wingspan}m
                </div>
            </div>
        </div>
    {/each}
</section>
<script lang="ts">
    import bcast from "@windy/broadcast";
    import { map, centerMap, markers } from '@windy/map';
    import { singleclick } from '@windy/singleclick';
    import { getMyLatestPos } from "@windy/geolocation";
    import { setUrl } from "@windy/location";

    import { onDestroy, onMount } from 'svelte';

    import config from './pluginConfig';
    import { database, type Airplane } from './aircraftDb';

    import type { LatLon } from '@windy/interfaces';

    const { name, title } = config;

    let marker: L.Marker | null = null;
    let circle: L.Circle | null = null;

    let selected = 0;
    let selectedLat: number = 50;
    let selectedLon: number = 14;

    const filteredAircrafts = database.filter(({range}) => range > 500 && range < 2500);

    // Randomize an array
    for (let i = filteredAircrafts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredAircrafts[i], filteredAircrafts[j]] = [filteredAircrafts[j], filteredAircrafts[i]];
    }

    const aircrafts: Airplane[] = filteredAircrafts;

    const removeMapItems = () => {
        if(marker) {
            marker.remove();
            marker = null;
        }
        if(circle) {
            circle.remove();
            circle = null;
        }
    }

    const drawMarkerAndCircle = ( latLon: LatLon, range: number) => {
        removeMapItems();

        const { lat, lon } = latLon ;
        marker = new L.Marker({ lat, lng: lon },{ icon: markers.pulsatingIcon }).addTo(map);
        circle = new L.Circle({ lat, lng: lon }, { radius: range * 1000 }).addTo(map);
    }

    // IMPORTANT: Whenever user clicks on a map and location is changed,
    // we need to update the URL so that the plugin can be opened with the same location
    // after reload. setUrl method is used for this purpose and as a parameters requires
    // the name of the plugin and same object as the plugin was opened with.
    $: setUrl( name, { lat: selectedLat, lon: selectedLon });

    $: drawMarkerAndCircle({ lat: selectedLat, lon: selectedLon }, aircrafts[selected].range );

    const setLocation = (latLon: LatLon) => {
        const { lat, lon } = latLon;
        selectedLat = lat;
        selectedLon = lon;

        removeMapItems();

    }

    export const onopen = (params?: LatLon) => {

        if(!params) {
            // Plugin was opened from main menu, and therefore we
            // lack any opening parameters
            params = getMyLatestPos();
        }

        const { lat, lon } = params;
        centerMap({ lat, lon, zoom: 3});
        setLocation(params);
    };

    onMount(() => {
        singleclick.on(name, setLocation)
    });

    onDestroy(() => {
        removeMapItems();
        singleclick.off(name, setLocation);
    });
</script>

<style lang="less">
    .card {
        &.selected {
            border: 2px solid darkorange;
        }
    }
    p {
        line-height: 1.8;
    }
</style>

