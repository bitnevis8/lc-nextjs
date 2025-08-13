import { API_ENDPOINTS } from "@/app/config/api";

export async function GET(request) {
  const backendResponse = await fetch(API_ENDPOINTS.branches.getAll, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Cookie': request.headers.get('cookie') || '' },
    credentials: 'include',
  });
  const data = await backendResponse.json();
  return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' }});
}


