import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';
import { DateTime } from 'luxon';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { hour, description, date, id_doctor, id_user, id_appointment } = await request.json();

	const results = await prisma.appointment_form.update({
		where: {
			id_appointment: id_appointment
		},
		data: {
			date: new Date(date),
			description,
			hour: DateTime.fromFormat(hour, 'HH:mm').setZone('UTC', { keepLocalTime: true }).toString(),
			id_user,
			id_doctor
		}
	});
	if (results.id_appointment == id_appointment) {
		return json({ status: 200 });
	}
	return json({ status: 400 });
};
