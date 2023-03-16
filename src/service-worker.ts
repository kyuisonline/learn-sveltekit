/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />
import { build, files, prerendered, version } from '$service-worker';

// @types/serviceworker
declare const self: ServiceWorkerGlobalScope;

// Generate access key for new cache
const cacheId = `cache${version}`;

// Worker build files + /static files + prerendered pages
const cachePayloadArr: string[] = [...build, ...files, ...prerendered];
const cachePayloadSet: Set<string> = new Set(cachePayloadArr);

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(cacheId)
			.then((cache) => cache.addAll(cachePayloadArr))
			.then(() => self.skipWaiting())
	);
});
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== cacheId) await caches.delete(key);
			}

			self.clients.claim();
		})
	);
});

// prettier-ignore
self.addEventListener('fetch', (event) => {
	if (
		event.request.method !== 'GET' ||
		event.request.headers.has('range')
	) return

	const {
		isHttp,
		isLocal,
		isStaticAsset,
		isUncached
	} = checks(event)

	if (isHttp && isLocal && !isUncached) {
		event.respondWith(
			(async () => {
				const cachedAsset =
					isStaticAsset &&
					(await caches.match(event.request))

				return cachedAsset || fetchAndCache(event.request)
			})()
		)
	}
})

// prettier-ignore
function checks(event: FetchEvent) {
	const url = new URL(event.request.url)

	const isHttp = url.protocol.startsWith('http')

	const isLocal =
		url.hostname === self.location.hostname &&
		url.port === self.location.port

	const isStaticAsset =
		url.host === self.location.host &&
		cachePayloadSet.has(url.pathname)

	const isUncached =
		event.request.cache === 'only-if-cached' &&
		!isStaticAsset

	return {
		isHttp,
		isLocal,
		isStaticAsset,
		isUncached
	}
}

async function fetchAndCache(request: Request) {
	const cache = await caches.open(`offline${version}`);

	try {
		const response = await fetch(request);
		cache.put(request, response.clone());

		return response;
	} catch (err) {
		const response = await cache.match(request);
		if (response) return response;

		throw err;
	}
}
