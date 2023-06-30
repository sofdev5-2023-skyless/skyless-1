<script>
	import ListIcon from '../../icons/ListIcon.svelte';
</script>

<div class="dropdown">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="btn btn-ghost lg:hidden">
		<ListIcon />
	</label>
	<ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
		<li>
			<a class="justify-between" href="/doctor-list"> View all doctors </a>
		</li>
		<li>
			<a href="/about" class="justify-between"> About us </a>
		</li>
	</ul>
</div>
