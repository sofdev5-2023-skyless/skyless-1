<script>
	const fetchElem = async () => {
		const { json } = await fetch('/api/test');
		const result = await json();
		return result;
	};
</script>

{#await fetchElem()}
	...Loading
{:then data}
	{JSON.stringify(data)}
{:catch error}
	{error}
{/await}
