import type { Speciality } from '$lib/types/speciality';
import type { speciality } from '@prisma/client';

const parseSpecialities = ({ id, specialityname }: speciality): Speciality => ({
	id,
	name: specialityname
});

export default parseSpecialities;
