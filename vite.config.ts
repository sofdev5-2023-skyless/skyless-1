/// <reference types="vitest" />
/// <reference types="vite/client" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		deps: {
			inline: [/msw/]
		},
		setupFiles: ['tests/setupTest.ts', 'tests/mocks/setup.ts']
	}
});
