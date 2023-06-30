<script lang="ts">
	import LoginIcon from '../../icons/LoginIcon.svelte';
	import MedicalCheckLogo from '$lib/images/MedicalCheckLogo.png';
	import { areYouDoctor, masterKey, masterToken, menuOpen } from '$lib/stores/store';
	import DropdownMenu from './DropdownMenu.svelte';
	import { browser } from '$app/environment';
	import Registry from '$lib/ts/registry';
	import { onMount, tick } from 'svelte';

	let id: string;
	let isLogOut: boolean = false;

	masterKey.subscribe((value) => (id = value));
	$: id;
	$: isLogOut;

	const handleLogOut = async () => {
		if (isLogOut) return;
		isLogOut = true;
		if (browser) {
			localStorage.removeItem('key');
			localStorage.removeItem('token');
			masterKey.update((value) => (value = 'key-default'));
			masterToken.update((value) => (value = 'token-default'));
			menuOpen.set(false);
			await Registry.auth?.getClient().logout({ redirectUri: `${location.origin}` });
		}
		isLogOut = false;
	};

	onMount(() => {
		if (browser) {
			const key = localStorage.getItem('key');
			const token = localStorage.getItem('token');

			if (key != null && token != null) {
				masterKey.set(key ?? 'key-layout');
				masterToken.set(token ?? 'token-layout');
				menuOpen.set(true);
			}
		}
	});
</script>

<nav class="fixed top-0 z-59 w-full navbar bg-base-100">
	<div class="navbar-start">
		<DropdownMenu />
		{#if !$areYouDoctor}
			<a href={id === 'key-default' ? '/' : `/patient/${id}`}
				><img src={MedicalCheckLogo} width="200px" alt="" /></a
			>
		{:else}
			<a href={id === 'key-default' ? '/' : `/doctor/${id}`}
				><img src={MedicalCheckLogo} width="200px" alt="" /></a
			>
		{/if}
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/doctor-list">View all doctors</a>
			</li>
			<li>
				<a href="/about-us">About us </a>
			</li>
			{#if $menuOpen}
				<li>
					<div class="drawer-content">
						<!-- Page content here -->
						<label for="my-drawer" class="drawer-button">Open drawer</label>
					</div>
				</li>
			{/if}
		</ul>
	</div>
	<div class="navbar-end">
		{#if id.length <= 11}
			<a class="btn btn-primary" href="/login">
				<LoginIcon />
				&nbsp; Login
			</a>
		{:else}
			<button class="btn btn-primary" class:loading={isLogOut} on:click={handleLogOut}>
				<LoginIcon />
				Logout
			</button>
		{/if}
	</div>
</nav>
