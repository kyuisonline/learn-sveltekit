import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [mdsvex({ extensions: ['.md', '.svx'] }), vitePreprocess()],

	kit: {
		adapter: adapter()
	}
};

export default config;
