import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import { prisma } from '$lib/database/prisma';
import type { doctor_schedule } from '@prisma/client';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { id_doctor, schedule }: doctor_schedule = await request.json();
	const result = await prisma.doctor_schedule.create({
		data: {
			id_doctor,
			occupied: false,
			schedule
		}
	});
	if (result.id_doctor == id_doctor) {
		return json({ ok: 200 });
	}
	return json({ ok: 400 });
};
