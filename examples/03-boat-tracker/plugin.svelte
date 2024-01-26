<section class="plugin__content">
    <div class="mb-30 centered">
        <div class="button button--variant-orange size-s" on:click={ () => openPlugin('menu') }>Back to menu</div>
    </div>
    {#each listOfBoats as boat}
        {@const { sail, color, rank, heading, total_time } = boat}
        <div class="boat mb-20 size-xs" style:border-left-color={color}>
            <div class="boat__name size-l mb-5">
                {sail}
            </div>
            <div class="boat__rank">
                Rank: {rank}
            </div>
            <div class="boat__heading">
                Heading: {heading}°
            </div>
            <div class="boat__speed">
                {total_time }
            </div>
        </div>
    {/each}
</section>
<script lang="ts">
    import { map } from '@windy/map';
    import { setTitle, setUrl, reset } from '@windy/location';
    import { openPlugin } from '@windy/pluginsCtrl';

    import { onMount, onDestroy } from 'svelte';

    import config from './pluginConfig';
    import { boatIcon } from './boatIcon';

    // IMPORTANT: all types must be import as `type` otherwise
    // Svelte TS compiler will fail
    import type { BoatResult, DisplayedBoat } from './boatTypes';

    const { name, title } = config;

    let markers: L.Marker[] = [];
    let lines: L.Polyline[] = [];

    let listOfBoats: DisplayedBoat[] = [];

    const updateIconStyles = () => {
        for (const marker of markers) {
            if (marker._icon) {
                marker._icon.style.transformOrigin = '12px 12px';
                const heading = marker._icon.getAttribute('data-heading');
                if (marker._icon.style.transform.indexOf('rotateZ') === -1) {
                    marker._icon.style.transform = `${marker._icon.style.transform} rotateZ(${
                        heading || 0
                    }deg)`;
                }
            }
        }
    };

    const loadResults = () => {
        fetch('https://www.windy.com/img/windy-plugins/boats.json')
            .then(response => response.json())
            .then(result => result.result)
            .then((results: Record<string,BoatResult>) => {
                const temporaryListOfBoats: DisplayedBoat[] = [];
                let hue = 0;

                for (const boatName of Object.keys(results)) {

                    // Change color for each boat
                    hue = (hue + 60) % 360;

                    const boat = results[boatName];
                    const { track, heading } = boat;
                    const color = `hsl(${hue}, 100%, 45%)`;

                    const layer = new L.Polyline(track, {
                        color,
                        weight: 2,
                    }).addTo(map);

                    layer.on('mouseover', () => layer.setStyle({ weight: 4 }));
                    layer.on('mouseout', () => layer.setStyle({ weight: 2 }));

                    const marker = new L.Marker(track[track.length - 1], {
                        icon: boatIcon,
                    }).addTo(map);

                    markers.push(marker);
                    marker._icon.setAttribute('data-heading', String(heading));
                    marker.bindPopup(boatName);

                    lines.push(layer);

                    const displayedBoat: DisplayedBoat = { ...boat, color };
                    temporaryListOfBoats.push(displayedBoat);

                    updateIconStyles();
                }

                // Sort temporary list of boats by rank
                listOfBoats = temporaryListOfBoats.sort((a, b) => a.rank - b.rank);

            })
            .catch(console.error);
    };

    const removeAllMapFeatures = () => {
        markers.forEach(l => map.removeLayer(l));
        lines.forEach(l => map.removeLayer(l));
        markers = [];
        lines = [];
    };

    export const onopen = () => {
        setTitle(title);
        setUrl(name,`/plugins/${name}`);
        loadResults();
        map.setView([14, -29], 4);
    };

    onMount(() => {
        map.on('zoom', updateIconStyles);
        map.on('zoomend', updateIconStyles);
        map.on('viewreset', updateIconStyles);
    });

    onDestroy(() => {
        reset(name);
        removeAllMapFeatures();

        map.off('zoom', updateIconStyles);
        map.off('zoomend', updateIconStyles);
        map.off('viewreset', updateIconStyles);
    });
</script>

<style lang="less">
    .plugin__content {
        padding-top: 5px;
    }
    .boat {
        padding-left: 7px;
        border-left: 5px solid;
        &__speed {
            white-space: nowrap;
        }
    }
</style>



