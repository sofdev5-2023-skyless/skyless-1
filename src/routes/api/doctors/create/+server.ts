import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import type { Doctor } from '$lib/types/doctor';
import { prisma } from '$lib/database/prisma';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { id, name, lastName, cellphone, speciality, email, ci, gender }: Doctor =
		await request.json();

	const result = await prisma.doctor.create({
		data: {
			cellphone: cellphone,
			ci,
			email,
			first_name: name,
			gender,
			id: id!,
			last_name: lastName,
			name: `${name} ${lastName}`,
			speciality: speciality,
			speciality_id: speciality
		}
	});
	if (result.id == id) {
		return json({ ok: 200 });
	}

	await prisma.$disconnect();
	return json({ ok: 400 });
};
