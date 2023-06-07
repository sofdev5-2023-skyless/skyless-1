import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from '../$types';
import { prisma } from '$lib/database/prisma';
import parseDoctor from '$lib/ts/parseDoctor';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { id, name, lastName, cellphone, speciality, email, ci, gender } = await request.json();

	const result = await prisma.doctor.update({
		where: {
			id: id
		},
		data: {
			name: `${name} ${lastName}`,
			last_name: lastName,
			first_name: name,
			cellphone,
			speciality,
			email,
			ci,
			gender,
			speciality_id: speciality
		}
	});
	const doctor = parseDoctor(result);

	await prisma.$disconnect();
	if (Object.keys(doctor).length > 0) {
		return json({ ok: 200 });
	}
	return json({ ok: 400 });
};
