<script lang="ts">
	import { menuOpen } from '$lib/stores/store';

	export let id: string = '';
	export let name: string = 'Default';
	export let lastName: string = '';
	export let speciality: string = 'Speciality';
	export let cellphone: string = '000000000';
</script>

<div class="card bg-base-100 shadow-xl">
	<figure>
		<div class="avatar">
			<div class="w-24 rounded-full">
				<img src="./src/lib/images/default.png" alt="default" />
			</div>
		</div>
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title">{name} {lastName}</h2>
		<p>
			<b>Specialities:</b>
			{speciality}
		</p>
		<div>
			<a class="link link-hover link-info" href="/doctor-profile">More information</a>
			<br />
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="link link-hover link-info"><i class="bi bi-telephone-fill" />{cellphone}</a>
			<br />
			{#if $menuOpen}
				<label for={`my-modal-${id}`} class="btn btn-primary">Schedule now</label>
			{/if}
		</div>
	</div>
</div>
