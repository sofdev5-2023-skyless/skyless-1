import { render, fireEvent, screen } from '@testing-library/svelte';

import ReminderForm from '../../../src/lib/components/ReminderForm.svelte';

describe('ReminderForm', () => {
    it('should render the component <ReminderForm /> title', async () => {
        render(ReminderForm);
        expect(screen.getByText('Book Medical Appointment')).toBeDefined();
    });

    it('should render the component <ReminderForm /> date', async () => {
        render(ReminderForm);
        expect(screen.getByText('Fecha:')).toBeDefined();
    });

    it('should render the component <ReminderForm /> description', async () => {
        render(ReminderForm);
        expect(screen.getByText('Descripción:')).toBeDefined();
    });

    it('should render the component <ReminderForm /> button', async () => {
        render(ReminderForm);
        expect(screen.getByText('Schedule')).toBeDefined();
    });
});