<script>
	export let isError = false;
	export let description = '';
</script>

{#if isError}
	<label for="description" class="label">
		<span class="label-text-alt text-red-500">{description}</span>
	</label>
{/if}
