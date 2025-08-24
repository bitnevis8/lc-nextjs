import { API_ENDPOINTS } from '@/app/config/api';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('deviceId');
    const url = API_ENDPOINTS.pricing.services.getAll(deviceId || undefined);
    const backendResponse = await fetch(url, { cache: 'no-store' });
    const contentType = backendResponse.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await backendResponse.json() : { success: false, message: 'invalid response', data: null };
    return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'خطا در ارتباط با سرور', data: null }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}


