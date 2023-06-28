<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { masterKey, masterToken, menuOpen } from '$lib/stores/store';
	import Registry from '$lib/ts/registry';
	onMount(async () => {
		if (browser) {
			localStorage.removeItem('key');
			localStorage.removeItem('token');
			masterKey.update((value) => (value = 'key-default'));
			masterToken.update((value) => (value = 'token-default'));
			menuOpen.set(false);
			await Registry.auth?.getClient().logout({ redirectUri: `${location.origin}` });
		}
	});
</script>

<h1>Login</h1>
