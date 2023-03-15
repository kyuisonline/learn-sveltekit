<script lang="ts">
	import '$lib/highlight.css';

	export let data;

	const metadata = data?.metadata;
	const Body = data?.body;
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<article class="prose prose-neutral dark:prose-invert m-auto my-12">
	<a href="/" class="my-2 block text-sm font-normal">Back home</a>
	<Body />
</article>
