<script>
	import AboutUs from '$lib/components/AboutUs.svelte';
	import aboutus from '$lib/images/about-us/about-us.png';
</script>

<h1 class="mt-40 flex justify-center items-center text-4xl font-bold mb-4">About Us</h1>
<div class="flex justify-center items-center place-items-center">
	<img class="w-[1000px]" src={aboutus} alt="about us" />
</div>
<div class=" flex justify-center items-center" style="text-align: center;">
	<AboutUs />
</div>
