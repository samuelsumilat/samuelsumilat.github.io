document.getElementById("guestForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai dari formulir
    var formData = new FormData(this);

    // Kirim data ke REST API
    fetch('URL_API_ANDA', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Tambahkan logika penanganan respons dari API (misalnya, pesan sukses)
    })
    .catch(error => {
        // Tambahkan logika penanganan kesalahan
    });
});
