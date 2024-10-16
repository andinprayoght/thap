// Main entry for Koyeb handler
const http = require("http");

const server = http.createServer(async (req, res) => {
  try {
    const response = await handleRequest(req);
    res.writeHead(response.status, response.headers);
    response.body.pipe(res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

async function handleRequest(request) {
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
  return fetch(modifiedRequest);
}

// Listen on the port defined by the Koyeb environment or default to 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
