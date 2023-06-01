import { prisma } from '$lib/database/prisma';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { id_appointment } = await request.json();

	const result = await prisma.appointment_form.delete({
		where: {
			id_appointment: id_appointment
		}
	});

	await prisma.$disconnect();
	if (result.id_appointment === id_appointment) {
		return json({ status: 200 });
	}
	return json({ status: 400 });
};
