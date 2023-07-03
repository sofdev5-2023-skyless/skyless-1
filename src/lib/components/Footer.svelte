<script>
	import FacebookIcon from '../../icons/FacebookIcon.svelte';
	import InstagramIcon from '../../icons/InstagramIcon.svelte';
	import PhoneIcon from '../../icons/PhoneIcon.svelte';
	import TwitterIcon from '../../icons/TwitterIcon.svelte';
	import WhatsappIcon from '../../icons/WhatsappIcon.svelte';
	import MessageIcon from '../../icons/MessageIcon.svelte';
	import MapIcon from '../../icons/MapIcon.svelte';
	import MedicalCheckLogo from '$lib/images/MedicalCheckLogo.png';
</script>

<footer class="footer p-10 bg-base-300 text-base-content mx-auto animate__animated animate__fadeIn">
	<div>
		<img src={MedicalCheckLogo} alt="logo footer" width="200px" />
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 pt-5"
			>© 2023 <a href="https://flowbite.com/" class="hover:underline">Skyless™</a>. All Rights
			Reserved.
		</span>
	</div>
	<div>
		<span class="footer-title">Contact us</span>
		<div class="sm:flex pb-2">
			<div class="pr-3"><WhatsappIcon /></div>
			<p class="link link-hover">(+591) 77889944</p>
		</div>
		<div class="sm:flex pb-2">
			<div class="pr-3"><PhoneIcon /></div>
			<p class="link link-hover">4-4535668</p>
		</div>
		<div class="sm:flex pb-2">
			<div class="pr-3"><MessageIcon /></div>
			<p class="link link-hover">medical.check@mc.bo</p>
		</div>
		<div class="sm:flex">
			<div class="pr-3"><MapIcon /></div>
			<p class="link link-hover">Av. America</p>
		</div>
	</div>
	<div>
		<span class="footer-title">Social</span>
		<div class="grid grid-flow-col gap-4">
			<!-- svelte-ignore a11y-missing-attribute -->
			<a> <InstagramIcon /> </a>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a> <FacebookIcon /> </a>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a> <TwitterIcon /> </a>
		</div>
	</div>
</footer>
