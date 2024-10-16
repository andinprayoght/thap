const http = require('http');

const server = http.createServer(async (req, res) => {
  try {
    const response = await handleRequest(req);

    // Read the response body
    const responseBody = await response.text();

    // Send response headers and body back to the client
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    res.end(responseBody);
  } catch (err) {
    console.error('Error:', err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

async function handleRequest(request) {
  const originalUrl = new URL(request.url, `http://${request.headers.host}`);
  
  // Modify the hostname but keep the path
  const newUrl = new URL(originalUrl.pathname, 'https://play1nm.hnyongshun.cn');

  const headers = new Headers(request.headers);
  headers.set("Referer", "https://idv.letv8.cc/");

  const fetchOptions = {
    method: request.method,
    headers: headers,
    body: request.method !== "GET" ? request.body : null
  };

  return fetch(newUrl.toString(), fetchOptions);
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
