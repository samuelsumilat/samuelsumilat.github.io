const copyBtns = document.querySelectorAll('.copybtn');
const copyTexts = document.querySelectorAll('.copytext');

copyBtns.forEach((copyBtn, index) => {
  copyBtn.addEventListener('click', async () => {
    if (!copyTexts[index]) {
      console.error('Elemen teks yang akan disalin tidak ditemukan.');
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyalin',
        text: 'Elemen teks tidak ditemukan.',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    const textToCopy = copyTexts[index].value || copyTexts[index].textContent || copyTexts[index].innerText;

    if (!textToCopy) {
      console.error('Tidak ada teks yang bisa disalin.');
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyalin',
        text: 'Tidak ada teks yang bisa disalin.',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback untuk browser yang tidak mendukung Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!success) {
          throw new Error('Gagal menyalin teks menggunakan fallback.');
        }
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Teks Berhasil Disalin',
        showConfirmButton: false,
        timer: 1000
      });
    } catch (err) {
      console.error('Tidak dapat menyalin teks: ', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menyalin',
        text: err.message || 'Terjadi kesalahan saat menyalin teks.', // Menampilkan pesan error yang lebih spesifik
        showConfirmButton: false,
        timer: 1000
      });
    }
  });
});