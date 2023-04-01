<script lang="ts">
	import { page } from '$app/stores';
	import { Head } from '@kyleulman/lib';
	import '../app.css';

	export let data;
</script>

{#key $page.data.page}
	<Head page={$page.data.page} site={data.site} />
{/key}

<main class="my-12 flex-1 space-y-12">
	<slot />
</main>
<footer class="my-6 text-center">&copy; {new Date().getFullYear()} Ulman Digital</footer>
