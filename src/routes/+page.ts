import type { PageLoad } from './$types';

interface Post {
	title: string;
	slug: string;
	description: string;
}

export const load = (async ({ url }) => {
	const page = await import('./content');

	page.home.metadata.url = url.href;

	return {
		content: page.home,
		posts: (await getPosts()) as Post[]
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
