document.getElementById("guestForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil nilai dari formulir
    var formData = new FormData(this);

    // Kirim data ke REST API
    fetch('https://script.google.com/macros/s/AKfycbwNPmG4eV4WTPXopS5zZjtE5kP2EBw0dakQhv27QlgWl5dGOixP6kLX4wD91I6dsQZ04A/exec', {
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
