import { json } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from '../../login/$types';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.PRIVATE_KEY_STRIPE, {
	apiVersion: '2022-11-15'
});

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { payment_intent } = await request.json();

	const refund = await stripe.refunds.create({
		payment_intent: payment_intent
	});

	return json(refund);
};
