<script>
    import { createEventDispatcher } from "svelte";
    import Button from "./Button.svelte";

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("cancel");
    }
</script>

<div class="modal-backdrop" on:click={closeModal} />
<div class="modal">
    <h2>CheckList</h2>
    <div class="content">
        <slot />
    </div>
    <footer>
        <slot name="footer">
            <Button on:click={closeModal}>Close</Button>
        </slot>
    </footer>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }

    .modal {
        position: fixed;
        top: 10vh;
        left: 10%;
        width: 80%;
        max-height: 80vh;
        background: white;
        border-radius: 5px;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        overflow: scroll;
    }

    .content {
        padding: 1rem;
    }

    @media (min-width: 768px) {
        .modal {
            width: 40rem;
            left: calc(50% - 20rem);
        }
    }

    footer {
        float: right;
        padding: 1rem;
    }

    h2 {
        margin: 1.5rem 2rem 0.5rem 2rem;
    }
</style>
