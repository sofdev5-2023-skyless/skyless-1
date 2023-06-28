import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';
import type { doctor_schedule } from '@prisma/client';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const id = Number(url.searchParams.get('id') ?? '0');

	const result = await prisma.doctor_schedule.findUnique({
		where: { id: id },
		select: {
			id: true,
			id_doctor: true,
			occupied: true,
			schedule_doctor_schedule_scheduleToschedule: {
				select: {
					schedule: true
				}
			}
		}
	});

	await prisma.$disconnect();
	if (result != null) {
		const resultParsed: doctor_schedule = {
			id: result?.id,
			id_doctor: result?.id_doctor,
			occupied: result?.occupied,
			schedule: result?.schedule_doctor_schedule_scheduleToschedule.schedule
		};
		return json(resultParsed);
	}
	return json({ ok: 400 });
};
