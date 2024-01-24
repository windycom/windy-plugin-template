<b>
    Hello World
</b>

<script>
    import config from './pluginConfig';
    import { map } from '@windy/map';

    import { onMount, onDestroy } from 'svelte';

    let marker; //: L.Marker;

    onMount(() => {
        console.log('mounted');
        marker = new L.Marker(map.getCenter()).addTo(map);
    });

    onDestroy(() => {
        console.log('destroyed');
        marker.remove();
    });

    const onopen = () => {
        console.log('opened');
    };

    export { config, onopen };

</script>

<style lang="less">
    // If you want to include windy less definitions
    // keep this import
    @import '../dev/windyLessDefinitions.less';

    b {
        color: @blue;
    }
</style>

