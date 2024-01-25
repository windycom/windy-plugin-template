<div class="plugin__mobile-header">
    Hello World
</div>
<section class="plugin__content">
    <div
        class="plugin__title"
    >
    Hello World
    </div>

    <p>
        This is example of standard <code>desktopUI: 'rhpane'</code> plugin layout.
    </p>
</section>
<script lang="ts">
    import { map, centerMap } from '@windy/map';
    import { onMount, onDestroy } from 'svelte';

    let marker: L.Marker | null = null;

    onMount(() => {
        console.log('Your plugin was mounted');
        marker = new L.Marker(map.getCenter()).addTo(map);
        centerMap({ lat: 50, lon: 14 });
    });

    export const onopen = (params: unknown) => {
        console.log('Your plugin was opened');
    };

    onDestroy(() => {
        console.log('Your plugin was destroyed');
        marker?.remove();
        marker = null;
    });
</script>

<style lang="less">
    code {
        color: red;
    }
</style>

