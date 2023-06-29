<script lang="ts">
	import { browser } from '$app/environment';
	import Registry from '$lib/ts/registry';
	import DoctorScheduleForm from './DoctorScheduleForm.svelte';
	import DoctorScheduleList from './DoctorScheduleList.svelte';

	let id_doctor = '';
	if (browser) {
		id_doctor = localStorage.getItem('key') ?? 'key-default';
	}
</script>

<div class="container text-center">
	<DoctorScheduleForm {id_doctor} />
	<DoctorScheduleList {id_doctor} />
</div>
