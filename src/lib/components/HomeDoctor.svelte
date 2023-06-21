<script>
	import { onMount } from 'svelte';
	import Carousel from './Carousel.svelte';
	import { areYouDoctor, masterKey } from '$lib/stores/store';
	import ReminderTable from './DoctorReminderTable.svelte';
	import ScheduleForm from "./ScheduleForm.svelte";
	import { goto } from '$app/navigation';
	let isFormVisible = false;
  
  	function toggleForm() {
    	isFormVisible = !isFormVisible;
  	}
	onMount(async () => {
		const resp = await fetch(`/api/doctors/read?id=${$masterKey}`);
		const js = await resp.json();
		if (js.ok === 400) {
			goto(`/patient/${$masterKey}`);
			return;
		}
		areYouDoctor.set(true);
	});
</script>

<Carousel />

<div class="p-10 sm:ml-614">
	<button class="btn btn-primary" >SCHEDULE APPOINTMENT TIME</button>
	{#if isFormVisible}
    <ScheduleForm on:close={toggleForm} />
  {/if}
	<div class="overflow-x-auto w-full">
		<ReminderTable />
	</div>
</div>
