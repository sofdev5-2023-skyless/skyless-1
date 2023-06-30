<script>
	import { onMount } from 'svelte';
	import Carousel from './Carousel.svelte';
	import { areYouDoctor, masterKey } from '$lib/stores/store';
	import ReminderTable from './DoctorReminderTable.svelte';
	import { goto } from '$app/navigation';
	import DoctorSchedule from './DoctorSchedule.svelte';
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

<div class="container mx-auto">
	<Carousel />

	<DoctorSchedule />
	<div class="p-1">
		<div class="">
			<ReminderTable />
		</div>
	</div>
</div>
