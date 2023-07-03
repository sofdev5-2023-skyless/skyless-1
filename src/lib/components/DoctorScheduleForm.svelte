<script lang="ts">
	import { updateSchedules } from '$lib/stores/store';
	import { loadDoctorSchedules, loadSchedules } from '$lib/ts/useLoadData';
	import type { schedule } from '@prisma/client';
	import axios from 'axios';
	import toast from 'svelte-french-toast';

	export let id_doctor: string = '';
	let scheduleSelected = '';
	let processing = false;

	const loadAvailableSchedules = async (): Promise<schedule[]> => {
		const schedules = await loadSchedules();
		const doctorSchedules = await loadDoctorSchedules(id_doctor);

		const result = schedules.filter(
			(elem) => !doctorSchedules.some((ds) => elem.schedule === ds.schedule)
		);
		return result;
	};

	const handleSubmit = async () => {
		if (scheduleSelected === '') return;
		if (processing) return;
		processing = true;
		const { data } = await axios.post('/api/doctor_schedule/add', {
			id_doctor,
			schedule: scheduleSelected
		});
		if (data.ok == 200) {
			toast.success('New schedule added');
			updateSchedules.set(!$updateSchedules);
		}
		processing = false;
	};
</script>

<div class="items-center justify-center p-5 text-center animate__animated animate__fadeIn">
	<form method="post" on:submit|preventDefault={handleSubmit}>
		<label for="schedule">Add an schedule available: </label>
		<select
			bind:value={scheduleSelected}
			id="schedule"
			class="select select-primary w-full max-w-xs"
		>
			{#key $updateSchedules}
				{#await loadAvailableSchedules()}
					<option value="0">Loading...</option>
				{:then schedules}
					<option disabled selected>Select an available for you</option>
					{#each schedules as { id_schedule, schedule }}
						<option value={id_schedule}>{schedule}</option>
					{/each}
				{/await}
			{/key}
		</select>
		<button class="btn btn-primary" disabled={processing}
			><span class:loading={processing} class:loading-xs={processing} /> Add schedule</button
		>
	</form>
</div>
