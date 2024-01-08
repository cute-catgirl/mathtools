<script>
    // Import CSS
    import '/src/styles/global.css';
</script>

<slot />

<style>
    :host {
        all: initial;
        display: block;
        contain: content;
    }
</style>