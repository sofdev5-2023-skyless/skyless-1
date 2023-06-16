import { prisma } from '$lib/database/prisma';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { occupied, id } = await request.json();

	const result = await prisma.doctor_schedule.update({
		data: {
			occupied: occupied == 0 ? false : true
		},
		where: {
			id: id
		}
	});

	await prisma.$disconnect();
	if (result.id === id) {
		return json({ status: 200 });
	}
	return json({ status: 400 });
};
