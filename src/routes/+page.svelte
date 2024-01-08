<script>
    // Imports
    import NumberInput from '/src/lib/numinput.svelte';
    import { slide, fly } from 'svelte/transition';
    import Fa from 'svelte-fa/src/fa.svelte';
    import { calculateTriangle, validateTriangle } from '/src/lib/triangle.js';
    import {faTriangleExclamation, faLightbulb, faChevronRight, faHeart, faFontAwesome, faPalette, faGears} from '@fortawesome/free-solid-svg-icons';

    // Constants
    const fields = [
        {name: 'sideA', label: 'Side A'},
        {name: 'sideB', label: 'Side B'},
        {name: 'sideC', label: 'Side C (hypotenuse)'},
        {name: 'angleA', label: 'Angle A'},
        {name: 'angleB', label: 'Angle B'}
    ]

    // Dark/light mode variable
    let darkMode = true;

    // Credits expanded variable
    let creditsExpanded = false;

    // Error variables
    let validate = null;
    let error = null;
    let invalidInputs = [];

    // Triangle data
    let triangleData = {
        inputs: {
            sideA: null,
            sideB: null,
            sideC: null,
            angleA: null,
            angleB: null
        },
        outputs: {
            sideA: null,
            sideB: null,
            sideC: null,
            angleA: null,
            angleB: null,
            angleC: null
        }
    }

    // Function to expand credits
    function expandCredits() {
        creditsExpanded = !creditsExpanded;
    }

    $: {
        let valid = true;
        const result = calculateTriangle(
            triangleData.inputs.sideA,
            triangleData.inputs.sideB,
            triangleData.inputs.sideC,
            triangleData.inputs.angleA,
            triangleData.inputs.angleB
        );
        triangleData.outputs = result;
        validate = validateTriangle(
            triangleData.outputs.sideA,
            triangleData.outputs.sideB,
            triangleData.outputs.sideC,
            triangleData.outputs.angleA,
            triangleData.outputs.angleB
        );
        valid = validate[0];
        error = validate[1];
        invalidInputs = validate[2];
        for (const key in triangleData.outputs) {
            if (triangleData.outputs[key] !== null) {
                triangleData.outputs[key] = Math.round(triangleData.outputs[key] * 100) / 100;
            }
        }
    }
</script>

<svelte:head>
    <title>Right Triangle Solver</title>
</svelte:head>

<div class:dark-mode={darkMode} class:light-mode={!darkMode} id="main">
    <div id="card">
        <h1>Right Triangle Solver</h1>
        {#if error}
            <p class="error" transition:slide><Fa icon={faTriangleExclamation} /> {error}</p>
        {/if}
        <div id="columns">
            <div id="input">
                <h2>Input</h2>
                {#each fields as field}
                    <NumberInput bind:value={triangleData.inputs[field.name]} label={field.label} error={invalidInputs.includes(field.name)} disabled={triangleData.inputs[field.name] === null && triangleData.outputs[field.name] !== null} />
                {/each}
            </div>
            <div id="output">
                <h2>Output</h2>
                {#each fields as field}
                    <p>{field.label}: {triangleData.outputs[field.name] !== null ? triangleData.outputs[field.name] : "?"}</p>
                {/each}
            </div>
        </div>
        <p class="caption"><Fa icon={faHeart} size="s"/> Created by <a href="https://cute-catgirl.github.io">Ben Moon</a><button on:click={expandCredits} id="expandbutton"><Fa icon={faChevronRight} class={creditsExpanded ? "expanded" : "collapsed"} size="xs"/></button></p>
        {#if creditsExpanded}
            <div id="expandedcredits">
                <p class="caption" transition:slide><Fa icon={faGears} size="s"/> Made with <a href="https://svelte.dev">Svelte</a> and <a href="https://kit.svelte.dev">SvelteKit</a></p>
                <p class="caption" transition:slide><Fa icon={faFontAwesome} size="s"/> Icons from <a href="https://fontawesome.com">Font Awesome</a></p>
                <p class="caption" transition:slide><Fa icon={faPalette} size="s"/> Uses the <a href="https://catppuccin.com">Catppuccin</a> color palette</p>
            </div>
        {/if}
        <button on:click={() => darkMode = !darkMode} id="themebutton"><Fa icon={faLightbulb} /></button>
    </div>
</div>