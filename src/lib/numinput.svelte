<script>
    export let label;
    export let error = false;

    const maxLength = 10; // Set a maximum length for the input
    let inputValue = ''; // Internal string representation
    let lastValidValue = ''; // Keep track of the last valid input
    export let defaultValue;
    export let value = 0; // Exported numeric value
    export let disabled = false;
    export let vertical = false;

    $: {
        if (defaultValue != null) {
            inputValue = defaultValue;
        }
    }

    $: {
        if (inputValue.length > maxLength || !/^\d*\.?\d*$/.test(inputValue)) {
            // Revert to last valid value if current input is invalid or too long
            inputValue = lastValidValue;
        } else {
            // Update last valid value and numeric value if input is valid
            lastValidValue = inputValue;
            value = inputValue ? parseFloat(inputValue) : null;
        }
    }
</script>

<div class:vertical={vertical}>
    <label for="input">{label}</label>
    <input class:error={error} type="text" bind:value={inputValue} disabled={disabled}/>
</div>


<style>
    div {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        width: auto;
    }
    .vertical {
        flex-direction: column;
    }
    input {
        width: auto;
    }
</style>