import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const idUser = url.searchParams.get('key') ?? 0;
	if (idUser == 0) {
		return json([]);
	}

	const results = await prisma.appointment_form.findMany({
		where: {
			id_user: idUser
		}
	});

	await prisma.$disconnect();
	return json(results);
};
