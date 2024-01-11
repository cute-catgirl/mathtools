<script>
    // Imports
    import NumberInput from '/src/lib/numinput.svelte';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {slide} from 'svelte/transition';
    import {calculateTriangle, validateTriangle} from '/src/lib/triangle.js';
    import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

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
<main>
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
</main>