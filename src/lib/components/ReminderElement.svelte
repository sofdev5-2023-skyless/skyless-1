<script lang="ts">
	import ReminderForm from './ReminderForm.svelte';
	import { updateReminders } from '$lib/ts/useUpdateReminder';
	import avatar from '$lib/images/default.png';
	import type { doctor_schedule } from '@prisma/client';
	import { updateDoctorSchedule } from '$lib/ts/useReminderForm';
	import type { Doctor } from '$lib/types/doctor';
	import axios from 'axios';

	let isDone: boolean = false;
	export let idDoctor: string = '0';
	export let idUser: string = '0';
	export let date: string = '01-01-00';
	export let hour: number = 0;
	export let description: string = 'Default';
	export let id_appointment: number = 0;

	let formatedDate: string = new Date(date).toISOString().split('T')[0];

	let isVisibleForm: boolean;
	let isConfirmationModalVisible = false;

	async function deleteAppointment(idAppointment: number) {
		const { data, status } = await axios.post('/api/appoinments/delete', {
			id_appointment: idAppointment
		});

		await updateReminders(idUser);
		await updateDoctorSchedule(hour);

		return data;
	}

	function handleShowForm() {
		console.log('click');
		isVisibleForm = !isVisibleForm;
	}

	const loadSchedule = async (hour: number): Promise<doctor_schedule> => {
		const { data, status } = await axios(`/api/doctor_schedule/read?id=${hour}`);

		return data;
	};

	const loadDoctor = async (): Promise<Doctor> => {
		const { data, status } = await axios(`/api/doctors/read?id=${idDoctor}`);

		return data;
	};

	$: {
		formatedDate = new Date(date).toISOString().split('T')[0];
	}
</script>

<tr class="hover" class:line-through={isDone}>
	<th>
		<label>
			<input type="checkbox" class="checkbox" bind:checked={isDone} />
		</label>
	</th>
	<td>
		<div class="flex items-center space-x-3">
			<div class="avatar">
				<div class="mask mask-squircle w-12 h-12">
					<img src={avatar} alt="Avatar Tailwind CSS Component" />
				</div>
			</div>
			<div>
				{#await loadDoctor()}
					<div class="font-bold">Dr. Name Lastname</div>
					<div class="text-sm opacity-50">Speciality</div>
				{:then { name, lastName, speciality }}
					<div class="font-bold">Dr. {name} {lastName}</div>
					<div class="text-sm opacity-50">{speciality}</div>
				{:catch error}
					<p>{error}</p>
				{/await}
			</div>
		</div>
	</td>
	<td>
		{#await loadSchedule(hour)}
			Loading...
		{:then data}
			{data.schedule}
		{:catch error}
			<p>{error}</p>
		{/await}
		<br />
		<span class="badge badge-ghost badge-sm">{new Date(date).toISOString().split('T')[0]}</span>
	</td>
	<td>{description}</td>
	<th>
		<button class="btn btn-primary" on:click={handleShowForm}>Edit</button>
		<button class="delete-btn" on:click={() => (isConfirmationModalVisible = true)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-trash"
				width="19"
				height="19"
				viewBox="0 0 24 24"
				stroke-width="5.5"
				stroke="#2c3e50"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" />
				<line x1="4" y1="7" x2="20" y2="7" />
				<line x1="10" y1="11" x2="10" y2="17" />
				<line x1="14" y1="11" x2="14" y2="17" />
				<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
				<path d="M9 4h6" />
			</svg>
		</button>
	</th>
	{#if isVisibleForm}
		<ReminderForm
			isEdit={true}
			id={id_appointment + ''}
			isVisible={isVisibleForm}
			appointmentForm={{
				date: formatedDate,
				hour: hour,
				description: description,
				id_doctor: idDoctor,
				id_user: idUser
			}}
		/>
	{/if}
	{#if isConfirmationModalVisible}
		<div
			class="fixed z-10 inset-0 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
				/>
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
					>&#8203;</span
				>
				<div
					class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
				>
					<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
									Confirmar eliminación
								</h3>
								<div class="mt-2">
									<p class="text-sm text-gray-500">
										¿Estás seguro de que quieres eliminar esta cita?
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							class="btn btn-primary"
							style="margin-left: 3%;"
							on:click={() => {
								deleteAppointment(id_appointment);
								isConfirmationModalVisible = false;
							}}
						>
							Confirmar
						</button>
						<button
							type="button"
							class="btn btn-primary"
							on:click={() => {
								isConfirmationModalVisible = false;
							}}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</tr>

<style>
	.delete-btn {
		background-color: #e74c3c;
		position: relative;
		top: 4px;
		color: white;
		border: none;
		border-radius: 5px;
		padding: 15px 20px;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
		transition: background-color 0.3s ease;
	}

	.delete-btn:hover {
		background-color: #c0392b;
	}
</style>
