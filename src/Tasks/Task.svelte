<script>
    import TaskItems from "./task-store";
    import EditTask from "./EditTask.svelte";
    import { onMount } from "svelte";

    export let task = null;

    onMount(() => {
        console.log(task.title);
    });

    function removeTaskHandler() {
        if (task) {
            TaskItems.update((tasks) => {
                return tasks.filter((t) => t.id != task.id);
            });
        }
    }

    function doneHandler() {
        if (task) {
            TaskItems.update((tasks) => {
                const taskIndex = tasks.findIndex((t) => t.id === task.id);
                tasks[taskIndex].done = true;
                const updateTask = tasks[taskIndex];
                const updateTasks = tasks;
                updateTasks[taskIndex] = updateTask;
                return updateTasks;
            });
        }
    }

    let editMode;

    function editHandler() {
        editMode = true;
    }

    function cancelEdit() {
        editMode = null;
    }

    function setDoneBackToTasks() {
        if (task) {
            TaskItems.update((tasks) => {
                const taskIndex = tasks.findIndex((t) => t.id === task.id);
                tasks[taskIndex].done = false;
                const updateTask = tasks[taskIndex];
                const updateTasks = tasks;
                updateTasks[taskIndex] = updateTask;
                return updateTasks;
            });
        }
    }
</script>

<div class="task" on:click={setDoneBackToTasks}>
    <div class="title">
        <span>{task.title}</span>
    </div>
    <div class="operation">
        {#if task}
            <span>
                <img
                    on:click={removeTaskHandler}
                    src="https://img.icons8.com/dusk/64/000000/delete-forever.png"
                    alt="delete"
                />
            </span>
        {/if}
        {#if editMode}
            <EditTask {task} on:cancel={cancelEdit} />
        {/if}
        {#if !task.done}
            <span>
                <img
                    on:click={editHandler}
                    src="https://img.icons8.com/dusk/64/000000/edit--v2.png"
                    alt="edit"
                />
            </span>
            <span>
                <img
                    on:click={doneHandler}
                    src="https://img.icons8.com/dusk/64/000000/checked--v1.png"
                    alt="check"
                />
            </span>
        {/if}
    </div>
</div>

<style>
    .task {
        margin: 1rem 1rem;
        height: 35px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }

    .title {
        height: 30px;
        margin: 2px 8px;
        width: 75%;
        display: inline-block;
    }

    .operation {
        float: right;
        height: 30px;
        margin: 2px 8px;
        display: inline-block;
        width: 15%;
    }

    img {
        height: 30px;
        width: 30px;
        float: right;
        opacity: 0.3;
    }

    span:hover img {
        opacity: 1;
    }

    img:hover {
        height: 32px;
        width: 32px;
    }
</style>
