// Importing necessary built-in modules (no need for node-fetch in v18+)
const http = require('http');

const server = http.createServer(async (req, res) => {
  try {
    const response = await handleRequest(req);
    
    // Write the headers and status code of the response
    res.writeHead(response.status, Object.fromEntries(response.headers));
    
    // Pipe the response body to the client
    response.body.pipe(res);
  } catch (err) {
    console.error('Error:', err);
    
    // Handle errors by sending a 500 response
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

async function handleRequest(request) {
  // Get the original URL requested
  const originalUrl = new URL(request.url, `http://${request.headers.host}`);

  // Modify the hostname
  originalUrl.hostname = "play1nm.hnyongshun.cn";

  // Set headers, including Referer
  const headers = new Headers(request.headers);
  headers.set("Referer", "https://idv.letv8.cc/");

  // Prepare the fetch options, including the body if method is not GET
  const fetchOptions = {
    method: request.method,
    headers: headers,
    body: request.method !== "GET" && request.body ? request.body : null
  };

  // Perform the fetch request with the modified URL and options
  return fetch(originalUrl.toString(), fetchOptions);
}

// Start the server on the defined port (default to 8080)
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
