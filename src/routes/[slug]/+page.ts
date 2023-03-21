import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load = (async ({ params, parent, url }) => {
	const { metadata } = await parent();

	try {
		const post = await import(`../[slug]/posts/${params.slug}.md`);

		return {
			body: post.default,
			metadata: { page: { ...post.metadata, url: url.href }, site: metadata.site }
		};
	} catch (error) {
		throw redirect(303, '/');
	}
}) satisfies PageLoad;
