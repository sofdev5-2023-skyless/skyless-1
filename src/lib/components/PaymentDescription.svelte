<script>
	import { appointment } from '$lib/stores/store';
	import { loadDoctor, loadPatient, loadSchedule } from '$lib/ts/useLoadData';
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Medical Appointment</h2>

		{#await loadPatient($appointment.id_user)}
			<p>Name's Patient: Loading...</p>
		{:then patient}
			<p>Name's Patient: {patient.firstName} {patient.lastName}</p>
		{:catch error}
			{error}
		{/await}

		{#await loadDoctor($appointment.id_doctor)}
			<p>Name's Doctor: Loading...</p>
		{:then doctor}
			<p>Name's Doctor: Dr. {doctor.name} {doctor.lastName}</p>
		{/await}

		<p>Description: {$appointment.description}</p>
		<p>Date: {$appointment.date}</p>

		{#await loadSchedule($appointment.hour)}
			<p>Schedule: Loading...</p>
		{:then schedule}
			<p>Schedule: {schedule.schedule}</p>
		{/await}
	</div>
</div>
