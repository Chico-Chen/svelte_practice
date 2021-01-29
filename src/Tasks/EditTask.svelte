<script>
    import Modal from '../UIComponent/Modal.svelte';
    import { writable } from 'svelte/store';

    export let checkList = [];

    const prograss = writable(0);

</script>

<Modal on:cancel>
    <form class="form">
        <div class="check-progress">
            <lable class="percentage">%</lable>
            <progress value={$prograss}></progress>
        </div>
        <a href="#">Add a checkList</a>
    </form>
</Modal>

<style>
    .form {
        margin: 8px, 8px;
        height: 200px;
    }

    .percentage {
        display: inline-block;
        font-size: 10px;
    }

    .check-progress {
        margin: 1rem 1rem;
    }

    progress {
		display: inline-block;
        width: 95%;
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
</style>