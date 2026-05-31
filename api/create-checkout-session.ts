import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    firstName,
    lastName,
    email,
    company = '',
    businessSize,
    currentTools,
    painPoints,
    productType = 'Business Infrastructure Audit',
    selectedTier,
    source = 'audit_pricing'
  } = request.body;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return response.status(500).json({ error: 'Server configuration error: Stripe key is missing.' });
  }

  // Resolve Price ID based on tier selection
  let priceId = '';
  if (selectedTier === 'starter') {
    priceId = process.env.STRIPE_PRICE_STARTER || '';
  } else if (selectedTier === 'full') {
    priceId = process.env.STRIPE_PRICE_FULL || '';
  } else if (selectedTier === 'enterprise') {
    priceId = process.env.STRIPE_PRICE_ENTERPRISE || '';
  }

  if (!priceId) {
    console.error(`Price ID not configured for tier: ${selectedTier}`);
    return response.status(400).json({
      error: `Payment configurations are not complete for tier "${selectedTier}". Please set the environment variables in your dashboard.`
    });
  }

  // Determine Origin URL for Redirects dynamically
  const origin = request.headers.referer || request.headers.origin || 'https://b2-brepo3-0.vercel.app';

  try {
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16' as any
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      // Strip existing query params from referer and append payment state params
      success_url: `${origin.split('?')[0]}?page=success&tier=${selectedTier}&email=${encodeURIComponent(email)}`,
      cancel_url: `${origin.split('?')[0]}?page=apply&payment=cancel`,
      metadata: {
        name,
        firstName,
        lastName,
        email,
        company,
        businessSize,
        currentTools,
        painPoints,
        productType,
        selectedTier,
        source,
        submitted_at: new Date().toISOString()
      },
    });

    return response.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    return response.status(500).json({ error: 'Failed to initiate checkout session.', details: error.message });
  }
}
