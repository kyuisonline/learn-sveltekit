import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	try {
		const post = await import(`../[slug]/posts/${params.slug}.md`);

		return {
			body: post.default,
			metadata: post.metadata
		};
	} catch (error) {
		throw redirect(303, '/');
	}
}) satisfies PageLoad;
