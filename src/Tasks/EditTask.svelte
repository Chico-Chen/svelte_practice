<script>
    import Modal from "../UIComponent/Modal.svelte";
    import Button from "../UIComponent/Button.svelte";
    import TaskItems from "./task-store";
    import { writable } from "svelte/store";
    import { onDestroy, onMount} from "svelte";
import Task from "./Task.svelte";


    //progress variable
    let progress = writable(0);

    //task id
    export let task = null;

    //subscribe taskItems to get latest update
    const unsubscribe = TaskItems.subscribe((tasks) => {
        if (task) {
            const targetTask = tasks.filter((t) => t.id === task.id);
            task.checkLists = targetTask[0].checkLists;
        }
    });

    onMount(() => {
        if (task.checkLists && task.checkLists.length !== 0) {
            let doneWorks = task.checkLists.filter((c) => c.done);
            progress_value = (doneWorks.length / task.checkLists.length) * 100;
            progress.set(progress_value / 100);
        }
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    //progress part
    let progress_value = 0;
    function checkListHandler(checkList_id) {
        //update checkList first
        const checkListIndex = task.checkLists.findIndex(
            (c) => c.id === checkList_id
        );
        const updateCheckList = task.checkLists[checkListIndex];
        updateCheckList.done = !task.checkLists[checkListIndex].done;
        const updateCheckLists = task.checkLists;
        updateCheckLists[checkListIndex] = updateCheckList;
        //update TaskItems
        if (task) {
            TaskItems.update((tasks) => {
                const taskIndex = tasks.findIndex((t) => t.id === task.id);
                const targetItem = tasks[taskIndex];
                targetItem.checkLists = updateCheckLists;
                const updateTask = targetItem;
                const updateTasks = tasks;
                updateTasks[taskIndex] = updateTask;
                return updateTasks;
            });
        }

        //set progress
        let doneWorks = task.checkLists.filter((c) => c.done);
        progress_value = (doneWorks.length / task.checkLists.length) * 100;
        progress.set(progress_value / 100);
    }

    let addMode = false;

    let textarea_value = "";

    function addCheckList() {
        addMode = true;
    }

    function saveCheckListHandler() {
        if (textarea_value === "") {
            return;
        }
        let newCheckList = {
            id: task.checkLists.length + 1,
            value: textarea_value,
            done: false,
        };
        TaskItems.update((tasks) => {
            console.log(task.id);
            const taskIndex = tasks.findIndex((t) => t.id === task.id);
            const targetItem = tasks[taskIndex];
            console.log(targetItem);
            targetItem.checkLists.push(newCheckList);
            const updateTask = targetItem;
            console.log(targetItem);
            const updateTasks = tasks;
            updateTasks[taskIndex] = updateTask;
            return updateTasks;
        });
        textarea_value = "";
        addMode = false;

        //reset progress
        let doneWorks = task.checkLists.filter((c) => c.done);
        progress_value = (doneWorks.length / task.checkLists.length) * 100;
        progress.set(progress_value / 100);
    }

    function cancelHandler() {
        addMode = false;
    }
</script>

<Modal on:cancel>
    <form class="form">
        <div class="check-progress">
            <lable class="percentage">{progress_value}%</lable>
            <progress value={$progress} />
        </div>
        <div>
            {#each task.checkLists as checkList (checkList.id)}
                <label class="checkList">
                    <input
                        type="checkbox"
                        bind:checked={checkList.done}
                        on:click={checkListHandler(checkList.id)}
                    />
                    {checkList.value}
                </label>
            {/each}
        </div>
        {#if !addMode}
            <a href="#" on:click={addCheckList}>Add a checkList</a>
        {:else}
            <div>
                <div class="newTask">
                    <div class="new_task_detail">
                        <textarea
                            class="task_title"
                            placeholder="Enter a title"
                            bind:value={textarea_value}
                        />
                    </div>
                </div>
                <div class="right_side_button">
                    <Button on:click={saveCheckListHandler}>Save</Button>
                    <Button on:click={cancelHandler}>Cancel</Button>
                </div>
            </div>
        {/if}
    </form>
</Modal>

<style>
    .form {
        margin: 8px, 8px;
        height: 200px;
    }

    .percentage {
        display: inline-block;
        font-size: 16px;
    }

    .check-progress {
        margin: 1rem 1rem;
    }

    progress {
        display: inline-block;
        width: 92%;
        float: right;
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
        color: white;
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

    .right_side_button {
        float: right;
        margin-right: 1rem;
    }

    .checkList {
        margin: 1rem 1rem;
        display: flex;
    }


</style>
