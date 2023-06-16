import { json } from '@sveltejs/kit';
import { prisma } from '$lib/database/prisma';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const result = await prisma.doctor_schedule.findMany();

	await prisma.$disconnect();
	if (result != null) {
		return json(result);
	}
	return json({ ok: 400 });
};
