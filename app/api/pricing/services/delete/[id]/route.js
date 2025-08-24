import { API_ENDPOINTS } from '@/app/config/api';

export async function DELETE(_request, { params }) {
  try {
    const id = params.id;
    const backendResponse = await fetch(API_ENDPOINTS.pricing.services.delete(id), {
      method: 'DELETE',
      cache: 'no-store'
    });
    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'خطا در حذف سرویس', data: null }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


