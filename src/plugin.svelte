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
        This is example of standard <code></code>
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
<script lang="ts">
    import { map } from '@windy/map';

    import { onMount, onDestroy } from 'svelte';

    let marker: L.Marker | null = null;

    onMount(() => {
        console.log('Your plugin was mounted');
        marker = new L.Marker(map.getCenter()).addTo(map);
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
    // If you want to include windy less definitions
    // keep this import
    @import '../dev/windyLessDefinitions.less';

    b {
        color: @blue;
    }
</style>

