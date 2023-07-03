<script lang="ts">
	import axios from 'axios';

	const fetchElem = async () => {
		const { data, status } = await axios('/api/hello');

		if (status == 200) {
			return data;
		}
	};

	const fetchElem2 = async () => {
		const resp = await fetch('/api/hello');
		const result = await resp.json();
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
