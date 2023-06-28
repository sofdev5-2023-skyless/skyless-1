import type { Doctor } from '$lib/types/doctor';
import axios from 'axios';
import type { doctor_schedule } from '@prisma/client';
import { masterToken, masterKey } from '$lib/stores/store';
import type { Client } from '$lib/types/client';
import Registry from './registry';

export const loadSchedule = async (hour: number): Promise<doctor_schedule> => {
	const { data, status } = await axios(`/api/doctor_schedule/read?id=${hour}`);

	return data;
};

export const loadDoctor = async (idDoctor: string): Promise<Doctor> => {
	const { data, status } = await axios(`/api/doctors/read?id=${idDoctor}`);

	return data;
};

export const loadPatient = async (idPatient: string): Promise<Client> => {
	const user = Registry.auth?.getClient().tokenParsed;
	const id = localStorage.getItem('key');

	return {
		email: user?.email ?? 'example@gmail.com',
		firstName: user?.given_name ?? 'FirstName',
		lastName: user?.family_name ?? 'Lastname',
		id: id ?? 'key-default'
	};
};
