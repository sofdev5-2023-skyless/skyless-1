<script lang="ts">
	import ReminderElement from '$lib/components/ReminderComponentDrData.svelte';
	import { storeReminders } from '$lib/stores/store';
	import type { Reminder } from '$lib/types/reminder';
	import { onMount } from 'svelte';
	let reminders: Reminder[] = [];
	storeReminders.subscribe((value) => (reminders = value));

	onMount(async () => {
		const key = localStorage.getItem('key');
		const url = `/api/appoinments/get-all-dr?key=${key}`;
		const response = await fetch(url);
		const reminders = await response.json();
		storeReminders.set(reminders);
	});
</script>

<div class="sm:block pt-16 pb-16">
	<div class="overflow-x-auto w-full">
		<table class="table-lg table-zebra mx-auto w-full">
			{#if reminders.length !== 0}
				<thead>
					<tr>
						<th>Patient</th>
						<th>Date</th>
						<th>Description</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each reminders as { date, description, id_doctor, id_user, hour, id_appointment } (id_appointment)}
						<ReminderElement
							{id_appointment}
							{date}
							{description}
							{hour}
							idDoctor={id_doctor}
							idUser={id_user}
						/>
					{/each}
				</tbody>
			{:else}
				<div class="hero bg-base-100">
					<div class="hero-content text-center">
						<div class="max-w-md">
							<h1 class="text-5xl font-bold">There is no appoinments</h1>
							<p class="py-1">
								Your reminders are visible here, if you need some service, consider booking an
								appointment with our doctors
							</p>
							<a class="btn btn-primary" href="/doctor-list">View all the doctors</a>
						</div>
					</div>
				</div>
			{/if}
		</table>
	</div>
</div>
