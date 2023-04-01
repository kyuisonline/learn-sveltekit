import type { PageMetadata } from '@kyleulman/lib';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, url }) => {
	try {
		const post = await import(`../[slug]/posts/${params.slug}.md`);
		const page: PageMetadata = {
			title: post.metadata.title,
			description: post.metadata.description,
			url: url.href
		};

		return {
			page: page,
			body: post.default
		};
	} catch (error) {
		throw redirect(303, '/');
	}
}) satisfies PageLoad;
