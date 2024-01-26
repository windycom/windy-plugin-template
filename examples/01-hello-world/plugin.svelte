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
        This is example of standard <code>desktopUI: 'rhpane'</code> plugin layout. Default width of the plugin is 400px, but it can be changed by setting <code>desktopWidth</code> property in <code>pluginConfig.ts</code> file.
    </p>
    <p>
        Please allow GPS location in your browser to see your location on the map.
    </p>
    <div class="centered m-15">
        <button
            class="button button--variant-orange"
            class:button--loading={ loader }
            on:click={ getMyLoc }
        >
            Show my location
        </button>
    </div>
    <hr />
    {#each lines as line,index}
        <p style:opacity={ ( 100 - index ) / 100 }>{ line }</p>
    {/each}
</section>
<script lang="ts">
    import { map, centerMap } from '@windy/map';
    import { getGPSlocation } from '@windy/geolocation';
    import { setTitle, setUrl, reset } from '@windy/location';
    import { openPlugin } from '@windy/pluginsCtrl';

    import { onMount, onDestroy } from 'svelte';

    import config from './pluginConfig';

    const { name, title } = config;
    const text = 'This type of layout can handle enormous amount of text. It scrolls down.'
    const lines: string[] = Array.from({ length: 100 }, () => text);

    let marker: L.Marker | null = null;
    let loader = false;

    const getMyLoc = async () => {
        loader = true;
        const loc = await getGPSlocation();
        loader = false;
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

        // onopen also contains paremeters, which are passed to plugin

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

        // Whenever closing your plugin you MUST reset
        // modified title and URL
        reset(name);
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

