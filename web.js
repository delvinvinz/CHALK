const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    const url = req.url;
    console.log('URL yang diakses:', url);

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
            <html>
            <head>
                <title>Halaman Utama</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        text-align: center;
                        margin-top: 50px;
                        background-color: #f4f4f4;
                    }
                    h1 {
                        color: #333;
                    }
                    .btn {
                        display: inline-block;
                        padding: 12px 24px;
                        font-size: 16px;
                        font-weight: bold;
                        color: white;
                        background: linear-gradient(45deg, #ff6b6b, #ff8e53);
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: 0.3s ease;
                        text-decoration: none;
                    }
                    .btn:hover {
                        transform: scale(1.05);
                        background: linear-gradient(45deg, #ff8e53, #ff6b6b);
                    }
                </style>
            </head>
            <body>
                <h1>Halaman Utama</h1>
                <a href="/about" class="btn">Ke Halaman About</a>
            </body>
            </html>
        `);
        res.end();
    } else if (url === '/about') {
        fs.readFile('./about.html', (err, data) => {
            if (err) {
                serve404(res);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else {
        // Jika URL tidak sesuai dengan yang ada, tampilkan halaman 404
        serve404(res);
    }
}).listen(3000, () => {
    console.log('Server berjalan pada http://127.0.0.1:3000..');
});

function serve404(res) {
    fs.readFile('./404.html', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1>404 - Halaman tidak ditemukan</h1>');
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
}
