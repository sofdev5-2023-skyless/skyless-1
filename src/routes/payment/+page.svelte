<script>
	import {Toaster} from 'svelte-french-toast'
	import Payment from '$lib/components/Payment.svelte';
	import PaymentDescription from '$lib/components/PaymentDescription.svelte';
</script>

<div class="container mx-auto mb-72">
	<div class="grid-cols-2 mt-20 flex justify-center items-center">
		<div class="grid flex-grow place-items-center">
			<Payment />
		</div>
		<div class="grid flex-grow place-items-center">
			<PaymentDescription />
		</div>
	</div>
</div>
