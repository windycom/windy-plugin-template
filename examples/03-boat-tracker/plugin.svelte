<!--
    This plugin have different UI for desktop and mobile devices,
    since it uses mobileUI: small configuration.render

    For mobile devices the list of boat is stacked horizontally.
-->
{#if isMobileOrTablet}
    <section class="mobile-boat-ui horizontal-scroll">
        {#each listOfBoats as boat}
            {@const { sail, color, rank, heading } = boat}
            <div
                class="boat mr-20 size-xs clickable"
                style:border-left-color={color}
                on:click={() => displayPopup(sail)}
            >
                <div class="boat__name size-l mb-5">
                    {sail}
                </div>
                <div class="boat__heading nowrap">
                    Rank: {rank}<br />
                    Heading:&nbsp;{heading}°
                </div>
            </div>
        {/each}
    </section>
{:else}
    <section class="plugin__content">
        <div class="mb-30 centered">
            <div
                class="button button--variant-orange size-s"
                on:click={() => bcast.emit('rqstOpen', 'menu')}
            >
                Back to menu
            </div>
        </div>
        {#each listOfBoats as boat}
            {@const { sail, color, rank, heading, total_time } = boat}
            <div
                class="boat mb-20 size-xs clickable"
                style:border-left-color={color}
                on:click={() => displayPopup(sail)}
            >
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
                    {total_time}
                </div>
            </div>
        {/each}
    </section>
{/if}

<script lang="ts">
    import bcast from '@windy/broadcast';
    import { map } from '@windy/map';
    import { isMobileOrTablet } from '@windy/rootScope';
    import { getLatLonInterpolator } from '@windy/interpolator';
    import store from '@windy/store';
    import { wind2obj } from '@windy/utils';
    import metrics from '@windy/metrics';

    import { onMount, onDestroy } from 'svelte';

    import { boatIcon } from './boatIcon';

    // IMPORTANT: all types must be imported as `type` otherwise
    // Svelte TS compiler will fail
    import type { BoatResult, DisplayedBoat, ExtendedMarker } from './boatTypes';

    import type { CoordsInterpolationFun } from '@windy/interpolator';

    let markers: ExtendedMarker[] = [];
    let lines: L.Polyline[] = [];
    let listOfBoats: DisplayedBoat[] = [];
    let openedPopup: L.Popup | null = null;

    const updateIconStyles = () => {
        for (const extendedMarker of markers) {
            const { marker } = extendedMarker;
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

    const displayPopup = (sail: string) => {
        openedPopup?.remove();

        const clickedBoat: ExtendedMarker | void = markers.find(m => m.sail === sail);

        if (!clickedBoat) {
            throw new Error('Boat not found!');
        }

        // Now we interpolate weather values for the
        // position of the boat
        getLatLonInterpolator().then((interpolateLatLon: CoordsInterpolationFun | null) => {
            let html = `Sail: ${sail}<br /><br />`;
            const { latestPosition } = clickedBoat;
            const [lat, lon] = latestPosition;

            if (!interpolateLatLon) {
                html += 'No interpolator available<br />for this overlay';
            } else if (store.get('overlay') !== 'wind') {
                html +=
                    'For sake of the simplicity, we<br />interpolate only wind values.<br />Please select wind overlay.';
            } else {
                // Interpolated values can be either invalid (NaN, null, -1)
                // or array of numbers
                const interpolated = interpolateLatLon({ lat, lon });

                if (Array.isArray(interpolated)) {
                    // I everything works well, we should get raw meterological values
                    // for the position of the boat, as the are in the wind overlay RGBA tile

                    const { dir, wind } = wind2obj(interpolated);

                    // This will convert wind speed form m/s to user's preferred units
                    const windSpeed = metrics.wind.convertValue(wind);

                    html += `Wind speed: ${windSpeed}<br />`;
                    html += `Wind direction: ${dir}°<br />`;
                } else {
                    html += 'No interpolated values available for this position';
                }
            }

            openedPopup = new L.Popup({ autoClose: false, closeOnClick: false })
                .setLatLng(latestPosition)
                .setContent(html)
                .openOn(map);
        });
    };

    const loadResults = () => {
        fetch('https://www.windy.com/img/windy-plugins/boats.json')
            .then(response => response.json())
            .then(result => result.result)
            .then((results: Record<string, BoatResult>) => {
                const temporaryListOfBoats: DisplayedBoat[] = [];
                let hue = 0;

                for (const boatName of Object.keys(results)) {
                    // Change color for each boat
                    hue = (hue + 60) % 360;

                    const boat = results[boatName];
                    const { track, heading, sail } = boat;
                    const color = `hsl(${hue}, 100%, 45%)`;

                    const layer = new L.Polyline(track, {
                        color,
                        weight: 2,
                    }).addTo(map);

                    layer.on('mouseover', () => layer.setStyle({ weight: 4 }));
                    layer.on('mouseout', () => layer.setStyle({ weight: 2 }));

                    const latestPosition = track[track.length - 1];
                    const marker = new L.Marker(latestPosition, {
                        icon: boatIcon,
                    }).addTo(map);

                    markers.push({ sail, marker, latestPosition });
                    marker._icon?.setAttribute('data-heading', String(heading));
                    marker.on('click', () => displayPopup(sail));

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
        openedPopup?.remove();
        markers.forEach(l => map.removeLayer(l.marker));
        lines.forEach(l => map.removeLayer(l));
        markers = [];
        lines = [];
    };

    export const onopen = () => {
        loadResults();
        map.setView([14, -29], 4);

        // This is BAD UX practice, we should not change the user's
        // layer, but we do it here for the sake of the example
        // and also we want to demonstrate interpolation of wind values
        store.set('overlay', 'wind');
    };

    onMount(() => {
        map.on('zoom', updateIconStyles);
        map.on('zoomend', updateIconStyles);
        map.on('viewreset', updateIconStyles);
    });

    onDestroy(() => {
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
    .mobile-boat-ui {
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: auto;
    }
</style>
