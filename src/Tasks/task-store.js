import { writable } from 'svelte/store';

let id = 0;

const tasks = writable([
    {
        id: ++id,
        title: "Learning TigerGraph",
        checkList: [],
        done: false
    },
    {
        id: ++id,
        title: "Write a blog about tigergraph learning",
        checkList: [],
        done: false
    },
    {
        id: ++id,
        title: "Learning TigerGraph",
        checkList: [],
        done: false
    },
    {
        id: ++id,
        title: "Learning TigerGraph",
        checkList: [],
        done: false
    }
]);

export default tasks;