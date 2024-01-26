<div class="plugin__mobile-header">
    { title }
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={ () => openPlugin('menu') }
    >
    { title }
    </div>
    <p>
        This plugin requires lat, lon as params. It can be opened from the contextmenu (RH mouse click on map).
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
    import { map, centerMap, markers } from '@windy/map';
    import { setTitle, setUrl, reset } from '@windy/location';
    import { openPlugin } from '@windy/pluginsCtrl';
    import { normalizeLatLon } from '@windy/utils';

    import { onDestroy } from 'svelte';

    import config from './pluginConfig';
    import { database, type Airplane } from './aircraftDb';

    import type { LatLon } from '@windy/interfaces';

    const { name, title } = config;

    let marker: L.Marker | null = null;

    let selected = 0;

    const aircrafts: Airplane[] = database.filter(aircraft => /Citation/.test(aircraft.model));

    // This plugin is ALWAYS opened wit { lat, lon } as params
    export const onopen = (params: LatLon & { source: string }) => {
        const { lat, lon } = params;

        if(marker) {
            marker.remove();
            marker = null;
        }

        marker = new L.Marker({ lat, lng: lon },{ icon: markers.pulsatingIcon }).addTo(map);

        const circle = new L.GeodesicCircle({ lat, lng: lon }, 1000, {
            color: 'red',
            weight: 2,
            opacity: 0.5,
            fillColor: 'red',
            fillOpacity: 0.1,
        }).addTo(map);

        centerMap(params);

        setTitle(title);

        // Lat, lon should be displayed in URL as /plugins/aircraft-range/lat/lon
        // in order to enable sharing and reloads
        setUrl(name,`/plugins/${name}/${normalizeLatLon(lat)}/${normalizeLatLon(lon)}`);
    };

    onDestroy(() => {
        // Your plugin will be destroyed
        // Make sure you clenup after yourself
        if(marker) {
            marker.remove();
            marker = null;
        }

        // Whenever closing your plugin you MUST reset
        // modified title and URL
        reset(name);
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

