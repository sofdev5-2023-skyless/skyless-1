<script>
	import { appointment } from '$lib/stores/store';
	import { loadDoctor, loadPatient, loadSchedule } from '$lib/ts/useLoadData';
</script>

<div class="shadow-xl p-6">
	<h2 class="mt-10 card-title justify-center">Medical Appointment</h2>
  
	{#await loadPatient($appointment.id_user)}
	  <p class="mb-2 font-bold">Name's Patient: Loading...</p>
	{:then patient}
	  <p class="mb-2 "><span class="font-bold">Name's Patient:</span> {patient.firstName} {patient.lastName}</p>
	{:catch error}
	  <p class="mb-2 text-red-500">{error}</p>
	{/await}
  
	{#await loadDoctor($appointment.id_doctor)}
	  <p class="mb-2 font-bold">Name's Doctor: Loading...</p>
	{:then doctor}
	  <p class="mb-2 "> <span class="font-bold">Name's Doctor:</span> Dr. {doctor.name} {doctor.lastName}</p>
	{/await}
  
	<p class="mb-2"> <span class="font-bold">Description:</span> {$appointment.description}</p>
	<p class="mb-2 font-bold">Date: {$appointment.date}</p>
  
	{#await loadSchedule($appointment.hour)}
	  <p class="mb-2 font-bold">Schedule: Loading...</p>
	{:then schedule}
	  <p class="mb-2"><span class="font-bold">Schedule:</span> {schedule.schedule}</p>
	{/await}
  </div>
  

