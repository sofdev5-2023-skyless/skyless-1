import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';
import type { Reminder } from '$lib/types/reminder';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { hour, description, date, id_doctor, id_user, id_appointment }: Reminder =
		await request.json();

	const results = await prisma.appointment_form.update({
		where: {
			id_appointment: id_appointment
		},
		data: {
			date: new Date(date),
			description,
			hour: hour,
			id_user,
			id_doctor
		}
	});

	await prisma.$disconnect();
	if (results.id_appointment == id_appointment) {
		return json({ status: 200 });
	}
	return json({ status: 400 });
};
