---
title: Building an Effective Metadata Component with SvelteKit
description: SvelteKit makes it easy to build a metadata component that will ensure you're getting the most out of your SEO strategy.
---

# {title}

{description}

## Why Metadata Matters

Metadata provides additional context to web pages beyond what the end-user can see. Shared links and search engine results pages (SERPs) use metadata to generate previews, and web crawlers use it to identify and understand page content.

Though it is read by machines, write metadata with humans in mind. Including unique titles and descriptions, adding images with alt text, and defining clear URL structures are all things search engine web crawlers look for when indexing pages. These properties are also the building blocks of link previews, which are a powerful way to get the word out about your website or app.

A metadata component allows us to write per-page metadata without repeating too much code.

## Setting up a `$site` Store

First, define an object for site-wide metadata. The object should include properties that don't need to change per-page and fallbacks in case page data is unavailable. Store the object in a `readable` Svelte store so that it can be accessed throughout the project. Each of these properties will be covered in detail below, under [Which Metadata Tags to Use](#which-metadata-tags-to-use).

```svelte
// src/lib/stores.js

import { readable } from 'svelte/store'

export const site = readable({
	title: 'Learn SvelteKit',
	description: 'Articles, tutorials, and updates revolving around the SvelteKit framework.',
	url: import.meta.env.VITE_CLIENT_URL,
	image_src: `${import.meta.env.VITE_CLIENT_URL}/card-1440x720.png`,
	image_alt: 'Banner logo.',
	twitter_card: 'summary',
	twitter_handle: 'kyleulman',
	type: 'website',
	app_id: '435098175324802'
})
```

> To get the correct URL across environments, assign the sites's base URL to an environment variable. This ensures a consistent URL string when testing and in production.

## Setting up the Metadata Component

1. Create `Head.svelte` in the component directory. It's perfectly acceptable to call it `Metadata.svelte` as well.

2. Open a `script` tag and import the readable store `$site`. This is where we'll access the site-wide metadata.

3. Page metadata will be passed to the component via the `page` object. Set it to an empty object and export it.

4. Below the closing `script` tag, add the special element `<svelte:head>`. This allows us to insert tags to the document head from SvelteKit pages.

```svelte
<!-- src/lib/Head.svelte -->
<script>
	import { site } from './stores';

	export let page = {};
</script>

<svelte:head>
	<!-- Metadata tags here -->
</svelte:head>
```

## Metadata in 2022

The requirements for which metadata tags to use evolve with the web, but there are a few that are absolutely required and some that should be included to validate in link previews and SERPs entities —namely Open Graph, and Twitter.

### The Open Graph Protocol

The [Open Graph Protocol](https://ogp.me/) was designed at Facebook as a way to connect web pages over a social graph. It is widely adopted for its simple application and structure. Open Graph properties are prepended with `og:`.

### Twitter Cards

Twitter has a protocol that [extends metadata for social share cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup) on its platform. Twitter will fallback to some common `og:` tags, reducing the need to repeat code. Twitter properties are prepended with `twitter:`.

<h2 id="which-metadata-tags-to-use"> Which Metadata Tags to Use</h2>

The tags we'll be using include `[og:]title`, `[og:]description`, `og:image`, `og:image:alt`, `og:url` (& the `canonical` link tag), `og:type`, `twitter:card`, `twitter:creator`, and `fb:app_id`.

> The `charset` and `viewport` tags, as well as the `lang` attribute on the root `html` tag should be included in every project. Fortunately, SvelteKit takes care of these for us!

### `title`

The title is often the first impression users get of a website. Make sure it is short and informative of the content on the page.

A common format is to display the page title and the site title, separated by a hyphen ("-") or a pipe ("|"). Every page should have at minimum a unique title and description, but as a fallback, set a condition to display only the site title if a page title is not found.

```svelte
<!-- src/lib/Head.svelte -->
<script>
	// ...

	let title

	if (page.title) {
		title = `${page.title} - ${$site.title}`
	} else {
		title = $site.title
	}
</script>

<svelte:head>
    <!-- Title -->
	<title>{title}</title>
	<meta property="og:title" content={title} />
```

### `description`

Descriptions give context to the title and provide a summary of page content. Page descriptions are favored, falling back to the site-wide description using the logical `OR (||)` operator.

```svelte
<!-- Description -->
<meta name="description" content={page.description || $site.description} />
<meta property="og:description" content={page.description || $site.description} />
```

### `og:image` & `og:image:alt`

Defines a featured image that will appear in link previews. If left undefined, the image of highest priority on the page will be chosen, which is not always ideal. Alternative text is used by screen readers and web crawlers.

```svelte
<!-- Image -->
<meta property="og:image" content={page.image_src || $site.image_src} />

<!-- Image alt text -->
<meta property="og:image:alt" content={page.image_alt || $site.image_alt} />
```

### `og:url` and canonical link

A canonical URL refers to the URL that will appear in links and SERPs. Absolutely defining the URL safeguards against the indexing problems that surface when pages are redirected and URLs are dynamically generated.

```svelte
<!-- URL -->
<meta property="og:url" content={page.url || $site.url} />
<link rel="canonical" href={page.url || $site.url} />
```

### `og:type`

The `type` property identifies a page with the type of content that exists on it. The fallback "website", is generally enough to get up and running, but content that satisfies a specific type like this article can be assigned the type "article" on a page level. [More on object types - https://ogp.me/#types](https://ogp.me/#types)

```svelte
<!-- Type -->
<meta property="og:type" content={page.type || $site.type} />
```

### `twitter:card` & `twitter:creator` (optional)

Twitter provides [a few different options](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) for its social sharing cards. When left undefined, the card will default to "summary".

To include a Twitter username, add the `twitter:creator` tag.

```svelte
<!-- Twitter -->
<meta property="twitter:card" content={$site.twitter_card} />
<meta name="twitter:creator" content={'@' + $site.twitter_handle} />
```

### `fb:app_id` (optional)

Though it is not required, the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) will flag a missing `app_id` property. To fully validate, [create a facebook app](https://developers.facebook.com/apps/create/) and snag the ID.

```svelte
	<!-- Facebook -->
	<meta property="fb:app_id" content={$site.app_id} />

    <slot />
</svelte:head>
```

> I've named this component Head.svelte and not Metadata.svelte with the idea that I might add other non-meta tags here. That's also why I've also included a `<slot />` at the bottom.

## Adding Metadata from a Page

Here's how this article's page metadata looks.

```svelte
<script>
	import Head from '$lib/Head.svelte';
</script>

<Head
	page={{
		title: 'Building an Effective Metadata Component with SvelteKit',
		description:
			'SvelteKit makes it easy to build a metadata component that will save time and ensure you’re getting the most out of your SEO strategy.',
		url: import.meta.env.VITE_CLIENT_URL + '/metadata-component'
	}}
/>
```

## Testing the Component

When testing metadata in development, keep an eye on the `head` element in the "elements" tab of developer tools. Make sure page data is being added appropriately and that fallbacks are sensical.

Once the site is live, there are a number of debuggers that can be used to validate metadata. Chief amongst these is the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). Others include:

- **[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)** - This one will cite `author`, and `publish date` as optional tags.
- **[Meta Tags](https://metatags.io/)** - Not to be used for validation, but the best way to preview the Google search result and social share cards from a variety of websites.

> Twitter has a card validator, but its preview feature has been disabled and it shows only surface-level results. A surefire way to test for link previews is to type the URL (`http(s)` protocol included) into the status inputs of the social media sites you want to target. The preview will oftentimes show before posting the status, but may lag a bit on a account of loading the image.

To get a look at the full code that powers the metadata component on Learn SvelteKit, please feel free to check out the [GitHub repo](https://github.com/kyleulman/learn-sveltekit).

Happy learning!
