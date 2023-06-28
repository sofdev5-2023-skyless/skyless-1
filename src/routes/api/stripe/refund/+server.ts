import { json } from '@sveltejs/kit';
import type { RequestHandler, RequestEvent } from '../../login/$types';
import Stripe from 'stripe';

const key =
'sk_test_51NMtdHIqt903VK65FXYQmEuVFAQfAwmS5c8fajrCIgbcWP1tIjyhodo2gXVTalDjyPhWMxk2zgR61ikQJG40SrqV00uoDxU814';

const stripe = new Stripe(key, {
    apiVersion: '2022-11-15'
});

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
    const { payment_intent } = await request.json();

    const refund = await stripe.refunds.create({
        payment_intent: payment_intent
    });

    console.log(refund);

    return json(refund);
};