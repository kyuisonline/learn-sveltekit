import type { PageMetadata, SharedMetadata } from '@kyleulman/workbench';

export const sharedMetadata: SharedMetadata = {
	title: 'Learn SvelteKit',
	type: 'website',
	robots: 'all',
	image: {
		src: 'https://www.learnsveltekit.com',
		alt: 'Learn SvelteKit logo.',
		width: '1440',
		height: '720'
	},
	twitter: {
		card: 'summary_large_image',
		site: 'kyleulman',
		creator: 'kyleulman'
	}
};

export const home: { metadata: PageMetadata; header: { title: string } } = {
	metadata: {
		title: 'Home',
		description: `Documenting what's possible with SvelteKit.`,
		url: ''
	},
	header: {
		title: 'learnsveltekit'
	}
};
