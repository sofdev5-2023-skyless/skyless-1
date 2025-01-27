import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id') ?? 0;
	const token = url.searchParams.get('token') ?? 0;

	const resp = await fetch(`http://0.0.0.0:8080/admin/realms/test/users/${id}/groups/count`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Bearer ${token}`
		}
	});

	const result = await resp.json();

	return json(result);
};
