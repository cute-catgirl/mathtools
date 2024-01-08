<script>
    export let label;
    export let error = false;

    const maxLength = 10; // Set a maximum length for the input
    let inputValue = ''; // Internal string representation
    let lastValidValue = ''; // Keep track of the last valid input
    export let value = 0; // Exported numeric value
    export let disabled = false;

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

<div>
    <label>{label}</label>
    <input class:error={error} type="text" bind:value={inputValue} disabled={disabled} />
</div>


<style>
    div {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
    }
</style>