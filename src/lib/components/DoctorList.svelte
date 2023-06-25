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

<div class="container mx-auto pt-16 pl-12 pr-20 sm:ml-64">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div class="collapse border border-base-300 bg-base-100 rounded-box collapse-arrow">
		<input type="checkbox" bind:checked={isOpen} />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="collapse-title text-xl font-medium" on:click={changeState}>
			<h1 class="text-4xl font-bold">{specialityName}</h1>
		</div>
		<div class="collapse-content">
			<!-- <DoctorCard /> -->
			{#if actualIsSearch}
				{#each doctors as { id, name, lastName, cellphone, speciality } (id)}
					<DoctorCard {name} {lastName} {cellphone} {speciality} {id} />
					<div class="flex flex-col w-full">
						<div class="divider" />
					</div>
				{/each}
			{:else}
				{#await loadDoctors()}
					<div class="container">
						<div class="grid h-20 card bg-base-300 rounded-box place-items-center">
							Loading Doctors...
						</div>
					</div>
				{:then doctors}
					{#each doctors as { id, name, lastName, cellphone, speciality } (id)}
						<DoctorCard {name} {lastName} {cellphone} {speciality} {id} />
						<div class="flex flex-col w-full">
							<div class="divider" />
						</div>
					{/each}
				{/await}
			{/if}
		</div>
	</div>
</div>
