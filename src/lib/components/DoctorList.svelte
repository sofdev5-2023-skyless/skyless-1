<script lang="ts">
	import DoctorCard from './DoctorCard.svelte';
	import type { Doctor } from '$lib/types/doctor';

	export let specialityName: string = 'Default';
	export let specialityPath: string = '';
	export let isOpen: boolean = false;
	export let actualIsSearch = false;
	export let doctors: Doctor[] = [];

	const loadDoctors = async () => {
		const resp = await fetch(`${specialityPath}`);
		const doctors: Doctor[] = await resp.json();
		return doctors;
	};

	const changeState = () => {
		isOpen = !isOpen;
	};
</script>

<div class="container mx-auto pt-16">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div class="collapse border border-base-300 bg-base-100 rounded-box collapse-arrow">
		<input type="checkbox" bind:checked={isOpen} />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="collapse-title text-xl font-medium" on:click={changeState}>
			<h1 class="text-2xl font-bold">{specialityName}</h1>
		</div>
		<div class="collapse-content">
			<!-- <DoctorCard /> -->
			{#if actualIsSearch}
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
					{#each doctors as { id, name, lastName, cellphone, speciality } (id)}
						<DoctorCard {name} {lastName} {cellphone} {speciality} {id} />
					{/each}
				</div>
			{:else}
				{#await loadDoctors()}
					<div class="container">
						<div class="grid h-20 card bg-base-300 rounded-box place-items-center">
							<span class="loading loading-bars"></span>
						</div>
					</div>
				{:then doctors}
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
						{#each doctors as { id, name, lastName, cellphone, speciality } (id)}
							<DoctorCard {name} {lastName} {cellphone} {speciality} {id} />
						{/each}
					</div>
				{/await}
			{/if}
		</div>
	</div>
</div>
