<script lang="ts">
	import { browser } from '$app/environment';
	import DoctorScheduleForm from './DoctorScheduleForm.svelte';
	import DoctorScheduleList from './DoctorScheduleList.svelte';
	import { Toaster } from 'svelte-french-toast';

	let id_doctor = '';
	if (browser) {
		id_doctor = localStorage.getItem('key') ?? 'key-default';
	}
</script>

<Toaster />
<div class="container mx-auto text-center">
	<DoctorScheduleForm {id_doctor} />
	<DoctorScheduleList {id_doctor} />
</div>
