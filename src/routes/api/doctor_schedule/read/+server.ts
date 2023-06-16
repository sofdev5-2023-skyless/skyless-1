import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const id = Number(url.searchParams.get('id') ?? '0');

	const result = await prisma.doctor_schedule.findUnique({
		where: { id: id }
	});

	await prisma.$disconnect();
	if (result != null) {
		return json(result);
	}
	return json({ ok: 400 });
};
