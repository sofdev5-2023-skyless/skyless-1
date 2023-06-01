import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import type { Reminder } from '$lib/types/reminder';
import { prisma } from '$lib/database/prisma';
import { DateTime } from 'luxon';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { date, description, hour, id_doctor, id_user }: Reminder = await request.json();

	const results = await prisma.appointment_form.create({
		data: {
			date: new Date(date),
			hour: DateTime.fromFormat(hour, 'HH:mm').setZone('UTC', { keepLocalTime: true }).toString(),
			description,
			id_doctor,
			id_user
		}
	});

	await prisma.$disconnect()
	if (results.id_user === id_user) {
		return json({ status: 200 });
	}
	return json({ status: 400 });
};
