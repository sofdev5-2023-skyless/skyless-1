import { render, screen } from '@testing-library/svelte';
import FetchTest from '../../../src/lib/components/FetchTest.svelte';

describe('first', () => {
	test('should first', async () => {
		render(FetchTest);
		expect(screen.getByText('...Loading')).toBeDefined();
		screen.debug();
		expect(await screen.findByText('{"hello":"world"}')).toBeDefined();
		await screen.debug();
	});
});
