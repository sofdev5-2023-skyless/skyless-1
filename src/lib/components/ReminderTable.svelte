<script lang="ts">
	import ReminderElement from '$lib/components/ReminderElement.svelte';
	import { storeReminders } from '$lib/stores/store';
	import type { Reminder } from '$lib/types/reminder';
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';

	let reminders: Reminder[] = [];
	storeReminders.subscribe((value) => (reminders = value));
	onMount(async () => {
		const isDoctor = false;
		const key = localStorage.getItem('key');
		const url = `/api/appoinments/get-all?key=${key}&isDoctor=${isDoctor}`;
		const response = await fetch(url);
		const reminders = await response.json();
		storeReminders.set(reminders);
	});
</script>

<Toaster position="top-center" />

<div class="container mx-auto pt-20">
	<div class="overflow-x-auto">
		<table class="table">
			{#if reminders.length !== 0}
				<!-- head -->
				<thead>
					<tr>
						<th />
						<th>Doctor</th>
						<th>Date</th>
						<th>Description</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each reminders as { date, description, id_doctor, id_user, hour, id_appointment, id_transaction } (id_appointment)}
						<ReminderElement
							{id_appointment}
							{date}
							{description}
							{hour}
							idDoctor={id_doctor}
							idUser={id_user}
							{id_transaction}
						/>
					{/each}
				</tbody>
			{:else}
				<div class="hero min-h-screen bg-base-100">
					<div class="hero-content text-center">
						<div class="max-w-md">
							<h1 class="text-5xl font-bold">There is no appoinments</h1>
							<p class="py-6">
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
