import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Doctor } from '$lib/types/doctor';
import { prisma } from '$lib/database/prisma';
import parseDoctor from '$lib/ts/parseDoctor';

export const GET = async ({}: RequestHandler) => {
	const doctorsDB = await prisma.doctor.findMany();

	let doctors: Doctor[] = doctorsDB.map((doctor) => parseDoctor(doctor));

	await prisma.$disconnect();
	return json(doctors);
};
