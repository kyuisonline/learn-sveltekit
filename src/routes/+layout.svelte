<script lang="ts">
	import '../app.css';
</script>

<main class="my-12 flex-1 space-y-12">
	<slot />
</main>
<footer class="my-6 text-center">&copy; {new Date().getFullYear()} Ulman Digital</footer>
