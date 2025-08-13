import { API_ENDPOINTS } from "@/app/config/api";

export async function POST(request) {
  const body = await request.json();
  const backendResponse = await fetch(API_ENDPOINTS.branches.create, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': request.headers.get('cookie') || '' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await backendResponse.json();
  return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' }});
}


