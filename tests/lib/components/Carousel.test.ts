import { render, screen } from '@testing-library/svelte';
import Carousel from '../../../src/lib/components/Carousel.svelte';

describe('Carousel', () => {
	it('should be present on the page', () => {
		const { getByTestId } = render(Carousel);
		const carousel = getByTestId('carousel');
		expect(carousel).toBeTruthy();
	});

	it('should render one image per slide', () => {
		render(Carousel);
		const images = screen.getAllByRole('img');
		expect(images.length).toBe(10);
	});

	it('should render navigational buttons', () => {
		render(Carousel);
		const prevButton = screen.getAllByRole('link', { name: /❮/ });
		const nextButton = screen.getAllByRole('link', { name: /❯/ });

		expect(prevButton.length).toBe(10);
		expect(nextButton.length).toBe(10);
	});
});
