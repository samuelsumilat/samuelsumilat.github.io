function sendData() {
  event.preventDefault();
  
  const namaAnak = document.getElementById('nama-anak').value;
  const nikAnak = document.getElementById('nik-anak').value;
  const tanggalLahir = document.getElementById('tanggal-lahir').value;
  const namaOrtu = document.getElementById('nama-ortu').value;
  const alamat = document.getElementById('alamat').value;
  const nomorTelepon = document.getElementById('nomor-telepon').value;
  const alamatEmail = document.getElementById('alamat-email').value;
  const tanggalPendaftaran = document.getElementById('tanggal-pendaftaran').value;
  
  const url = 'https://api.telegram.org/bot6138981785:AAESSPHWWeAY17xbByfJhIKUF1sfeQfZHSE/sendMessage';
  const chatId = '-883808071';
  const message = `Pendaftaran Peserta Didik Baru\nNama Anak: ${namaAnak}\nNIK Anak: ${nikAnak}\nTanggal Lahir: ${tanggalLahir}\nNama Orang Tua: ${namaOrtu}\nAlamat: ${alamat}\nNomor Telepon: ${nomorTelepon}\nAlamat Email: ${alamatEmail}\nTanggal Pendaftaran: ${tanggalPendaftaran}`;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({chat_id: chatId, text: message}));
  
  // membuat file PDF dari data form
  const doc = new jsPDF();
  doc.text(message, 10, 10);
  doc.save('Form Pendaftaran.pdf');
  
  alert('Data telah terkirim!');
}
