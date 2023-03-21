<script lang="ts">
	import type { Metadata } from '$lib/types';

	export let site: Metadata;
	export let page: Metadata;

	let title: string;

	// Title
	if (page.title) {
		title = `${page.title} - ${site.title}`;
	} else {
		title = site.title;
	}
</script>

<svelte:head>
	<!-- Title -->
	<title>{title}</title>
	<meta property="og:title" content={title} />

	<!-- Description -->
	<meta name="description" content={page.description || site.description} />
	<meta property="og:description" content={page.description || site.description} />

	<!-- Image -->
	<meta property="og:image" content={page.image_src || site.image_src} />

	<!-- Image alt text -->
	<meta property="og:image:alt" content={page.image_alt || site.image_alt} />

	<!-- URL -->
	<meta property="og:url" content={page.url || site.url} />
	<link rel="canonical" href={page.url || site.url} />

	<!-- Type -->
	<meta property="og:type" content={page.type || site.type} />

	<!-- Twitter -->
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={page.description || site.description} />
	<meta name="twitter:card" content={site.twitter_card} />
	<meta name="twitter:image" content={page.image_src || site.image_src} />
	<meta name="twitter:image:alt" content={page.image_alt || site.image_alt} />
	<meta name="twitter:site" content={'@' + site.twitter_handle} />

	<slot />
</svelte:head>
