<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Learn SvelteKit</title>
	<meta name="description" content="Documenting what's possible with SvelteKit." />
</svelte:head>

<header class="m-auto my-12 max-w-[65ch]">
	<h1 class="text-4xl">Learn SvelteKit</h1>
	<p>Documenting what's possible with SvelteKit.</p>
</header>
<section class="m-auto max-w-[65ch]">
	<ul class="space-y-2">
		{#each data.posts as { title, slug }}
			<li><a href={slug} class="underline">{title}</a></li>
		{/each}
	</ul>
</section>
