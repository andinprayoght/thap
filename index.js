addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    // URL asli yang ingin diakses
    let url = new URL(request.url);
    url.hostname = "play1nm.hnyongshun.cn";

    // Opsi fetch untuk menambahkan referer
    let modifiedRequest = new Request(url.toString(), {
      method: request.method,
      headers: {
        ...request.headers,
        "Referer": "https://idv.letv8.cc/"
      },
      body: request.method !== "GET" ? request.body : null
    });

    // Fetch ke URL yang telah dimodifikasi
    const response = await fetch(modifiedRequest);

    // Mengembalikan respons yang diterima dari fetch
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
