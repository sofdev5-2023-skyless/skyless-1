import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const idDoctor = url.searchParams.get('key') ?? 0;
	if (idDoctor == 0) {
		return json([]);
	}

	const results = await prisma.appointment_form.findMany({
		where: {
			id_doctor: idDoctor
		}
	});

	await prisma.$disconnect();
	return json(results);
};
