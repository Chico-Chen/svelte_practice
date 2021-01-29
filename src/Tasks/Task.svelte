<script>
    import TaskItems from "./task-store";
    import EditTask from "./EditTask.svelte";

    export let id = null;
    export let title = "";
    export let checkLists = [];
    export let done = false;


    function removeTaskHandler() {
        if (id) {
            TaskItems.update(tasks => {
                return tasks.filter(t => t.id != id);
            });
        }
    }

    function doneHandler() {
        if (id) {
            TaskItems.update(tasks => {
                const taskIndex = tasks.findIndex(t => t.id === id);
                tasks[taskIndex].done = true;
                const updateTask = tasks[taskIndex];
                const updateTasks = tasks;
                updateTasks[taskIndex] = updateTask;
                return updateTasks;
            })
        }
    }

    let editMode;

    function editHandler() {
        editMode = true;
    }

    function cancelEdit() {
        editMode = null;
    }

</script>

<div class="task">
    <div class="title">
        <span>{title}</span>
    </div>
    <div class="operation">
        {#if id}
            <span>
                <img
                    on:click={removeTaskHandler}
                    src="https://img.icons8.com/dusk/64/000000/delete-forever.png"
                    alt="delete"
                />
            </span>
        {/if}
        <span>
            <img
                on:click={editHandler}
                src="https://img.icons8.com/dusk/64/000000/edit--v2.png"
                alt="edit"
            />
        </span>
        {#if editMode} 
            <EditTask checkLists={checkLists} id={id} on:cancel={cancelEdit} />
        {/if}
        {#if !done}
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
