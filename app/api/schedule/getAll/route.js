import { API_ENDPOINTS } from "@/app/config/api";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams.toString();
    const backendUrl = params ? `${API_ENDPOINTS.schedule.getAll}?${params}` : API_ENDPOINTS.schedule.getAll;

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), {
      status: backendResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error proxying schedule/getAll:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


