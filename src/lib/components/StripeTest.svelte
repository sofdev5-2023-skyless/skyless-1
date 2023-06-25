<script lang="ts">
    import { onMount } from 'svelte';
    import { loadStripe } from '@stripe/stripe-js';
    import type { Stripe, StripeElementBase } from '@stripe/stripe-js';
    import { CardCvc, CardExpiry, CardNumber, Elements } from 'svelte-stripe';
	import axios from 'axios';
    // import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  let stripe: Stripe | null;
  let cardElement: StripeElementBase;
  let processing = false;

    const key =
        'pk_test_51NMtdHIqt903VK65kI0YLc3OnSSXuSCrnVeELEWq4pztokDmhiTPXqjCwNHLAErAxtTzUo7P5SlWVeRivJdrqBXq00HbPQCcBb';

    onMount(async () => {
        stripe = await loadStripe(key);
    });

  async function createPaymentIntent() {
        const response = await axios.post('/api/payment', {
            method: 'POST',
        });
        const { clientSecret, message } = response.data;
        console.log(message);
        return clientSecret;
    }

  const submit = () => {
    if (processing) return
    processing = true


  }
</script>

<div>
  
  {#if stripe }
  <Elements stripe={stripe}>
    <form on:submit|preventDefault={submit}>
            <CardNumber bind:element={cardElement} />
            <CardExpiry />
            <CardCvc />

            <button>Pay</button>
        </form>
  </Elements>
    
  {/if}

</div>

<body>
    <p>Hello World</p>
</body>