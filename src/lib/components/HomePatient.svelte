<script>
	import ArrowStick from '../../icons/ArrowStick.svelte';
	import medicinageneral from '$lib/images/especialidades/medicinageneral.png';
	import pediatria from '$lib/images/especialidades/pediatria.png';
	import odontologia from '$lib/images/especialidades/odontologia.png';
	import urologia from '$lib/images/especialidades/urologia.png';
	import obstetriciayginecologia from '$lib/images/especialidades/obstetriciayginecologia.png';
	import oftalmologia from '$lib/images/especialidades/oftalmologia.png';
	import traumatologia from '$lib/images/especialidades/traumatologia.png';
	import otorrinolaringologia from '$lib/images/especialidades/otorrinolaringologia.png';
	import cirugiaplastica from '$lib/images/especialidades/cirugiaplastica.png';
	import specialities from '$lib/data/specialities.json';

	import Carousel from './Carousel.svelte';

	const items = [
		medicinageneral,
		pediatria,
		odontologia,
		urologia,
		obstetriciayginecologia,
		oftalmologia,
		traumatologia,
		otorrinolaringologia,
		cirugiaplastica
	];
</script>

<div class="container mx-auto">
	<Carousel />
	<div
		class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-20 animate__animated animate__fadeIn"
	>
		{#each specialities as { Speciality, Description, Path }, index}
			<div
				aria-posinset={index + 1}
				aria-setsize={specialities.length}
				class="flex flex-col justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
				data-aos="fade-up"
			>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#">
					<img class="h-auto max-w-full rounded-lg" src={items[index]} alt={Path} />
				</a>
				<div class="p-5">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="#">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{Speciality}
						</h5>
					</a>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{Description}</p>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="#" class="btn btn-primary">
						See more
						<ArrowStick />
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
