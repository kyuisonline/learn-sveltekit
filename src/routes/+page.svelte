<script lang="ts">
	import type { PageData } from './$types';
	import Head from '$lib/Head.svelte';

	export let data: PageData;
</script>

<Head page={data.metadata.page} site={data.metadata.site} />

<header>
	<h1 class="text-4xl text-emerald-600 dark:text-emerald-400">
		learn<span class="text-emerald-600 dark:text-emerald-400">svelte</span>kit
	</h1>
</header>
<section>
	<ul class="space-y-1">
		{#each data.posts as { title, slug }}
			<li>
				<a
					href={slug}
					class="block bg-neutral-200 p-6 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
				>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</section>
