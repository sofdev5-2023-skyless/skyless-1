<script lang="ts">
	import { appointmentSchema } from '$lib/schemas/appointmentSchema';
	import { updateReminders } from '$lib/ts/useUpdateReminder';
	import { loadSchedule } from '$lib/ts/useLoadData';
	import type { Reminder } from '$lib/types/reminder';
	import { ZodError } from 'zod';
	import { editAppointment, updateDoctorSchedule } from '$lib/ts/useReminderForm';
	import { parseDate } from '$lib/ts/parseDate';
	import type { doctor_schedule } from '@prisma/client';
	import ErrorZod from './ErrorZod.svelte';
	import { goto } from '$app/navigation';
	import { appointment, isVisibleEditForm } from '$lib/stores/store';
	import axios from 'axios';
	import { onMount } from 'svelte';

	export let id = '';
	let isBadDescription: boolean = false;
	let messageDescription: string = '';
	let isBadHour = false;
	let messageHour = '';
	export let isVisible: boolean = false;
	export let isEdit: boolean = false;

	const currenDay = parseDate(new Date());

	$: isBadDescription;
	$: isVisible;
	$: isBadHour;
	$: messageHour;

	export let appointmentForm: Reminder = {
		date: '',
		hour: 0,
		description: '',
		id_doctor: '',
		id_user: ''
	};

	const a = loadSchedule(appointmentForm.hour);

	const handleSubmit = async () => {
		try {
			isBadDescription = false;
			isBadHour = false;
			if (isEdit) {
				appointmentForm.id_appointment = parseInt(id);
				const appointment: Reminder = appointmentSchema.parse(appointmentForm);
				isVisible = await editAppointment(isVisible, appointment, appointmentForm);
				isVisibleEditForm.set(false);
				await updateReminders(appointment.id_user);
				await updateDoctorSchedule(appointment.hour);
			} else {
				appointmentForm.id_doctor = id;
				appointmentForm.id_user = localStorage.getItem('key') ?? '';
				const appointmentParsed: Reminder = appointmentSchema.parse(appointmentForm);
				appointment.set(appointmentParsed);
				goto('/payment');
				isVisible = false;
			}
		} catch (error) {
			if (error instanceof ZodError) {
				error.issues.forEach((err) => {
					if (err.path[0] === 'description') {
						isBadDescription = true;
						messageDescription = err.message;
					} else if (err.path[0] === 'hour') {
						isBadHour = true;
						messageHour = err.message;
					}
				});
			}
		}
	};

	const loadSchedules = async () => {
		const { data } = await axios(
			`/api/doctor_schedule/read-doctor?id=${isEdit ? appointmentForm.id_doctor : id}`
		);
		const schedules: doctor_schedule[] = await data;
		return schedules;
	};

	const handleEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			isVisible = false;
		}
	};

	onMount(() => {
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	});
</script>

<input type="checkbox" id={`my-modal-${id}`} class="modal-toggle" bind:checked={isVisible} />

<div class="modal z-50">
	<div class="modal-box relative">
		<label for={`my-modal-${id}`} class="btn btn-primary btn-circle absolute right-2 top-2">✕</label
		>
		<form on:submit|preventDefault={handleSubmit} method="post">
			<h1 class="title">Book Medical Appointment</h1>
			<div class="form-control">
				<label class="label" for="date">Fecha:</label>
				<input
					class="input"
					type="date"
					name="date"
					min={currenDay}
					required
					bind:value={appointmentForm.date}
				/>
			</div>
			<select class="select select-bordered w-full max-w-xs" bind:value={appointmentForm.hour}>
				{#await loadSchedules()}
					<option selected value="">Loading...</option>
				{:then schedules}
					<option disabled selected value={0}>Select a schedule available</option>
					{#each schedules as schedule (schedule.id)}
						{#if !schedule.occupied}
							{#if schedule.id === appointmentForm.hour}
								<option selected value={schedule.id}>{schedule.schedule}</option>
							{/if}
							<option value={schedule.id}>{schedule.schedule}</option>
						{/if}
					{/each}
				{:catch error}
					<p>{error}</p>
				{/await}
			</select>
			<ErrorZod isError={isBadHour} description={messageHour} />
			<div class="form-control">
				<label for="description" class="label">Descripción:</label>
				<textarea
					class="textarea"
					class:textarea-error={isBadDescription}
					name="description"
					rows="4"
					bind:value={appointmentForm.description}
				/>
				<ErrorZod isError={isBadDescription} description={messageDescription} />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-primary right-2 top-2">
					{#if isEdit}
						Edit
					{:else}
						Schedule
					{/if}
				</button>
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
	input[type='date'],
	input[type='time'] {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
		background-color: #fff;
		color: #000;
	}
	input[type='date']::-webkit-calendar-picker-indicator,
	input[type='time']::-webkit-calendar-picker-indicator {
		background-color: #79ccd1;
		color: #fff;
		border: none;
		border-radius: 0.25rem;
		padding: 0.25rem;
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
