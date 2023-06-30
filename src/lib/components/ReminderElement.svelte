<script lang="ts">
	import ReminderForm from './ReminderForm.svelte';
	import { updateReminders } from '$lib/ts/useUpdateReminder';
	import avatar from '$lib/images/default.png';
	import { updateDoctorSchedule } from '$lib/ts/useReminderForm';
	import axios from 'axios';
	import { loadDoctor, loadSchedule } from '$lib/ts/useLoadData';
	import { isVisibleEditForm } from '$lib/stores/store';
	import toast from 'svelte-french-toast'
	import {Toaster} from 'svelte-french-toast'

	let isDone: boolean = false;
	export let idDoctor: string = '0';
	export let idUser: string = '0';
	export let date: string = '01-01-00';
	export let hour: number = 0;
	export let description: string = 'Default';
	export let id_appointment: number = 0;
	export let id_transaction: string = '';

	let formatedDate: string = new Date(date).toISOString().split('T')[0];
	let currentDate = new Date();
	let currentHour = currentDate.getHours();

	let isVisibleForm: boolean;
	let isConfirmationModalVisible = false;
	let isAlreadyStarted = false;
	let isNotEditable = false;

	async function deleteAppointment(idAppointment: number, idPayment: string) {
		const refund = await axios.post('/api/stripe/refund', {
			payment_intent: idPayment
		});

		console.log(refund);

		const { data, status } = await axios.post('/api/appoinments/delete', {
			id_appointment: idAppointment
		});
	
		await updateReminders(idUser);
		await updateDoctorSchedule(hour);
		return data;
	}

	function handleShowForm() {
		console.log('click');
		verifyIsAlreadyStarted();

		if(!isAlreadyStarted) {
			isVisibleEditForm.subscribe((value) => (isVisibleForm = value));
			isVisibleForm = !isVisibleForm;
			console.log(isVisibleForm);
		} else {
			isNotEditable = true;
		}
	}

	function verifyIsAlreadyStarted() {
		if (currentDate >= new Date(date) && currentHour + 1 >= hour) {
			isAlreadyStarted = true;
		} else {
			isAlreadyStarted = false;
		}
	}

	function completeAppointment() {
		isDone = !isDone
		if (isDone) {
			toast.success("Appointment completed!");	
		}
	}
			
	function cancelAppointment() {
		verifyIsAlreadyStarted();
		isConfirmationModalVisible = true;
	}

	$: {
		formatedDate = new Date(date).toISOString().split('T')[0];
	}
</script>

<tr class="hover" class:line-through={isDone}>
	<th>
		<label>
			<input type="checkbox" class="checkbox" bind:checked={isDone} on:click={completeAppointment} />
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
				{#await loadDoctor(idDoctor)}
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
		<button class="delete-btn" on:click={cancelAppointment}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-5"
				width="19"
				height="19"
				viewBox="0 0 24 24"
				stroke-width="5.5"
				stroke="#2c3e50"
				fill="none"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="5"
					d="M6 18L18 6M6 6l12 12"
				/>
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
				id_user: idUser,
				id_transaction
			}}
		/>
	{/if}
	{#if isConfirmationModalVisible || isNotEditable}
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
							{#if !isAlreadyStarted}
								<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
										Confirm cancellation
									</h3>
									<div class="mt-2">
										<p class="text-sm text-gray-500">
											Are you sure you want to cancel this appointment?
										</p>
									</div>
								</div>
							{:else}
								<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
										Already started
									</h3>
									<div class="mt-2">
										<p class="text-sm text-gray-500">
											The appointment cannot be canceled once started
										</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
					<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						{#if !isAlreadyStarted}
							<button
								type="button"
								class="btn btn-primary"
								style="margin-left: 3%;"
								on:click={() => {
									deleteAppointment(id_appointment, id_transaction);
									isConfirmationModalVisible = false;
								}}
							>
								Yes
							</button>
						{/if}
						<button
							type="button"
							class="btn btn-primary"
							on:click={() => {
								isConfirmationModalVisible = false;
								isNotEditable = false;
							}}
						>
							{#if !isAlreadyStarted}
								No
							{:else}
								Ok
							{/if}
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
		text-emphasis-color: wh;
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
