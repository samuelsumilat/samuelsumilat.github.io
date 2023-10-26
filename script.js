document.getElementById("attendance-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;

    fetch('https://sheetdb.io/api/v1/kdsonik1p4mdq', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, attendance }),
    })
    .then(response => response.json())
    .then(data => {
        // Tampilkan respons dari REST API di bawah formulir
        document.getElementById("response").innerText = `Data Terkirim: Nama - ${data.name}, Kehadiran - ${data.attendance}`;
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
});
