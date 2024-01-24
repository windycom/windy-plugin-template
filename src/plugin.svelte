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
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam</p>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam
    </p>
</section>
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

