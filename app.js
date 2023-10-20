const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Ganti port sesuai kebutuhan Anda

// Konfigurasi koneksi ke MySQL
const db = mysql.createConnection({
  host: 'qq0.h.filess.io',
  user: 'guestbook_curveoccur',
  password: 'c4c6e9e048d65f62a2d91c7f7f26bbc1359a481b',
  database: 'guestbook_curveoccur',
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke MySQL gagal: ' + err.message);
  } else {
    console.log('Koneksi ke MySQL berhasil');
  }
});

// Middleware untuk meng-handle data form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint untuk menangani data form
app.post('/submit', (req, res) => {
  const { nama, kehadiran, ucapan } = req.body;
  const sql = 'INSERT INTO data_undangan (nama, kehadiran, ucapan) VALUES (?, ?, ?)';
  db.query(sql, [nama, kehadiran, ucapan], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan data.' });
    } else {
      res.json({ success: 'Data berhasil disimpan ke database.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});