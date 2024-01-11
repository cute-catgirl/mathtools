import {writable} from "svelte/store";

function toggle(value) {
    const {subscribe, set, update} = writable(value);
    return {
        subscribe,
        toggle: () => update((n) => !n),
        setTrue: () => set(true),
        setFalse: () => set(false)
    };
}
export const darkMode = toggle(true);