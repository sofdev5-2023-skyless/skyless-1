<script lang="ts">
	import DoctorList from '$lib/components/DoctorList.svelte';
	import type { Speciality } from '$lib/types/speciality';
	import { onMount } from 'svelte';
	import Searcher from '$lib/components/Searcher.svelte';
	import { isSearch } from '$lib/stores/store';
	import { loadDoctorsBySpeciality } from '$lib/ts/useLoadData';
	import ReminderForm from '$lib/components/ReminderForm.svelte';

	let specilities: Speciality[] = [];
	let actualIsSearch: boolean;

	onMount(async () => {
		const resp = await fetch('/api/specialities');
		const js: Speciality[] = await resp.json();
		specilities = js;
	});

	isSearch.subscribe((actual) => {
		actualIsSearch = actual;
	});
</script>

<div class="container mx-auto items-center justify-center">
	<Searcher />

	<div class="flex flex-col pb-10">
		{#if !actualIsSearch}
			{#each specilities as { id, name } (id)}
				<DoctorList
					isOpen={id[id.length - 1] <= '1'}
					specialityName={name}
					specialityPath={`/api/doctors/speciality?id=${id}`}
				/>
				{#await loadDoctorsBySpeciality(id) then doctors}
					{#each doctors as { id } (id)}
						<ReminderForm {id} />
					{/each}
				{/await}
			{/each}
		{/if}
	</div>
</div>
