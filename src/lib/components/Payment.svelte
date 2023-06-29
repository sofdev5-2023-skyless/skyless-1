<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe, StripeCardElement, StripeError } from '@stripe/stripe-js';
	import { Elements } from 'svelte-stripe';
	import CardNumber from '$lib/components/pay/CardNumber.svelte';
	import CardExpiry from './pay/CardExpiry.svelte';
	import CardCvc from './pay/CardCvc.svelte';
	import axios from 'axios';
	import { createAppoinment, updateDoctorSchedule } from '$lib/ts/useReminderForm';
	import { appointment, masterKey } from '$lib/stores/store';
	import type { Reminder } from '$lib/types/reminder';
	import { goto } from '$app/navigation';
	import { loadPatient } from '$lib/ts/useLoadData';
	import { env } from '$env/dynamic/public';
	import toast from 'svelte-french-toast'

	let stripe: Stripe | null;
	let cardElement: StripeCardElement;
	let processing = false;
	let name: string;
	let appointmentForm: Reminder;
	let patientId: string;
	let message: string;
	let existError: boolean = false;

	$: existError;

	appointment.subscribe((value) => (appointmentForm = value));
	masterKey.subscribe((value) => (patientId = value));

	onMount(async () => {
		stripe = await loadStripe(env.PUBLIC_KEY_STRIPE);
	});

	async function createPaymentIntent() {
		const patient = await loadPatient($appointment.id_user);
		const { data, status } = await axios.post('/api/stripe/payment', {
			name: `${patient.firstName} ${patient.lastName}`
		});
		const { ok, clientSecret, message } = data;
		
		toast.promise(Promise.resolve(ok), {
			loading: 'Saving...',
			success:'Payment successful!',
			error: 'Could not pay',
	  	});

		if (ok) {
			console.log(message);
			return clientSecret;
		}
	}

	const submit = async () => {
		try {
			existError = false;
			if (processing) return;
			processing = true;

			const clientSecret = await createPaymentIntent();
			const result = await stripe?.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement
				}
			});
			if (result?.error) throw result.error;

			appointmentForm.id_transaction = result!.paymentIntent!.id;

			await createAppoinment(true, appointmentForm, appointmentForm);
			await updateDoctorSchedule($appointment.hour, true);
			console.log(result);
			goto(`/patient/${patientId}/reminder`);
		} catch (error) {
			existError = true;
			processing = false;
			let stripeError: StripeError = error as StripeError;
			message = stripeError.message ?? 'Error message';
		}
	};
</script>

<p class="mt-10 card-title">Payment details</p>
<div class="mt-5 container justify-center items-center" style="text-align: center;">
	{#if stripe}
		<Elements {stripe}>
			<form on:submit|preventDefault={submit}>
				<div
					class="mt-2 input input-bordered input-primary w-full max-w-xs"
					style="margin-left: 30%;"
				>
					<CardNumber bind:element={cardElement} classes={{ base: 'input' }} wrapperClass="mt-3" />
				</div>

				<div class="row">
					<div
						class="mt-2 input input-bordered input-primary w-full max-w-xs"
						style="margin-left: 30%;"
					>
						<CardExpiry classes={{ base: 'input' }} wrapperClass="mt-3" />
					</div>
					<div
						class="mt-2 input input-bordered input-primary w-full max-w-xs"
						style="margin-left: 30%;"
					>
						<CardCvc classes={{ base: 'input' }} wrapperClass="mt-3" />
					</div>
				</div>
				{#if existError}
					<p class="text-red-500">{message}</p>
				{/if}

				<button class="btn btn-primary mt-2">
					<span class:loading={processing} class:loading-xs={processing} />
					Pay Appointment
				</button>
			</form>
		</Elements>
	{/if}
</div>
