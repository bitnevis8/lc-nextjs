import { API_ENDPOINTS } from "@/app/config/api";

export async function DELETE(request, { params }) {
  const backendResponse = await fetch(API_ENDPOINTS.branches.delete(params.id), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Cookie': request.headers.get('cookie') || '' },
    credentials: 'include',
  });
  const data = await backendResponse.json();
  return new Response(JSON.stringify(data), { status: backendResponse.status, headers: { 'Content-Type': 'application/json' }});
}


