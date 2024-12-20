<script>
    import { darkMode } from '$lib/stores.js';
    import '/src/styles/global.css';
    import Fa from "svelte-fa/src/fa.svelte";
    import { slide } from 'svelte/transition';
    import { page } from '$app/stores';
    import { base } from "$app/paths";

    import {
        faChevronLeft,
        faChevronRight,
        faFontAwesome,
        faGears,
        faHeart,
        faLightbulb,
        faPalette
    } from "@fortawesome/free-solid-svg-icons";

    let creditsExpanded = false;
</script>

<div class:dark-mode={$darkMode} class:light-mode={!$darkMode} id="main">
    <div class="card">
        <slot />
        <button on:click={() => darkMode.toggle()} id="themebutton"><Fa icon={faLightbulb} /></button>
        {#if $page.url.pathname !== base}
            <a href="{base}/" id="backbutton"><Fa icon={faChevronLeft} /></a>
        {/if}
        <p class="caption"><Fa icon={faHeart} size="s"/> Created by <a href="https://maemoon.me">Mae Moon</a><button on:click={() => creditsExpanded = !creditsExpanded} id="expandbutton"><Fa icon={faChevronRight} class={creditsExpanded ? "expanded" : "collapsed"} size="xs"/></button></p>
        {#if creditsExpanded}
            <div id="expandedcredits">
                <p class="caption" transition:slide><Fa icon={faGears} size="s"/> Made with <a href="https://svelte.dev">Svelte</a> and <a href="https://kit.svelte.dev">SvelteKit</a></p>
                <p class="caption" transition:slide><Fa icon={faFontAwesome} size="s"/> Icons from <a href="https://fontawesome.com">Font Awesome</a></p>
                <p class="caption" transition:slide><Fa icon={faPalette} size="s"/> Uses the <a href="https://catppuccin.com">Catppuccin</a> color palette</p>
            </div>
        {/if}
    </div>
</div>

<style>
    :host {
        all: initial;
        display: block;
        contain: content;
    }
</style>
