import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../doctors/$types';
import { prisma } from '$lib/database/prisma';
import parseSpecialities from '$lib/ts/parseSpecialities';

export const GET: RequestHandler = async ({}: RequestEvent) => {
	const specialities = await prisma.speciality.findMany();

	await prisma.$disconnect();
	const results = specialities.map(parseSpecialities);
	return json(results);
};
