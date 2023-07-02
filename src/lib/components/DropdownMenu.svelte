<script>
	import { menuOpen } from '$lib/stores/store';
	import ListIcon from '../../icons/ListIcon.svelte';
</script>

<div class="dropdown">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<label tabindex="0" class="btn btn-ghost lg:hidden">
		<ListIcon />
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<li tabindex="0">
			<a class="justify-between" href="/doctor-list"> View all doctors </a>
		</li>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<li tabindex="0">
			<a href="/about-us" class="justify-between"> About us </a>
		</li>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		{#if $menuOpen}
			<li tabindex="0">
				<div class="drawer-content">
					<!-- Page content here -->
					<label for="my-drawer" class="drawer-button">Open drawer</label>
				</div>
			</li>
		{/if}
	</ul>
</div>
