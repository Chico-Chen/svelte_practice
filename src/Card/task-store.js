import { writable } from 'svelte/store';

let id = 1;

const tasks = writable([
    {
        id: ++id,
        title: "Learning TigerGraph",
        description:"",
        checkList: [],
        done: false
    },
    {
        id: ++id,
        title: "Write a blog about tigergraph learning",
        description:"",
        checkList: [],
        done: false
    },
    {
        id: ++id,
        title: "Learning TigerGraph",
        description:"",
        checkList: [],
        done: false
    },
    {
        id: ++id,
        title: "Learning TigerGraph",
        description:"",
        checkList: [],
        done: false
    }
]);

export default tasks;