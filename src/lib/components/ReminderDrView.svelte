<script lang="ts">
	import { appointmentSchema } from '$lib/schemas/appointmentSchema';
	import { updateReminders } from '$lib/ts/useUpdateReminder';
	import type { Reminder } from '$lib/types/reminder';
	import { ZodError } from 'zod';
	import { editAppointment, createAppoinment } from '$lib/ts/useReminderForm';

	export let id = '';
	let isBadDescription: boolean = false;
	let messageDescription: string = '';
	export let isVisible: boolean = false;
	export let isEdit: boolean = false;

	$: isBadDescription;
	$: isVisible;

	export let appointmentForm: Reminder = {
		date: '',
		hour: '',
		description: '',
		id_doctor: '',
		id_user: '',
	};
</script>

<input type="checkbox" id={`my-modal-${id}`} class="modal-toggle" bind:checked={isVisible} />

<div class="modal">
	<div class="modal-box relative">
		<label for={`my-modal-${id}`} class="btn btn-primary btn-circle absolute right-2 top-2">✕</label
		>
		<form>
			<h1>{id}</h1>
			<h1 class="title">Assigned Medical Appointment</h1>
			<div class="form-control">
                <label class="label" for="name">ID-Paciente:{appointmentForm.id_user}</label>
                <label class="label" for="name">Nombre:"Here Goes Patient's Name"</label>
				<label class="label" for="date">Fecha:{appointmentForm.date}</label>
			</div>
			<div class="form-control">
				<label class="label" for="hour">Hora:</label>
				<label class="label" for="hour">{appointmentForm.hour}</label>
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
		background-color: #000000;
		color: rgb(254, 254, 254);
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
		border: 1px solid #000000;
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
		background-color: rgba(231, 231, 231, 0.54);
	}
	.textarea {
		resize: vertical;
		background-color: rgb(0, 0, 0);
	}
</style>
