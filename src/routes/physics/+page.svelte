<script>
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faXmark, faPlus, faRightLeft} from '@fortawesome/free-solid-svg-icons';
    import NumberInput from '/src/lib/numinput.svelte';

    let distance;
    let displacement;
    let displacementDirection;
    let steps = [
        {
            "id": 1,
            "distance": 0,
            "direction": 0,
            "velocity": 0,
            "time": 0,
            "acceleration": 0,
            "mode": 0
        }
    ];

    function addStep() {
        steps = [...steps, {
            "id": steps.length + 1,
            "distance": 0,
            "direction": 0,
            "velocity": 0,
            "time": 0,
            "acceleration": 0,
            "mode": 0
        }];
    }
    
    function removeStep(id) {
        steps = steps.filter(step => step.id !== id);
    }

    function changeStepMode(id) {
        steps[id-1].mode += 1;
        if (steps[id-1].mode > 1) {
            steps[id-1].mode = 0;
        }
    }

    $: {
        distance = steps.reduce((total, step) => {
            const stepValue = step.mode === 0 ? parseFloat(step.distance) : parseFloat(step.velocity) * parseFloat(step.time);
            return total + (isNaN(stepValue) ? 0 : stepValue);
        }, 0);
        distance = Math.round(distance * 100) / 100;

        const totalX = steps.reduce((total, step) => {
            const dirRad = step.direction * Math.PI / 180; // Convert degrees to radians
            const stepValue = step.mode === 0 ? parseFloat(step.distance) : parseFloat(step.velocity) * parseFloat(step.time);
            return total + (isNaN(stepValue) ? 0 : stepValue) * Math.cos(dirRad);
        }, 0);

        const totalY = steps.reduce((total, step) => {
            const dirRad = step.direction * Math.PI / 180; // Convert degrees to radians
            const stepValue = step.mode === 0 ? parseFloat(step.distance) : parseFloat(step.velocity) * parseFloat(step.time);
            return total + (isNaN(stepValue) ? 0 : stepValue) * Math.sin(dirRad);
        }, 0);

        displacement = Math.sqrt(totalX * totalX + totalY * totalY);
        displacement = Math.round(displacement * 100) / 100;

        displacementDirection = (180 / Math.PI) * Math.atan2(totalY, totalX);
        displacementDirection = Math.round(displacementDirection * 100) / 100;
    }
</script>

<svelte:head>
    <title>Displacement Calculator</title>
</svelte:head>
<main>
    <h1>Displacement Calculator</h1>
    <div id="columns">
        <div id="input">
            {#if steps.length > 0}
                {#each steps as step}
                    <div class="step">
                        <p>{step.id}.</p>
                        {#if step.mode == 0}
                            <NumberInput bind:value={step.distance} label="Distance (m)" vertical={true} defaultValue={0}></NumberInput>
                        {:else if step.mode == 1}
                            <NumberInput bind:value={step.velocity} label="Velocity (m/s)" vertical={true} defaultValue={0}></NumberInput>
                            <NumberInput bind:value={step.time} label="Time (s)" vertical={true} defaultValue={0}></NumberInput>
                        {/if}
                        <NumberInput bind:value={step.direction} label="Direction (°)" vertical={true} defaultValue={0}></NumberInput>
                        <button on:click={() => changeStepMode(step.id)}><Fa icon={faRightLeft}></Fa></button>
                        <button on:click={() => removeStep(step.id)}><Fa icon={faXmark}></Fa></button>
                    </div>
                {/each}
            {:else}
                <p>No steps added!</p>
            {/if}
            <button on:click={addStep}><Fa icon={faPlus}></Fa> Add Step</button>
        </div>
        <div id="output">
            <p>Total Distance: {distance}m</p>
            {#if (displacement > 0)}
                <p>Total Displacement: {displacement}m [{displacementDirection}°]</p>
            {:else}
                <p>Total Displacement: {displacement}m</p>
            {/if}
        </div>
    </div>
</main>

<style>
    #columns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: auto;
    }

    #input {
        display: flex;
        flex-direction: column;
        width: 80%;
        gap: 1rem;
    }

    .step {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
</style>