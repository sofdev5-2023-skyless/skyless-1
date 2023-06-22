import { storeReminders } from '$lib/stores/store';
import type { Reminder } from '$lib/types/reminder';
import axios, { AxiosError } from 'axios';

export const updateReminders = async (id_user: string): Promise<void> => {
	try {
		const { data, status } = await axios(`/api/appoinments/get-all?key=${id_user}`);

		const reminders: Reminder[] = data;
		storeReminders.set(reminders);
	} catch (error) {
		if (error instanceof AxiosError) {
		}
	}
};
