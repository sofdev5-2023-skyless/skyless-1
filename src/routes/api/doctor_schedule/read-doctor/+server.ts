import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';
import type { doctor_schedule } from '@prisma/client';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const id = url.searchParams.get('id') ?? '0';

	const result = await prisma.doctor_schedule.findMany({
		where: { id_doctor: id },
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

	const resultParsed: doctor_schedule[] = result.map((elem) => ({
		id: elem.id,
		id_doctor: elem.id_doctor,
		occupied: elem.occupied,
		schedule: elem.schedule_doctor_schedule_scheduleToschedule.schedule
	}));

	await prisma.$disconnect();
	if (result != null) {
		return json(resultParsed);
	}
	return json({ ok: 400 });
};
