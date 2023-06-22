import type { Reminder } from '$lib/types/reminder';
import axios from 'axios';

const restartValues = (appointmentForm: Reminder) => {
	appointmentForm = {
		date: '',
		hour: 0,
		description: '',
		id_doctor: '',
		id_user: ''
	};

	return false;
};

export const createAppoinment = async (
	isVisible: boolean,
	appointment: Reminder,
	appointmentForm: Reminder
) => {
	const js = await fetch('/api/appoinments/create', {
		method: 'POST',
		body: JSON.stringify(appointment)
	});

	if (js.status == 200) {
		isVisible = restartValues(appointmentForm);
	}
	return isVisible;
};

export const editAppointment = async (
	isVisible: boolean,
	appointment: Reminder,
	appointmentForm: Reminder
) => {
	const js = await fetch('/api/appoinments/update', {
		method: 'POST',
		body: JSON.stringify(appointment)
	});

	if (js.status == 200) {
		isVisible = restartValues(appointmentForm);
	}
	return isVisible;
};

export const updateDoctorSchedule = async (idDoctorSchedule: number, occupied: boolean = false) => {
	const { data, status } = await axios.post(`/api/doctor_schedule/edit-state`, {
		id: idDoctorSchedule,
		occupied: occupied ? 1 : 0
	});

	if (data.ok === 200) {
		return true;
	}
	return false;
};
