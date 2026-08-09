document.addEventListener("DOMContentLoaded", function () {
    const acara = `
        <div class="card-wrap">
            <div class="card left">
                <p class="icon-acara">a</p>
                <h4 class="nama-acara1"></h4>
                <p class="tanggal-acara1"></p>
                <p class="waktu-acara1"></p>
                <div class="item-acara">
                    <h5 class="icon">c</h5>
                    <h5 class="tempat-acara1"></h5>
                </div>
                <button type="button" id="button-acara1"><h5>Detail Lokasi</h5></button>
            </div>
            <div class="card right">
                <p class="icon-acara">b</p>
                <h4 class="nama-acara2"></h4>
                <p class="tanggal-acara2"></p>
                <p class="waktu-acara2"></p>
                <div class="item-acara">
                    <h5 class="icon">c</h5>
                    <h5 class="tempat-acara2"></h5>
                </div>
                <button type="button" id="button-acara2"><h5>Detail Lokasi</h5></button>
            </div>
        </div>
    `;

    const inputAcara = document.getElementById('input-acara');
    if (inputAcara) {
        inputAcara.innerHTML = acara;
    } else {
        console.error("Element dengan ID 'input-acara' tidak ditemukan.");
    }

    // Memasukkan kode HTML untuk tombol countdown
    const countdownBtn = `
        <button type="button" id="button-kalender"><h5>Lihat Kalender</h5></button>
    `;

    const countdownBtnContainer = document.getElementById('countdown-btn');
    if (countdownBtnContainer) {
        countdownBtnContainer.innerHTML = countdownBtn;
    } else {
        console.error("Element dengan ID 'countdown-btn' tidak ditemukan.");
    }

    // Memuat data dari file data.txt
    fetch('data-input/data.txt')
        .then((response) => response.text())
        .then((data) => {
            const lines = data.split('\n');
            const urls = lines.filter(line => line.startsWith("url-")).map(line => line.split(": ")[1].trim());

            // Memasukkan URL ke tombol pemberkatan
            if (urls.length > 0) {
                const urlToOpen = urls[0];
                const buttonAcara1 = document.getElementById('button-acara1');
                if (buttonAcara1) {
                    buttonAcara1.addEventListener("click", function () {
                        window.open(urlToOpen, "_blank");true
                    });
                } else {
                    console.error("Tombol acara 1 tidak ditemukan.");
                }
            } else {
                console.error("URL acara 1 tidak ditemukan.");
            }

            // Memasukkan URL ke tombol resepsi
            if (urls.length > 1) {
                const urlToOpen = urls[1];
                const buttonAcara2 = document.getElementById('button-acara2');
                if (buttonAcara2) {
                    buttonAcara2.addEventListener("click", function () {
                        window.open(urlToOpen, "_blank");
                    });
                } else {
                    console.error("Tombol acara 2 tidak ditemukan.");
                }
            } else {
                console.error("URL acara 2 tidak ditemukan.");
            }

            // Memasukkan URL ke tombol kalender
            if (urls.length > 2) {
                const urlToOpen = urls[2];
                const buttonKalender = document.getElementById('button-kalender');
                if (buttonKalender) {
                    buttonKalender.addEventListener("click", function () {
                        window.open(urlToOpen, "_blank");
                    });
                } else {
                    console.error("Tombol kalender tidak ditemukan.");
                }
            } else {
                console.error("URL kalender tidak ditemukan.");
            }
        })
        .catch((error) => {
            console.error("Gagal memuat data: " + error);
        });
});
