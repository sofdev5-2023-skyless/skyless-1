<script lang="ts">
	import type { doctor_schedule } from '@prisma/client';
	import type { Reminder } from '$lib/types/reminder';
	import axios from 'axios';

	export let id = '';
	let isBadDescription: boolean = false;
	let schduleLabel: string = '';
	export let isVisible: boolean = false;
	export let patientName: string;

	$: isBadDescription;
	$: isVisible;

	export let appointmentForm: Reminder = {
		date: '',
		hour: 0,
		description: '',
		id_doctor: '',
		id_user: ''
	};

	const loadSchedule = async (hour: number) => {
		const { data, status } = await axios(`/api/doctor_schedule/read?id=${hour}`);
		const result: doctor_schedule = data;
		schduleLabel = result.schedule;
		return result;
	};
</script>

<input type="checkbox" id={`my-modal-${id}`} class="modal-toggle" bind:checked={isVisible} />

<div class="modal">
	<div class="modal-box relative">
		<label for={`my-modal-${id}`} class="btn btn-primary btn-circle absolute right-2 top-2">✕</label
		>
		<form>
			<h1 class="title">Assigned Medical Appointment</h1>
			<div class="form-control">
				<label class="label" for="name">ID-Patient: {appointmentForm.id_user}</label>
				<label class="label" for="name">Name: {patientName}</label>
				<label class="label" for="date">Date: {appointmentForm.date}</label>
			</div>
			<div class="form-control">
				{#await loadSchedule(appointmentForm.hour)}
					Loading...
				{:catch error}
					<p>{error}</p>
				{/await}
				<label class="label" for="hour">Hour: {schduleLabel}</label>
			</div>
			<div class="form-control">
				<label for="description" class="label">Descripción:</label>
				<textarea
					class="textarea"
					class:textarea-error={isBadDescription}
					name="description"
					rows="4"
					bind:value={appointmentForm.description}
					readonly
				/>
			</div>
		</form>
	</div>
</div>

<style>
	form {
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		background-color: #ffffff;
		color: black;
		font-family: Arial, serif;
	}
	.form-control {
		margin-bottom: 1rem;
	}
	.label {
		display: block;
		font-weight: bold;
		margin-bottom: 0.5rem;
	}
	.title {
		display: block;
		font-weight: bold;
		font-size: 1.6rem;
		margin: auto;
		text-align: center;
	}

	.textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #cccccc;
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
		background-color: rgba(231, 231, 231, 0.54);
	}
	.textarea {
		resize: vertical;
		background-color: white;
	}
</style>
