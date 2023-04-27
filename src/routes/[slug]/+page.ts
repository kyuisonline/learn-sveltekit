import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, url }) => {
	try {
		const page = await import('./content');
		const post = await import(`../[slug]/posts/${params.slug}.md`);

		page.post.metadata.url = url.href;
		page.post.metadata.title = post.metadata.title;
		page.post.metadata.description = post.metadata.description;

		return {
			content: page.post,
			body: post.default
		};
	} catch (error) {
		throw redirect(303, '/');
	}
}) satisfies PageLoad;
