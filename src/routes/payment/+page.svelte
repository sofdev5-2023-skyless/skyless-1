<script>
	//import PaymentDescription from '$lib/components/PaymentDescription.svelte';

	import Payment from '$lib/components/Payment.svelte';
	import PaymentDescription from '$lib/components/PaymentDescription.svelte';
</script>


<div class="mb-16 mt-20 flex w-full justify-center items-center">
	<div class="grid h-400 flex-grow place-items-center">
	  <Payment />
	</div>
	<div class="grid h-300 flex-grow place-items-center">
	  <PaymentDescription />
	</div>
  </div>
  
