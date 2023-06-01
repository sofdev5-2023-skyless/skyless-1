import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import { prisma } from '$lib/database/prisma';
import parseDoctor from '$lib/ts/parseDoctor';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const id = url.searchParams.get('id') ?? '0';

	const doctors = await prisma.doctor.findMany({
		where: {
			speciality_id: id
		}
	});

	await prisma.$disconnect();
	const result = doctors.map((doctor) => parseDoctor(doctor));
	return json(result);
};
