<script lang="ts">
	import { page } from '$app/stores';
	import { Head, Footer } from '@kyuisonline/workbench';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const copyright = `<a href="https://www.kyu.is" class="text-emerald-400 underline">Kyu is Online</a>`;
</script>

{#key $page}
	<Head page={$page.data.content.metadata} shared={data.shared} />
{/key}

<main class="my-12 flex-1 space-y-12">
	<slot />
</main>

<Footer content={{ copyright }} />
