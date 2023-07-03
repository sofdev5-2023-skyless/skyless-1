import type { Doctor } from '$lib/types/doctor';
import type { Reminder } from '$lib/types/reminder';
import type { Client } from '$lib/types/client';
import type { doctor_schedule } from '@prisma/client';
import { rest } from 'msw';

const doctor: Doctor = {
	cellphone: '65323612',
	ci: '94834939',
	email: 'test@gmail.com',
	gender: 'male',
	lastName: 'Perez',
	name: 'Fulanito',
	speciality: 'Doctor',
	id: 'Test001'
};

const schedule: doctor_schedule = {
	id: 2,
	id_doctor: 'test001',
	occupied: false,
	schedule: 'Doctor Schedule'
};

const appointment: Reminder = {
	id_appointment: 5,
	date: '',
	hour: 2,
	description: 'test',
	id_doctor: 'Test001',
	id_user: 'Test002'
};

const patient: Client = {
	email: 'test1@gmail.com',
	firstName: "Patient",
	lastName: "First",
	username: "user",
	id: 'Test002'
};


const reminders: Reminder[] = [];

export const handlers = [
	rest.get('/api/hello', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ hello: 'world' }));
	}),

	rest.get('/api/doctors/read', (req, res, ctx) => {
		const id: number = Number(req.url.searchParams.get('id')) ?? 0;
		return res(ctx.status(200), ctx.json(doctor));
	}),

	rest.get('/api/doctor_schedule/read', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(schedule));
	}),

	rest.post('/api/appoinments/delete', async (req, res, ctx) => {
		const { id_appointment }: { id_appointment: number } = await req.json();
		if (id_appointment === 0) {
			return res(ctx.status(400));
		}
		return res(ctx.status(200), ctx.json({ ok: 200 }));
	}),

	rest.get('/api/appoinments/get-all', (req, res, ctx) => {
		const id = req.url.searchParams.get('key') ?? 0;
		if (id === 0) {
			return res(ctx.status(200), ctx.json([]));
		}
		return res(ctx.status(200), ctx.json(reminders));
	}),

	rest.post(`/api/doctor_schedule/edit-state`, async (req, res, ctx) => {
		const { id }: { id: number; occupied: number } = await req.json();
		if (id === 0) {
			return res(ctx.status(200), ctx.json({ ok: 400 }));
		}
		return res(ctx.status(200), ctx.json({ ok: 200 }));
	})
];
