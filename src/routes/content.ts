import type { PageMetadata, SharedMetadata } from '@kyuisonline/workbench';

export const sharedMetadata: SharedMetadata = {
	title: 'Learn SvelteKit',
	type: 'website',
	robots: 'all',
	image: {
		src: 'https://res.cloudinary.com/kyuisonline/image/upload/v1682722187/learn-sveltekit/card-720-png.png',
		alt: 'Learn SvelteKit logo.',
		width: '720',
		height: '720'
	},
	twitter: {
		card: 'summary',
		site: 'kyuisonline',
		creator: 'kyuisonline'
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
