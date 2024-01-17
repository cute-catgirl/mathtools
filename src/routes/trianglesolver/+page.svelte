<script>
    // Imports
    import NumberInput from '/src/lib/numinput.svelte';
    import TriangleDiagram from '/src/lib/trianglediagram.svelte';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {slide} from 'svelte/transition';
    import {calculateTriangle, validateTriangle} from '/src/lib/triangle.js';
    import {faTriangleExclamation, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

    // Constants
    const fields = [
        {name: 'sideA', label: 'Side A'},
        {name: 'sideB', label: 'Side B'},
        {name: 'sideC', label: 'Side C (hypotenuse)'},
        {name: 'angleA', label: 'Angle A'},
        {name: 'angleB', label: 'Angle B'}
    ]

    // Error variables
    let validate = null;
    let error = null;
    let errors = [];
    let invalidInputs = [];

    // Toggle diagram
    let showDiagram = false;

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

    $: {
        let valid = true;
        triangleData.outputs = calculateTriangle(
            triangleData.inputs.sideA,
            triangleData.inputs.sideB,
            triangleData.inputs.sideC,
            triangleData.inputs.angleA,
            triangleData.inputs.angleB
        );
        validate = validateTriangle(
            triangleData.outputs.sideA,
            triangleData.outputs.sideB,
            triangleData.outputs.sideC,
            triangleData.outputs.angleA,
            triangleData.outputs.angleB
        );
        valid = validate[0];
        error = validate[1];
        errors = error ? [error] : [];
        invalidInputs = validate[2];
        for (const key in triangleData.outputs) {
            if (triangleData.outputs[key] !== null) {
                triangleData.outputs[key] = Math.round(triangleData.outputs[key] * 100) / 100;
            }
        }
        if (showDiagram) {
            // If angle is very small, show warning message
            if (triangleData.outputs.angleA !== null && triangleData.outputs.angleA < 1) {
                errors.push("Warning: Angle A is very small. The diagram may be hard to read.");
            }
            if (triangleData.outputs.angleB !== null && triangleData.outputs.angleB < 1) {
                errors.push("Warning: Angle B is very small. The diagram may be hard to read.");
            }
        }
    }
</script>

<svelte:head>
    <title>Right Triangle Solver</title>
</svelte:head>
<main>
    <h1>Right Triangle Solver</h1>
    {#if errors.length > 0}
        {#each errors as error}
            <p class="error" transition:slide|global><Fa icon={faTriangleExclamation} /> {error}</p>
        {/each}
    {/if}
    <div id="columns">
        <div id="input">
            <h2>Input</h2>
            {#each fields as field}
                <NumberInput bind:value={triangleData.inputs[field.name]} label={field.label} error={invalidInputs.includes(field.name)} disabled={triangleData.inputs[field.name] === null && triangleData.outputs[field.name] !== null} />
            {/each}
        </div>
        <div id="output">
            <h2 style="display: flex; justify-content: center; align-items: center;">Output<button id="diagramButton" on:click={() => showDiagram = !showDiagram}><Fa icon={showDiagram ? faEyeSlash : faEye} size="s" fw/></button></h2>
            {#if showDiagram}
                <div id="diagram">
                    <TriangleDiagram sideA={triangleData.outputs.sideA} sideB={triangleData.outputs.sideB} sideC={triangleData.outputs.sideC} angleA={triangleData.outputs.angleA} angleB={triangleData.outputs.angleB} />
                </div>
            {:else}
                {#each fields as field}
                    <p>{field.label}: {triangleData.outputs[field.name] !== null ? triangleData.outputs[field.name] : "?"}</p>
                {/each}
            {/if}
        </div>
    </div>
</main>

<style>
    #diagramButton:hover {
        transform: none;
    }

    #columns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #input, #output {
        text-align: center;
    }

    #diagram {
        aspect-ratio: 1;
        height: auto;
        width: 100%;
        max-height: 200px;
    }
</style>