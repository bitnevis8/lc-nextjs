import { API_ENDPOINTS } from '@/app/config/api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const url = API_ENDPOINTS.pricing.devices.getAll(categoryId || undefined);
  const backendResponse = await fetch(url, { next: { revalidate: 60 } });
  const data = await backendResponse.json();
  return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
}


