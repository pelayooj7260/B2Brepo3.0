import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL environment variable is not set');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request.body,
        _metadata: {
          timestamp: new Date().toISOString(),
          ip: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
          userAgent: request.headers['user-agent'],
        },
      }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('n8n error:', errorText);
      return response.status(n8nResponse.status).json({ 
        error: 'Failed to forward to n8n',
        details: errorText 
      });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error('Proxy error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
