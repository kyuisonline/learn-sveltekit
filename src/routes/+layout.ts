import type { LayoutLoad } from './$types';

export const load = (({ url }) => {
	return {
		metadata: {
			site: {
				title: 'Learn SvelteKit',
				description: `Documenting what's possible with SvelteKit.`,
				url: url.origin,
				image_src: `${url.origin}/banner-1440x720.jpg`,
				image_alt: 'Site icon.',
				twitter_card: 'summary_large_image',
				twitter_handle: 'kyleulman',
				type: 'website'
			}
		}
	};
}) satisfies LayoutLoad;
