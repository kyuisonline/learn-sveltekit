import type { PageMetadata } from '@kyleulman/lib';
import type { PageLoad } from './$types';
import { content } from '../content';

export const load = (async ({ url }) => {
	const page: PageMetadata = {
		title: 'Home',
		description: `Documenting what's possible with SvelteKit.`,
		url: url.href
	};

	return {
		page: page,
		content: {
			home: content.home,
			posts: (await getPosts()) as Post[]
		}
	};
}) satisfies PageLoad;

async function getPosts() {
	const modules = import.meta.glob(`./[slug]/posts/*.md`);
	const posts = Object.entries(modules);

	return await Promise.all(
		posts.map(async ([path, resolver]) => {
			const slug = path.slice(15, -3);
			const module = (await resolver()) as {
				[index: string]: object;
			};

			return {
				slug,
				...module.metadata
			};
		})
	);
}
