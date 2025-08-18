import { API_ENDPOINTS } from '@/app/config/api';

export async function GET() {
  const backendResponse = await fetch(API_ENDPOINTS.pricing.categories.getAll, { next: { revalidate: 60 } });
  const data = await backendResponse.json();
  return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' } });
}


