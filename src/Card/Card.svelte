<script>
    import Task from "./Task.svelte";
    import TaskItem from "./task-store";

    export let title;

    let id = 0;

    let tasks;

    TaskItem.subscribe((tsks) => {
        tasks = tsks;
    });

    //textarea value
    let textarea_value = "";

    let task_visible = false;

    function newTaskHandler() {
        task_visible = true;
    }

    function cancelHandler() {
        task_visible = false;
    }

    function saveHandler() {
        const task = {
            id: tasks.length + 2,
            title: textarea_value,
            description: "",
            checkList: [],
            done: false,
        };

        TaskItem.update((items) => {
            return [...items, task];
        });

        textarea_value = "";

        task_visible = false;
    }
</script>

<article>
    <div class="header">
        <p class="title">{title}</p>
    </div>
    <div>
        {#if title === "Tasks"}
            {#each tasks.filter((t) => !t.done) as task (task.id)}
                <Task
                    id={task.id}
                    title={task.title}
                    checkList={tasks.checkList}
                    done={task.done}
                />
            {/each}
            {#if task_visible}
                <div class="newTask">
                    <div class="new_task_detail">
                        <textarea
                            class="task_title"
                            placeholder="Enter a title"
                            bind:value={textarea_value}
                        />
                    </div>
                </div>
            {/if}
        {:else}
            {#each tasks.filter((t) => t.done) as d (d.id)}
                <Task
                    id={d.id}
                    title={d.title}
                    checkList={d.checkList}
                    done={d.done}
                />
            {/each}
        {/if}
    </div>
    <footer>
        {#if title === "Tasks"}
            {#if task_visible}
                <button class="" on:click={saveHandler}>Save</button>
                <button class="" on:click={cancelHandler}>Cancel</button>
            {:else}
                <a href="#" on:click={newTaskHandler}>Add a task</a>
            {/if}
        {/if}
    </footer>
</article>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
    }

    .header {
        margin-left: 1rem;
        padding: 2px 2px;
        position: inherit;
        height: 2rem;
        font-size: 1.2rem;
        font-weight: bolder;
    }

    footer {
        height: 38px;
        justify-content: space-between;
    }

    a {
        border-radius: 3px;
        color: #5e6c84;
        flex: 1 0 auto;
        margin: 2px 8px 8px 10px;
        padding: 4px 8px;
        position: relative;
        text-decoration: none;
        user-select: none;
        float: right;
    }

    a:hover {
        background-color: #8ac5cf;
    }

    .title {
        position: relative;
    }

    .newTask {
        margin: 1rem 1rem;
        height: 60px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        display: block;
        position: relative;
    }

    .new_task_detail {
        overflow: hidden;
        padding: 6px 8px 2px;
        position: relative;
        z-index: 10;
        width: inherit;
    }

    .task_title {
        background: none;
        border: none;
        box-shadow: none;
        margin-bottom: 4px;
        min-height: 54px;
        padding: 0;
        width: 100%;
        resize: none;
        overflow: hidden;
        overflow-wrap: break-word;
        outline: none;
    }
</style>
