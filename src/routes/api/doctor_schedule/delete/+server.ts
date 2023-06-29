import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import { prisma } from '$lib/database/prisma';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { id }: { id: number } = await request.json();
	const result = await prisma.doctor_schedule.delete({
		where: {
			id: id
		}
	});

	await prisma.$disconnect();
	if (id === result.id) {
		return json({ ok: 200 });
	}
	return json({ ok: 400 });
};
