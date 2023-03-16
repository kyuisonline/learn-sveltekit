<script lang="ts">
	import type { PageData } from './$types';
	import Head from '$lib/Head.svelte';

	export let data: PageData;
</script>

<Head page={data.metadata.page} site={data.metadata.site} />

<header class="m-auto my-12 max-w-[65ch]">
	<h1 class="text-4xl">learnsveltekit</h1>
</header>
<section class="m-auto max-w-[65ch]">
	<ul class="space-y-2">
		{#each data.posts as { title, slug }}
			<li><a href={slug} class="underline">{title}</a></li>
		{/each}
	</ul>
</section>
