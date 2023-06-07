import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import { prisma } from '$lib/database/prisma';
import parseDoctor from '$lib/ts/parseDoctor';

export const GET: RequestHandler = async ({ url }: RequestEvent) => {
	const id = url.searchParams.get('id') ?? '0';

	const result = await prisma.doctor.findUnique({
		where: { id }
	});

	await prisma.$disconnect();
	if (result != null) {
		return json(parseDoctor(result));
	}
	return json({ ok: 400 });
};
