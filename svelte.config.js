import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import { uploadPlugin } from './src/lib/scripts/uploadPlugin.mjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		vite: {
            // The File Upload plugin
            plugins: [uploadPlugin],
        }
	}

};

export default config;
