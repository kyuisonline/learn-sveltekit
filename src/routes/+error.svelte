<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="my-12 text-center">
	<h1 class="text-4xl">{$page.status}: {$page.error?.message}</h1>
</section>
