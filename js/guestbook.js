document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("guestBookForm");
    var guestList = document.getElementById("guestList");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = document.getElementById("name").value;
        var message = document.getElementById("message").value;
        var attendance = document.getElementById("attendance").value;

        // Kirim data ke Google Apps Script untuk disimpan di spreadsheet
        google.script.run.addGuestEntry(name, message, attendance);

        // Perbarui daftar buku tamu
        updateGuestList();
    });

    function updateGuestList() {
        // Ambil data buku tamu dari Google Sheets
        google.script.run.withSuccessHandler(function (guestbookEntries) {
            guestList.innerHTML = "<h2>Daftar Buku Tamu</h2>" + guestbookEntries.join("<br>");
        }).getGuestEntries();
    }

    // Perbarui daftar buku tamu saat halaman dimuat
    updateGuestList();
});
