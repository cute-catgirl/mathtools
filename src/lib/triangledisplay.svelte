<script>
    export let a;
    export let b;
    export let c;
</script>

<div>
    <p>Side A: {a ? a : '?'}</p>
    <p>Side B: {b ? b : '?'}</p>
    <p>Side C (hypotenuse): {c ? c : '?'}</p>
</div>

<style>
    @import url('https://unpkg.com/@catppuccin/palette/css/catppuccin.css');

    p {
        font-family: monospace;
    }
</style>