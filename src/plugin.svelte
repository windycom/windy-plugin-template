<b>
    Hello World
</b>

<script lang="ts">
    import config from './pluginConfig';

    import { onMount, onDestroy } from 'svelte';

    onMount(() => {
        console.log('mounted');
    });

    onDestroy(() => {
        console.log('destroyed');
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

