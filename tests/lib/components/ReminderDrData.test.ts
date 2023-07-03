import { fireEvent, render, screen } from '@testing-library/svelte';
import ReminderDrData from '$lib/components/ReminderComponentDrData.svelte';

describe('Test to prove API', () => {
	test('should return the mock for patient and doctor', async () => {
		render(ReminderDrData, {
			idDoctor: 'Test001'
		});

		expect(screen.findByText('Patient First')).toBeDefined();
		expect(screen.findByText('Doctor')).toBeDefined();
	});

	test('should click button to delete', async () => {
		render(ReminderDrData, { idDoctor: 'Test001', id_appointment: 5, hour: 1, idUser: 'Test002' });

		const button = screen.getByRole('button', { name: '' });

		await fireEvent.click(button);
		expect(
			screen.getByText(
				'¿Estás seguro de que quieres eliminar esta cita? La cita está programada para el 1/1/2000.'
			)
		).toBeDefined();
	});
});
