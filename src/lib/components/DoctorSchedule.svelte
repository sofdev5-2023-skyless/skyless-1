<script>
	const schedules = [
		{ id: 1, schedule: '06:00 - 07:00', occupied: false },
		{ id: 2, schedule: '07:00 - 08:00', occupied: false },
		{ id: 3, schedule: '08:00 - 09:00', occupied: false },
		{ id: 4, schedule: '09:00 - 10:00', occupied: false },
		{ id: 5, schedule: '11:00 - 12:00', occupied: false },
		{ id: 6, schedule: '12:00 - 13:00', occupied: false },
		{ id: 7, schedule: '13:00 - 14:00', occupied: false },
		{ id: 8, schedule: '14:00 - 15:00', occupied: false },
		{ id: 9, schedule: '15:00 - 16:00', occupied: false },
		{ id: 10, schedule: '16:00 - 17:00', occupied: false },
		{ id: 11, schedule: '17:00 - 18:00', occupied: false },
		{ id: 12, schedule: '18:00 - 19:00', occupied: false },
		{ id: 13, schedule: '19:00 - 20:00', occupied: false },
		{ id: 14, schedule: '20:00 - 21:00', occupied: false }
	];
</script>

<div class="items-center justify-center">
	<label for="schedule">Add an schedule available</label>
	<select id="schedule" class="select select-primary w-full max-w-xs">
		<option disabled selected>Select an available for you</option>
		{#each schedules as { id, schedule } (id)}
			<option value={id}>{schedule}</option>
		{/each}
	</select>
</div>
