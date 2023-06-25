<script>
	import { appointment } from '$lib/stores/store';
	import { loadDoctor, loadPatient, loadSchedule } from '$lib/ts/useLoadData';
</script>

<div style="width: 24rem; background-color: #F3F4F6;" class="shadow-xl p-6">
	<h2 style="font-size: 1.5rem; font-weight: bold; color: #1F2937;" class="mb-4">Medical Appointment</h2>

	{#await loadPatient($appointment.id_user)}
		<p style="color: #374151;">Name's Patient: Loading...</p>
	{:then patient}
		<p style="color: #374151;">Name's Patient: {patient.firstName} {patient.lastName}</p>
	{:catch error}
		<p >{error}</p>
	{/await}

	{#await loadDoctor($appointment.id_doctor)}
		<p style="color: #374151;">Name's Doctor: Loading...</p>
	{:then doctor}
		<p style="color: #374151;">Name's Doctor: Dr. {doctor.name} {doctor.lastName}</p>
	{/await}

	<p style="color: #374151;">Description: {$appointment.description}</p>
	<p style="color: #374151;">Date: {$appointment.date}</p>

	{#await loadSchedule($appointment.hour)}
		<p style="color: #374151;">Schedule: Loading...</p>
	{:then schedule}
		<p style="color: #374151;">Schedule: {schedule.schedule}</p>
	{/await}
</div>


