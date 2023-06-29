import { json } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from '../doctors/$types';
import { prisma } from '$lib/database/prisma';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const schedules = await prisma.schedule.findMany();

	await prisma.$disconnect;
	return json(schedules);
};
