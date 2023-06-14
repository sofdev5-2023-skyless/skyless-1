import { z } from 'zod';

export const appointmentSchema = z.object({
	date: z.string().nonempty('The date is required'),
	hour: z.number().nonnegative('The hour is required'),
	description: z.string().min(5, {
		message: 'Description small'
	}),
	id_doctor: z.string().nonempty('El id_doctor es requerido.'),
	id_user: z.string().nonempty('El id_user es requerido.'),
	id_appointment: z.number().optional()
});
