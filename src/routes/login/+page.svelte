<script>
	import { onMount } from 'svelte';
	import Registry from '$lib/ts/registry';
	import { browser } from '$app/environment';

	onMount(() => {
		if (browser) {
			Registry.auth?.login();
		}
	});
</script>

<h1>Login</h1>
