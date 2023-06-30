<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.postcss';
	import Registry from '$lib/ts/registry';
	import { onMount } from 'svelte';
	import { menuOpen } from '$lib/stores/store';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import Register from '$lib/components/Register.svelte';

	onMount(async () => {
		const key = localStorage.getItem('key');
		const token = localStorage.getItem('token');

		if (key != null && token != null) {
			Registry.auth?.getClient().init({
				onLoad: 'login-required'
			});
		}
	});
</script>

<div class="flex flex-col">
	<header class="sticky z-50">
		<Header />
	</header>

	<slot />
	<Footer />
	{#if $menuOpen}
		<SideMenu />
	{/if}
	<!-- Put this part before </body> tag -->
	<Register />
</div>
