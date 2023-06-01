import type { Doctor } from '$lib/types/doctor';
import type { doctor } from '@prisma/client';

const parseDoctor = ({
	cellphone,
	ci,
	email,
	first_name,
	gender,
	id,
	last_name,
	speciality
}: doctor) => {
	const doctor: Doctor = {
		cellphone,
		ci,
		email,
		gender,
		lastName: last_name,
		name: first_name,
		speciality,
		id
	};
	return doctor;
};

export default parseDoctor;
