<script lang="ts">
	import Head from '$lib/Head.svelte';
	import '$lib/highlight.css';
	import type { PageData } from './$types';

	export let data: PageData;

	const Body = data?.body;
</script>

<Head page={data.metadata.page} site={data.metadata.site} />

<a href="/" class="my-2 block text-sm font-normal">&larr; Back home</a>
<article class="prose prose-neutral m-auto my-12 dark:prose-invert">
	<Body />
</article>
<a href="/" class="my-2 block text-sm font-normal">&larr; Back home</a>
