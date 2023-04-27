import type { LayoutLoad } from './$types';

export const load = (async () => {
	const shared = (await import('./content')).sharedMetadata;

	return {
		shared
	};
}) satisfies LayoutLoad;
