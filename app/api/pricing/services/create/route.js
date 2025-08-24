import { API_ENDPOINTS } from '@/app/config/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const backendResponse = await fetch(API_ENDPOINTS.pricing.services.create, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    });
    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'خطا در ذخیره سرویس', data: null }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


