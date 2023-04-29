import type { PageMetadata } from '@kyuisonline/workbench/dist/types';

export const post: { metadata: PageMetadata } = {
	metadata: {
		title: '',
		description: '',
		url: '',
		image: {
			src: 'https://res.cloudinary.com/kyuisonline/image/upload/v1682722187/learn-sveltekit/card-1440x720-png.png',
			alt: 'Learn SvelteKit logo.',
			width: '1440',
			height: '720'
		},
		twitter: {
			card: 'summary_large_image',
			site: 'kyuisonline',
			creator: 'kyuisonline'
		}
	}
};
