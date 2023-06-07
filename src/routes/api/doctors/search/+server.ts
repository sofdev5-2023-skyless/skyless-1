import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import { prisma } from '$lib/database/prisma';
import parseDoctor from '$lib/ts/parseDoctor';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const name = url.searchParams.get('name') ?? '0';

	const doctors = await prisma.doctor.findMany({
		where: {
			name: {
				contains: name,
				mode: 'insensitive'
			}
		}
	});

	const result = doctors.map((doctor) => parseDoctor(doctor));

	await prisma.$disconnect();
	return json(result);
};
