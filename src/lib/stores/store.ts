import { Auth } from '$lib/ts/keycloak';
import type { Reminder } from '$lib/types/reminder';
import { writable, type Writable } from 'svelte/store';

export const masterKey = writable('key-default');
export const classAuth = writable();
export const masterToken = writable('token-default');
export const menuOpen = writable(false);
export const areYouDoctor = writable(false);
export const storeReminders = writable<Reminder[]>([]);
export const isSearch = writable(false);
export const isVisibleEditForm = writable(false);
export const appointment: Writable<Reminder> = writable({
	date: '',
	description: '',
	hour: 0,
	id_doctor: '',
	id_user: '',
	id_appointment: 0
});
