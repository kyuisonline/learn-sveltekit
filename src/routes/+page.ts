import type { PageLoad } from './$types';

export const prerender = true;

export const load = (async ({ parent, url }) => {
	const { metadata } = await parent();

	return {
		posts: (await getPosts()) as Post[],
		metadata: {
			...metadata,
			page: {
				title: 'Home',
				url: url.href
			}
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
