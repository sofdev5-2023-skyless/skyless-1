<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe, StripeCardElement } from '@stripe/stripe-js';
	import { CardCvc, CardExpiry, CardNumber, Elements } from 'svelte-stripe';
	import axios from 'axios';
	// import { PUBLIC_STRIPE_KEY } from '$env/static/public'
	let stripe: Stripe | null;
	let cardElement: StripeCardElement;
	let processing = false;
	let name: string;

	const key =
		'pk_test_51NMtdHIqt903VK65kI0YLc3OnSSXuSCrnVeELEWq4pztokDmhiTPXqjCwNHLAErAxtTzUo7P5SlWVeRivJdrqBXq00HbPQCcBb';

	onMount(async () => {
		stripe = await loadStripe(key);
	});

	async function createPaymentIntent() {
		const { data, status } = await axios.post('/api/stripe/payment', { name });
		const { ok, clientSecret, message } = data;
		if (ok) {
			console.log(message);
			return clientSecret;
		}
	}

	const submit = async () => {
		if (processing) return;
		processing = true;

		const clientSecret = await createPaymentIntent();
		const result = await stripe?.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement
			}
		});
	};
</script>

<div class="container">
	<input
		type="text"
		class="input input-bordered input-primary w-full max-w-xs"
		bind:value={name}
		placeholder="Name"
	/>
	{#if stripe}
		<Elements {stripe}>
			<form class="rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={submit}>
				<CardNumber classes={{ base: 'input' }} bind:element={cardElement} />
				<CardExpiry classes={{ base: 'input' }} />
				<CardCvc classes={{ base: 'input' }} />

				<button class="btn btn-primary">Pay</button>
			</form>
		</Elements>
	{/if}
</div>
