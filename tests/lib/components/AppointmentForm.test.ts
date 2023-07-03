import { render, fireEvent, screen } from '@testing-library/svelte';

import ApointmentForm from '../../../src/lib/components/AppointmentForm.svelte';

describe('ApointmentForm', () => {
	it('should render the component <ApointmentForm /> title', async () => {
		render(ApointmentForm);
		expect(screen.getByText('Schedule an appointment')).toBeDefined();
	});

	it('should render the component <ApointmentForm /> date', async () => {
		render(ApointmentForm);
		expect(screen.getByText('Fecha:')).toBeDefined();
	});

	it('should render the component <ApointmentForm /> hour', async () => {
		render(ApointmentForm);
		expect(screen.getByText('Hora:')).toBeDefined();
	});

	it('should render the component <ApointmentForm /> description', async () => {
		render(ApointmentForm);
		expect(screen.getByText('Descripción:')).toBeDefined();
	});

	it('should render the component <ApointmentForm /> button', async () => {
		render(ApointmentForm);
		expect(screen.getByText('Schedule')).toBeDefined();
	});
});
