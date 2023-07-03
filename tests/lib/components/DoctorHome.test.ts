import { render, fireEvent, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom/extend-expect';
import Carousel from '../../../src/lib/components/Carousel.svelte';

describe('Carousel', () => {
	it('should be present on the page', async () => {
		render(Carousel);
		const imgs = await screen.findAllByRole('img');
		expect(imgs.length).toBe(10);
	});
});
