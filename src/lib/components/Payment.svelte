<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe, StripeCardElement } from '@stripe/stripe-js';
	import { Elements } from 'svelte-stripe';
  import CardNumber from '$lib/components/pay/CardNumber.svelte'
  import CardExpiry from './pay/CardExpiry.svelte';
  import CardCvc from './pay/CardCvc.svelte';
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
<p class="mt-10 card-title">Payment details</p>
<div class="mt-5">
	<input
		type="text"
		class="input input-bordered input-primary w-full max-w-xs"
		bind:value={name}
		placeholder="Name"
	/>
	{#if stripe}
  <Elements {stripe}>
    <form on:submit|preventDefault={submit}>
    <div class="mt-2 input input-bordered input-primary w-full max-w-xs">
      <CardNumber bind:element={cardElement} classes={{ base: 'input' }} wrapperClass="mt-3"/>
    </div>
    <!--<div class="input StripeElement--empty"><div class="__PrivateStripeElement" style="margin: 0px !important; padding: 0px !important; border: none !important; display: block !important; background: transparent !important; position: relative !important; opacity: 1 !important;"><iframe name="__privateStripeFrame3248" frameborder="0" allowtransparency="true" scrolling="no" role="presentation" allow="payment *" src="https://js.stripe.com/v3/elements-inner-card-a97ff42d59ac022858eaa0c391aa1ce8.html#locale=auto&amp;wait=false&amp;mids[guid]=NA&amp;mids[muid]=8c2fd968-5ddc-48aa-80a2-fc604360a02ae21dc3&amp;mids[sid]=d102c688-3186-4105-b18d-f97420847a5b04b4fa&amp;showIcon=true&amp;iconStyle=default&amp;placeholder=Card+number&amp;disabled=false&amp;rtl=false&amp;componentName=cardNumber&amp;keyMode=test&amp;apiKey=pk_test_51L0t1EHfKEQGgXe5hXbsYpwnEJ4stYZRN6r8gyd6eftJTdLD575EEKFE1uLF0suchc1J26nCU6xyQtepi1dvtc3Q00qsgQsZbN&amp;referrer=https%3A%2F%2Fwww.sveltestripe.com%2Fexamples%2Fcredit-card&amp;controllerId=__privateStripeController3241" title="Cuadro de entrada seguro del número de tarjeta" style="border: none !important; margin: 0px !important; padding: 0px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important; transform: translate(0px) !important; color-scheme: light only !important; height: 16.8px;" data-ruffle-polyfilled=""></iframe><input class="__PrivateStripeElement-input" aria-hidden="true" aria-label=" " autocomplete="false" maxlength="1" style="border: none !important; display: block !important; position: absolute !important; height: 1px !important; top: -1px !important; left: 0px !important; padding: 0px !important; margin: 0px !important; width: 100% !important; opacity: 0 !important; background: transparent !important; pointer-events: none !important; font-size: 16px !important;"></div></div>-->
    <div class="row">
      <div class="mt-2 input input-bordered input-primary w-full max-w-xs"  >
        <CardExpiry classes={{ base: 'input' }} wrapperClass="mt-3" />
      </div>
      <div class="mt-2 input input-bordered input-primary w-full max-w-xs" >
        <CardCvc classes={{ base: 'input' }} wrapperClass="mt-3"/>
      </div>
    </div>

				<button class="btn btn-primary mt-2">Pay</button>
			</form>
		</Elements>
	{/if}
</div>

<div class="container" style="">
  
</div>
