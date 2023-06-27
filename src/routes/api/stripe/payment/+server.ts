import { json, error } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from '../../login/$types';
import Stripe from 'stripe';

const key =
	'sk_test_51NMtdHIqt903VK65FXYQmEuVFAQfAwmS5c8fajrCIgbcWP1tIjyhodo2gXVTalDjyPhWMxk2zgR61ikQJG40SrqV00uoDxU814';
const stripe = new Stripe(key, {
	apiVersion: '2022-11-15'
});

const createPayment = async (name: string, amount: number = 50) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'usd',
			payment_method_types: ['card'],
			
		});
		return { clientSecret: paymentIntent.client_secret, ok: true };
	} catch (error) {
		return { clientSecret: '', ok: false };
	}
};

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const { name } = await request.json();
	console.log('🚀 ~ file: +server.ts:27 ~ constPOST:RequestHandler= ~ name:', name);
	const result = await createPayment(name);
	return json(result);
};
