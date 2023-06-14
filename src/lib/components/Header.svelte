<script lang="ts">
	import LoginIcon from '../../icons/LoginIcon.svelte';
	import MedicalCheckLogo from '$lib/images/MedicalCheckLogo.png';
	import { areYouDoctor, masterKey } from '$lib/stores/store';
	import DropdownMenu from './DropdownMenu.svelte';

	let id: string;
	masterKey.subscribe((value) => (id = value));
	$: id;
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
		<ul class="menu menu-horizontal">
			<li tabindex="0">
				<a href="/doctor-list"> View all doctors</a>
			</li>
			<li tabindex="0">
				<a> About us </a>
			</li>
		</ul>
	</div>
	<div class="navbar-end">
		{#if id.length <= 11}
			<a class="btn btn-ghost" href="/login">
				<LoginIcon />
				&nbsp; Login
			</a>
		{:else}
			<a class="btn btn-ghost" href="/logout">
				<LoginIcon />
				&nbsp; Logout
			</a>
		{/if}
	</div>
</nav>
