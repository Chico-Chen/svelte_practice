<script>
	import Card from './Card/Card.svelte';
	import Header from './Header/Header.svelte';

	let titles = ['Tasks', 'Done'];
</script>

<style> 
	.Card {
		margin: 5rem;
	}
	
	.background {
		position: fixed;
		height: 100%;
		width: 100%;
		right: 0;
		background-color: rgb(243, 179, 41);
	}
</style>

<div class="background">
	<Header/>
	<section class="Card">
		{#each titles as title} 
			<Card title={title} />
		{/each}
	</section>
</div>