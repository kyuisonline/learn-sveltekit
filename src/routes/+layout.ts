import type { SiteMetadata } from '@kyleulman/lib';
import type { LayoutLoad } from './$types';

export const load = (({ url }) => {
	const site: SiteMetadata = {
		title: 'Learn SvelteKit',
		type: 'website',
		robots: 'all',
		imageSrc: url.origin + '/banner-1440x720.jpg',
		imageAlt: 'Website image.',
		twitterCard: 'summary_large_image',
		twitterSite: 'kyleulman',
		twitterCreator: 'kyleulman'
	};

	return {
		site: site
	};
}) satisfies LayoutLoad;
