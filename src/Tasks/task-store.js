import { writable } from 'svelte/store';

let id = 0;

const tasks = writable([
    {
        id: ++id,
        title: "Learning TigerGraph",
        checkLists: [],
        done: false
    },
    {
        id: ++id,
        title: "Write a blog about tigergraph learning",
        checkLists: [],
        done: false
    },
    {
        id: ++id,
        title: "Learning TigerGraph",
        checkLists: [],
        done: false
    },
    {
        id: ++id,
        title: "Learning TigerGraph",
        checkLists: [],
        done: false
    }
]);

export default tasks;