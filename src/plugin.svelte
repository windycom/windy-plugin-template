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
    Put your plugin code here
</section>
<script lang="ts">
    import bcast from "@windy/broadcast";
    import { onDestroy, onMount } from 'svelte';

    import config from './pluginConfig';

    const { title } = config;


    export const onopen = (_params: unknown) => {
        // Your plugin was opened with parameters parsed from URL
        // or with LatLon object if opened from contextmenu
    };

    onMount(() => {
        // Your plugin was mounted
    });

    onDestroy(() => {
        // Your plugin was destroyed
    });
</script>

<style lang="less">
    // Put any LESS of CSS styles here
</style>

