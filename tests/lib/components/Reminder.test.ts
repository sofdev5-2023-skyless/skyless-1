import { fireEvent, render, screen } from '@testing-library/svelte';
import RemindereElement from '../../../src/lib/components/ReminderElement.svelte';

describe('Test to prove API', () => {
	test('should return default', async () => {
		render(RemindereElement);

		expect(await screen.getByText('Loading...')).toBeDefined();
		expect(await screen.getByText('Dr. Name Lastname')).toBeDefined();
	});

	test('should return the mock for doctor and schedule', async () => {
		render(RemindereElement, {
			idDoctor: 1,
			hour: 1
		});

		expect(await screen.findByText('Doctor Schedule')).toBeDefined();
		expect(await screen.findByText('Dr. Fulanito Perez')).toBeDefined();
	});

	test('should click button to delete', async () => {
		render(RemindereElement, { id_appointment: 2, hour: 1, idUser: 2 });

		const button = screen.getByRole('button', { name: '' });

		await fireEvent.click(button);
		expect(screen.getByText('¿Estás seguro de que quieres eliminar esta cita?')).toBeDefined();

		const buttonConfirm = screen.getByRole('button', { name: 'Confirmar' });
		await fireEvent.click(buttonConfirm);
	});
});
