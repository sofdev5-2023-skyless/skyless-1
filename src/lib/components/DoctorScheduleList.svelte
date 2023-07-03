<script lang="ts">
	import { updateSchedules } from '$lib/stores/store';
	import { loadDoctorSchedules } from '$lib/ts/useLoadData';
	import axios from 'axios';
	import toast from 'svelte-french-toast';

	export let id_doctor: string = '';

	const handleDelete = async (id: number) => {
		const { data } = await axios.post('/api/doctor_schedule/delete', {
			id
		});
		if (data.ok === 200) {
			toast.success('A schedule has been deleted');
			updateSchedules.set(!$updateSchedules);
		} else {
			toast.error('This schedule has been reserved');
		}
	};
</script>

<div class="container mx-auto items-center justify-center text-center p-5">
	<h2 class="text-2xl font-bold animate__animated animate__fadeIn">Your schedules</h2>

	{#key $updateSchedules}
		{#await loadDoctorSchedules(id_doctor)}
			<p class="text-center items-center justify-center">
				Loading<span class="loading loading-dots loading-xs" />
			</p>
		{:then schedules}
			{#if schedules.length === 0}
				<h1 class="text-xl">You do not have scheudules</h1>
			{:else}
				<div class="overflow-x-auto">
					<table class="table-lg mx-auto table-zebra">
						<!-- head -->
						<thead>
							<tr>
								<th>Schedule</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{#each schedules as { id, schedule } (id)}
								<tr class="hover animate__animated animate__fadeIn">
									<td>{schedule}</td>
									<button class="btn btn-error" on:click={() => handleDelete(id)}>Delete</button>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		{/await}
	{/key}
</div>
