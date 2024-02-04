<section bind:this={pluginElement} class="this-is-body-of-my-plugin">
    <p>
        <a>[ ⬅️ Go back to menu ]</a>
    </p>
    <p>
        <img src="https://www.windy.com/img/windy-plugins/borat-great-success-ed.png" alt="Borat" />
    </p>
    <p>
        This plugin is written in plain vanilla JS. It also does not use LESS or SCSS
        (just pure CSS) and does not use any Windy.com classes.
    </p>
    <p>
        It does not use any advanced Svelte features, like reactive statements.
    </p>
    <p>
        You can start developing with skills you already have.
    </p>
    <button>Click me</button>
    <div></div>
</section>

<script>
    // In order to write a plugin in plain JS remove the lang="ts" attribute
    // from script tag

    import bcast from "@windy/broadcast";

    import { onMount } from 'svelte';

    let pluginElement;

    onMount(() => {
        // Your plugin was mounted and pluginElement contains
        // reference to the DOM element of your plugin

        const buttonEl = pluginElement.querySelector('button');
        const divEl = pluginElement.querySelector('div');
        const goBackLink = pluginElement.querySelector('a');

        buttonEl.onclick = () => {
            divEl.innerHTML = 'Button was clicked';
        };

        goBackLink.onclick = () => {
            bcast.emit('rqstOpen', 'menu');
        };

    });
</script>

<style>
    /* Remove lang="less" and you can use plain CSS */

    .this-is-body-of-my-plugin {
        background: #565656;
        color: white;
        line-height: 1.8;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 2em;
    }
    p {
        line-height: 1.8;
    }
    button {
        cursor: pointer;
    }
    a {
        text-decoration: underline;
    }
    img {
        width: 70%;
    }
</style>

