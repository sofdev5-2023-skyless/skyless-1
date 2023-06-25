import type { Doctor } from '$lib/types/doctor';
import axios from 'axios';
import type { doctor_schedule } from '@prisma/client';
import { masterToken } from '$lib/stores/store';
import type { Client } from '$lib/types/client';

export const loadSchedule = async (hour: number): Promise<doctor_schedule> => {
	const { data, status } = await axios(`/api/doctor_schedule/read?id=${hour}`);

	return data;
};

export const loadDoctor = async (idDoctor: string): Promise<Doctor> => {
	const { data, status } = await axios(`/api/doctors/read?id=${idDoctor}`);

	return data;
};

export const loadPatient = async (idPatient: string): Promise<Client> => {
	let token = localStorage.getItem('token') ?? 'key-default';

	const { data, status } = await axios(`/api/patients/read?id=${idPatient}&token=${token}`);
	return data;
};
