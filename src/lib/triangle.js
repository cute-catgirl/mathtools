export function validateTriangle(sideA, sideB, sideC, angleA, angleB) {
    const degToRad = angle => angle * (Math.PI / 180);
    const radToDeg = radian => radian * (180 / Math.PI);
    if (sideA && sideC && sideA > sideC) {
        return [false, "Side A cannot be greater than side C", ["sideA", "sideC"]];
    }
    if (sideB && sideC && sideB > sideC) {
        return [false, "Side B cannot be greater than side C", ["sideB", "sideC"]];
    }
    if (angleA && angleB && angleA + angleB > 90.01) {
        console.log(angleA + angleB);
        return [false, "The sum of angles A and B cannot be greater than 90 degrees", ["angleA", "angleB"]];
    }
    if (angleA && angleA > 90) {
        return [false, "Angle A cannot be greater than 90 degrees", ["angleA"]];
    }
    if (angleB && angleB > 90) {
        return [false, "Angle B cannot be greater than 90 degrees", ["angleB"]];
    }
    return [true, null, []];
}

export function calculateTriangle(sideA, sideB, sideC, angleA, angleB) {
    let angleC = 90; // Right angle in a right triangle
    let solved = false;
    let changed = false;
    const degToRad = angle => angle * (Math.PI / 180);
    const radToDeg = radian => radian * (180 / Math.PI);

    while (!solved) {
        changed = false;

        // Calculate missing side using Pythagorean theorem
        if (sideA !== null && sideB !== null && sideC === null) {
            sideC = Math.sqrt(sideA * sideA + sideB * sideB);
            changed = true;
        } else if (sideA !== null && sideC !== null && sideB === null) {
            sideB = Math.sqrt(sideC * sideC - sideA * sideA);
            changed = true;
        } else if (sideB !== null && sideC !== null && sideA === null) {
            sideA = Math.sqrt(sideC * sideC - sideB * sideB);
            changed = true;
        }

        // Calculate sides if hypotenuse and one angle are known
        if (sideC !== null && angleA !== null && sideA === null) {
            sideA = sideC * Math.sin(degToRad(angleA)); // Calculate sideA
            sideB = Math.sqrt(sideC * sideC - sideA * sideA); // Calculate sideB using Pythagorean theorem
            changed = true;
        }
        if (sideC !== null && angleB !== null && sideB === null) {
            sideB = sideC * Math.sin(degToRad(angleB)); // Calculate sideB
            sideA = Math.sqrt(sideC * sideC - sideB * sideB); // Calculate sideA using Pythagorean theorem
            changed = true;
        }

        // Calculate hypotenuse and other side if one side and its corresponding angle are known
        if (sideA !== null && angleA !== null && (sideB === null || sideC === null)) {
            sideC = sideC === null ? sideA / Math.sin(degToRad(angleA)) : sideC; // Calculate hypotenuse
            sideB = sideB === null ? Math.sqrt(sideC * sideC - sideA * sideA) : sideB; // Calculate other side
            changed = true;
        }
        if (sideB !== null && angleB !== null && (sideA === null || sideC === null)) {
            sideC = sideC || sideB / Math.sin(degToRad(angleB)); // Calculate hypotenuse
            sideA = sideA || Math.sqrt(sideC * sideC - sideB * sideB); // Calculate other side
            changed = true;
        }

        // Calculate angles using trigonometry
        if (sideA !== null && sideC !== null && angleA === null) {
            angleA = radToDeg(Math.asin(sideA / sideC));
            changed = true;
        }
        if (sideB !== null && sideC !== null && angleB === null) {
            angleB = radToDeg(Math.asin(sideB / sideC));
            changed = true;
        }

        // Calculate the other angle if one non-right angle is known
        if (angleA !== null && angleB === null) {
            angleB = 90 - angleA;
            changed = true;
        } else if (angleB !== null && angleA === null) {
            angleA = 90 - angleB;
            changed = true;
        }

        // If nothing changed or all sides and angles are determined, we're done
        if (!changed || (sideA !== null && sideB !== null && sideC !== null && angleA !== null && angleB !== null)) {
            solved = true;
        }
    }

    return { sideA, sideB, sideC, angleA, angleB, angleC };
}

function testCalculateTriangle() {
    // Test cases
    const testCases = [
        { inputs: [3, 4, null, null, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, null, 5, 36.87, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, 4, 5, null, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, null, null, 36.87, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, 4, null, null, 53.13], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, null, 5, null, null], expected: { sideA: null, sideB: null, sideC: 5, angleA: null, angleB: null, angleC: 90 } },
        { inputs: [null, null, null, 36.87, 53.13], expected: { sideA: null, sideB: null, sideC: null, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, null, null, null, 53.13], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, 4, null, 36.87, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, null, null, null, null], expected: { sideA: 3, sideB: null, sideC: null, angleA: null, angleB: null, angleC: 90 } },
        { inputs: [null, null, 5, 36.87, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, null, 5, null, 53.13], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, null, null, null, null], expected: { sideA: 3, sideB: null, sideC: null, angleA: null, angleB: null, angleC: 90 } },
        { inputs: [null, null, null, 36.87, null], expected: { sideA: null, sideB: null, sideC: null, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, 4, null, null, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, null, 5, null, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, 4, 5, null, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, 4, null, 36.87, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [3, null, null, null, 53.13], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } },
        { inputs: [null, null, 5, 36.87, null], expected: { sideA: 3, sideB: 4, sideC: 5, angleA: 36.87, angleB: 53.13, angleC: 90 } }
    ];

    testCases.forEach((testCase, index) => {
        const { sideA, sideB, sideC, angleA, angleB } = calculateTriangle(...testCase.inputs);
        const result = { sideA, sideB, sideC, angleA, angleB, angleC: 90 };

        // Check if the result matches the expected values
        const passed = Object.keys(result).every(key => {
            // Allow a small margin of error for floating point comparisons
            return Math.abs(result[key] - testCase.expected[key]) < 0.01;
        });

        console.log(`Test Case ${index + 1}: ${passed ? 'Passed' : 'Failed'}`);
        if (!passed) {
            console.log('Expected:', testCase.expected);
            console.log('Received:', result);
        }
    });
}