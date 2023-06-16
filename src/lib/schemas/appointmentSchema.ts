import { z } from 'zod';

export const appointmentSchema = z.object({
	date: z.string().nonempty('The date is required'),
	hour: z
		.number()
		.positive()
		.refine((value) => value > 0, { message: 'A schedule is required' }),
	description: z.string().min(5, {
		message: 'A description is required'
	}),
	id_doctor: z.string().nonempty('El id_doctor es requerido.'),
	id_user: z.string().nonempty('El id_user es requerido.'),
	id_appointment: z.number().optional()
});
