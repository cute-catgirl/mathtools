<script>
    export let sideA;
    export let sideB;
    export let sideC;
    export let angleA;
    export let angleB;
    let angleC = 90;
    export let abbreviate = true;

    const maxWidth = 200;
    const maxHeight = 200;

    let sideALabel;
    let sideBLabel;
    let sideCLabel;

    function abbreviateNumber(num) {
        if (num < 1000) {
            return num;
        }
        const units = ['k', 'M', 'B', 'T'];
        let unitIndex = -1;

        while (num >= 1000 && unitIndex < units.length - 1) {
            num /= 1000;
            unitIndex++;
        }

        return num.toFixed(2) + units[unitIndex];
    }

    $: if (abbreviate) {
        sideALabel = abbreviateNumber(sideA);
        sideBLabel = abbreviateNumber(sideB);
        sideCLabel = abbreviateNumber(sideC);
    } else {
        sideALabel = sideA;
        sideBLabel = sideB;
        sideCLabel = sideC;
    }
    // Calculate scale factor
    $: maxSideLength = Math.max(sideA, sideB, sideC);
    $: sideAChars = sideALabel ? sideALabel.toString().length : 0;
    $: scaleFactor = Math.min(maxWidth / maxSideLength, maxHeight / maxSideLength) * 0.9 * (1 - (sideAChars / 10));

    $: scaledSideA = sideA * scaleFactor;
    $: scaledSideB = sideB * scaleFactor;
    $: scaledSideC = sideC * scaleFactor;

    // Determine the dimensions of the square
    $: squareSide = Math.max(scaledSideA, scaledSideB);

    // Calculate translation to center the square in the SVG
    $: translateXSquare = (maxWidth - squareSide) / 2;
    $: translateYSquare = (maxHeight - squareSide) / 2;

    // Now, position the triangle within the square
    $: triangleX = (scaledSideA > scaledSideB) ? (scaledSideA - scaledSideB) / 2 : 0;
    $: triangleY = (scaledSideB > scaledSideA) ? (scaledSideB - scaledSideA) / 2 : 0;

    // Change offset distance based on string length
    $: offsetDistance = 15;

    // Calculate the angle perpendicular to the hypotenuse (X should scale faster as it is longer text)
    $: offsetX = Math.cos(angleB * Math.PI / 180) * offsetDistance * 2;
    $: offsetY = Math.sin(angleB * Math.PI / 180) * offsetDistance;
</script>

{#if sideA && sideB && sideC}
    <svg width="200" height="200" viewBox="0 0 200 200">
        <!-- Background -->
        <g transform={`translate(${translateXSquare}, ${translateYSquare})`}>
            <g transform={`translate(${triangleX}, ${triangleY})`}>
                <polygon points={`0,${scaledSideA} ${scaledSideB},${scaledSideA} 0,0`} fill="#4fd1c5" />
                <!-- Label for side A -->
                <text x="-10" y={`${scaledSideA / 2}`} fill="white" text-anchor="end" dominant-baseline="middle">{sideALabel}</text>

                <!-- Label for side B -->
                <text x={`${scaledSideB / 2}`} y={`${scaledSideA + 20}`} fill="white" text-anchor="middle">{sideBLabel}</text>

                <!-- Label for side C (hypotenuse) -->
                <text x={`${(scaledSideB / 2) + offsetX}`} y={`${(scaledSideA / 2) - offsetY}`} fill="white" text-anchor="middle" dominant-baseline="central">{sideCLabel}</text>

            </g>
        </g>
    </svg>
{:else}
    <svg width="200" height="200" viewBox="0 0 200 200"></svg>
{/if}

<style>
    svg {
        height: 100%;
        width: 100%;
    }
</style>