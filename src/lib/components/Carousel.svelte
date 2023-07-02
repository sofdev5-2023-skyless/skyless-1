<script>
	import { images } from '$lib/utility/carouselData';
</script>

<div class="carousel">
	{#each images as { id, imgurl, name } (id)}
		<div id={`slide${id}`} class="carousel-item relative w-full">
			<img src={imgurl} class="w-full" alt={name} />
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href={`#slide${id <= 1 ? 9 : id - 1}`} class="btn btn-circle">❮</a>
				<a href={`#slide${id >= 9 ? 1 : id + 1}`} class="btn btn-circle">❯</a>
			</div>
		</div>
	{/each}
</div>
