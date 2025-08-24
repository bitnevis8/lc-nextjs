import { API_ENDPOINTS } from '@/app/config/api';

export async function PUT(_request, { params }) {
  try {
    const id = params.id;
    const body = await _request.json();
    const backendResponse = await fetch(API_ENDPOINTS.pricing.services.update(id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    });
    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'خطا در بروزرسانی سرویس', data: null }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


