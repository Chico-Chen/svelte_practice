<script>

    export let id = "";
    export let title = "";
    export let checkList = [];
    export let done = false;

    export let remove_task;

</script>

<div class="task">
    <div class="title">
        <span>{title}</span>
    </div>
    <div class="operation">
        <span>
            <img
                on:click=""
                src="https://img.icons8.com/dusk/64/000000/delete-forever.png"
                alt="delete"
            />
        </span>
        <span>
            <img
                src="https://img.icons8.com/dusk/64/000000/edit--v2.png"
                alt="edit"
            />
        </span>
        {#if !done}
            <span>
                <img
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
