import { fireEvent, render, screen } from '@testing-library/svelte';
import ReminderDrView from '$lib/components/ReminderDrView.svelte';

describe('ReminderDrView', () => {
	it('should render the component <ReminderDrView /> title', async () => {
		render(ReminderDrView);
		expect(screen.getByText('Assigned Medical Appointment')).toBeDefined();
	});

	it('should render the component <ReminderDrView /> date', async () => {
		render(ReminderDrView);
		expect(screen.getByText('ID-Patient:')).toBeDefined();
	});

	it('should render the component <ReminderDrView /> description', async () => {
		render(ReminderDrView);
		expect(screen.getByText('Descripción:')).toBeDefined();
	});

	it('should render the component <ReminderDrView /> date', async () => {
		render(ReminderDrView);
		expect(screen.getByText('Date:')).toBeDefined();
	});

	it('should render the component <ReminderDrView /> hour', async () => {
		render(ReminderDrView);
		expect(screen.getByText('Hour:')).toBeDefined();
	});
});
