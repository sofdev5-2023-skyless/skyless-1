<script>
	import { browser } from '$app/environment';
	1;
	import { masterKey, masterToken, menuOpen } from '$lib/stores/store';
	export let data;

	const { isLogged } = data;

	if (browser) {
		const key = localStorage.getItem('key');
		const token = localStorage.getItem('token');

		if (key != null && token != null) {
			masterKey.set(key ?? 'key-layout');
			masterToken.set(token ?? 'token-layout');
			menuOpen.set(true);
		}
	}
</script>

<slot />
