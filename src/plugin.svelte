<div class="plugin__mobile-header">
    { title}
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--with-chevron"
    >
    { title }
    </div>

    <p>
        This is example of standard <code>desktopUI: 'rhpane'</code> plugin layout. Default width of the plugin is 400px, but it can be changed by setting <code>width</code> property in <code>pluginConfig</code> file.
    </p>
    <p>
        Please allow GPS location in your browser to see your location on the map.
    </p>
    <div class="centered m-15">
        <button
            class="button button--variant-orange"
            on:click={ getMyLoc }
        >
            Show my location
        </button>
    </div>
</section>
<script lang="ts">
    import { map, centerMap } from '@windy/map';
    import { getGPSlocation } from '@windy/geolocation';
    import { setTitle, setUrl } from '@windy/location';

    import { onMount, onDestroy } from 'svelte';

    import config from './pluginConfig';

    const { name, title } = config;

    let marker: L.Marker | null = null;

    const getMyLoc = async () => {
        const loc = await getGPSlocation();
        if (loc) {
            centerMap(loc);
            const { lat, lon: lng } = loc;
            marker = new L.Marker({ lat, lng }).addTo(map);
        }
    };

    onMount(() => {
        // Your plugin was mounted
    });

    export const onopen = (params: unknown) => {
        // Main difference between onopen and onMount is that onopen
        // can be called multiple times, while onMount only once

        // onmount also contains paremeters, which are passed to plugin

        // Your plugin is responsible for setting browser title and url
        // using setTitle and setUrl functions
        setTitle(title);

        // URL MUST have a route /plugins/{name}
        setUrl(name,`/plugins/${name}`);

    };

    onDestroy(() => {
        // Your plugin will be destroyed
        // Make sure you clenup after yourself
        if(marker) {
            marker.remove();
            marker = null;
        }
    });
</script>

<style lang="less">
    p {
        line-height: 1.8;
    }
    code {
        color: lightgray;
    }
</style>

