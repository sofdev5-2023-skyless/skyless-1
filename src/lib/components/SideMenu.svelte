<script>
	import ChatIcon from '../../icons/ChatIcon.svelte';
	import CalendarIcon from '../../icons/CalendarIcon.svelte';
	import { areYouDoctor, masterKey } from '$lib/stores/store';
</script>

<div class="drawer">
	<input id="my-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 h-full bg-base-200 text-base-content pt-20">
			<li class="disabled pb-2">
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					href="#"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<ChatIcon />
					<span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
					<span
						class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
						>3</span
					>
				</a>
			</li>
			<li class="pb-2">
				<a
					href={`/patient/${$masterKey}/reminder`}
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<CalendarIcon />
					<span class="flex-1 ml-3 whitespace-nowrap">Appointments</span>
				</a>
			</li>
			{#if !$areYouDoctor}
				<li>
					<label for="doctor" class="font-bold"
						><span class="btn btn-primary">Are you a doctor?</span></label
					>
				</li>
			{/if}
		</ul>
	</div>
</div>
