---
title: Make Your SvelteKit App Available Offline with Service Workers
description: SvelteKit makes and installing and configuring service workers an afterthought.
---

# {title}

If you've noticed a recent increase in major network outages, you're not alone. Reports of providers like Amazon Web Services and Cloudflare going down made the rounds for [multiple outages in December of 2021](https://thinkcloudly.com/aws-outage-december-2021-know-why/) as well as one [a couple of months ago](https://thinkcloudly.com/the-cloudflare-outage-of-2022/). _Techquickie,_ a YouTube channel for bite-sized tech news, [cited potential reasons](https://youtu.be/L0A-FIyzt1I) for the downtime, including the mounting need for work-from-home solutions, “always on” internet-of-things devices like smart thermostats, and prolonged video streaming sessions. Providers are working to catch up with the demand, but there are things that developers can be doing right now to keep apps and websites humming, even when the internet goes down.

## Introduction to Service Workers

Service workers work with the browser to offer native app-like features that improve the end user experience. They intercept requests from the network and execute code before delivering a response to the client. Service workers are supported across all major browsers, and are considered a progressive enhancement, meaning that there are no negative effects on browsers where they aren’t yet implemented. A primary function of service workers is the ability to cache static resources for quicker load times and offline access.

## How to Set Up a Service Worker Cache in a SvelteKit Project

SvelteKit does much of the heavy lifting by automatically registering the worker and providing a handy module that contains everything we need to set up a cache and add the appropriate files. To start, add `src/service-worker.js` or `src/service-worker/index.js` to your project.

> Service workers cannot be detected by the browser in development mode. Be sure to build your app with `npm run build` then `npm run preview` to test it in the browser.

### The `$service-worker` module

```javascript
import { build, files, prerendered, version } from '$service-worker';

// Generate unique ID for new cache
const cacheId = `cache${version}`;

// Build files + /static files + prerendered pages
const cachePayloadArr = [...build, ...files, ...prerendered];
const cachePayloadSet = new Set(cachePayloadArr);
```

- The worker will refresh the cache if it detects a change in configuration. Assigning a unique identifier to the cache ensures that the worker will use a fresh cache on each build of the app.
- `version` refers to the timestamp of the current SvelteKit build
- The `$service-worker` module exports arrays containing static files from the `build` and `static` directories, as well as `prerendered` files. Concatenate the arrays and initialize a `set` object for portability later on.

### Install

```javascript
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(cacheId)
			.then((cache) => cache.addAll(cachePayloadArr))
			.then(() => self.skipWaiting())
	)
}
```

- After the worker is registered and downloaded, the browser will try to install it. Create the new cache using the uniquely generated `cacheId` and load it with the cache payload array.
- The `install` step won’t complete until all clients have stopped using a previous worker. Override this with `self.skipWaiting()` to force the worker to activate.

### Activate

```javascript
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== cacheId) await caches.delete(key)
			}

			self.clients.claim()
		})
	)
}
```

- On `activate`, purge old caches and claim clients that may have been attached to previous workers.

> `.waitUntil()` tells functional events like `fetch` , `sync` , and `push` to wait for the worker to be installed and activated.

Once the service worker is activated, it can start intercepting requests and caching pages with `fetch`.

## Fetch

```javascript
self.addEventListener('fetch', (event) => {
	// ...
});
```

- The `fetch` event fires any time a file within the scope of the worker is requested.

First, conduct a series of checks to allow only specified resources to be cached.

### 1. Check for request method & range requests

```javascript
// ...

if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

// ...
```

- Since we are interested in caching only resources tied to navigable routes, ignore any non-`GET` requests.
- Requests with the `range` header [can be cached](https://web.dev/sw-range-requests/), but are known to cause problems, and the required configuration is out of the scope of this tutorial, so omit them for now.

### 2. Check that the resource is delivered over `http(s)`, is local to the app, is a static asset, and was cached when the service worker was installed.

```javascript
// ...

const { isHttp, isLocal, isStaticAsset, isUncached } = checks(event);

// ...
```

```javascript
function checks(event) {
	const url = new URL(event.request.url);

	const isHttp = url.protocol.startsWith('http');

	const isLocal = url.hostname === self.location.hostname && url.port === self.location.port;

	const isStaticAsset = url.host === self.location.host && cachePayloadSet.has(url.pathname);

	const isUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;

	return {
		isHttp,
		isLocal,
		isStaticAsset,
		isUncached
	};
}
```

### 3. Handle the response

```javascript
if (isHttp && isLocal && !isUncached) {
	event.respondWith(
		(async () => {
			const cachedAsset = isStaticAsset && (await caches.match(event.request));

			return cachedAsset || fetchAndCache(event.request);
		})()
	);
}
```

- If the resource exists in the cache, return it. If it doesn’t, fetch it from the network, cache it, and return the response.

> Use `event.respondWith()` to send the response to the client.

```javascript
async function fetchAndCache(request) {
	const cache = await caches.open(`offline${version}`)

	try {
		const response = await fetch(request)
		cache.put(request, response.clone())

		return response
	} catch (err) {
		const response = await cache.match(request)
		if (response) return response

		throw err
}
```

## Full Code Example

```javascript
import { build, files, prerendered, version } from '$service-worker';

// Generate unique ID for new cache
const cacheId = `cache${version}`;

// Build files + /static files + prerendered pages
const cachePayloadArr = [...build, ...files, ...prerendered];
const cachePayloadSet = new Set(cachePayloadArr);

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
function checks(event) {
	const url = new URL(event.request.url)

	// Omit data urls, etc...
	const isHttp = url.protocol.startsWith('http')

	// Is the resource within the scope of the app?
	const isLocal =
		url.hostname === self.location.hostname &&
		url.port === self.location.port

	const isStaticAsset =
		url.host === self.location.host && 
		cachePayloadSet.has(url.pathname)

	// Was the resource cached on install?
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

async function fetchAndCache(request) {
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
```

## Conclusion

This is only the tip of the iceberg in terms of what a service worker can do for your app. In the future I will write articles on the functional events `sync` and `push` which extend apps’ capabilities with background updates and push notifications, respectively.

Thanks for reading!
