const http = require('http');

const server = http.createServer(async (req, res) => {
  try {
    // Buat URL baru dengan hostname dan path dari permintaan
    const targetUrl = new URL(req.url, 'https://play1nm.hnyongshun.cn');

    // Opsi untuk fetch
    const modifiedRequestOptions = {
      method: req.method,
      headers: {
        ...req.headers,
        'Referer': 'https://idv.letv8.cc/'
      }
    };

    // Lakukan permintaan ke URL yang dimodifikasi
    const fetchResponse = await fetch(targetUrl.toString(), modifiedRequestOptions);
    
    // Ambil status dan headers dari response
    const status = fetchResponse.status;
    const headers = fetchResponse.headers;

    // Ambil body response
    const responseBody = await fetchResponse.arrayBuffer();

    // Kirim kembali status, headers, dan body response
    res.writeHead(status, {
      ...Object.fromEntries(headers.entries()), // Mengubah headers menjadi objek
      'Content-Type': 'application/octet-stream' // Atau tipe lain yang sesuai
    });
    res.end(Buffer.from(responseBody));
  } catch (error) {
    console.error('Fetch error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

// Mendengarkan pada port yang ditentukan oleh Koyeb
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
