document.addEventListener("DOMContentLoaded", function () {
    const acara = `
        <div class="card-wrap">
            <div class="card left" id="acara-card-1">
                <p class="icon-acara">a</p>
                <h4 class="nama-acara1"></h4>
                <p class="tanggal-acara1"></p>
                <p class="waktu-acara1"></p>
                <div class="item-acara">
                    <h5 class="icon">c</h5>
                    <h5 class="tempat-acara1"></h5>
                </div>
                <button type="button" id="button-acara1">
                    <h5>Detail Lokasi</h5>
                </button>
            </div>
            <div class="card right" id="acara-card-2">
                <p class="icon-acara">b</p>
                <h4 class="nama-acara2"></h4>
                <p class="tanggal-acara2"></p>
                <p class="waktu-acara2"></p>
                <div class="item-acara">
                    <h5 class="icon">c</h5>
                    <h5 class="tempat-acara2"></h5>
                </div>
                <button type="button" id="button-acara2">
                    <h5>Detail Lokasi</h5>
                </button>
            </div>
        </div>
    `;

    const inputAcara = document.getElementById("input-acara");
    if (inputAcara) {
        inputAcara.innerHTML = acara;
    }

    const countdownBtn = `
        <button type="button" id="button-kalender">
            <h5>Lihat Kalender</h5>
        </button>
    `;
    const countdownBtnContainer = document.getElementById("countdown-btn");
    if (countdownBtnContainer) {
        countdownBtnContainer.innerHTML = countdownBtn;
    }

    document.addEventListener("weddingDataReady", function () {
        const acara1Aktif = String(weddingData["aktifkan-acara1"] || "").toLowerCase() === "ya";
        const acara2Aktif = String(weddingData["aktifkan-acara2"] || "").toLowerCase() === "ya";

        const acaraCard1 = document.getElementById("acara-card-1");
        if (acaraCard1) {
            acaraCard1.style.display = acara1Aktif ? "" : "none";
        }

        const acaraCard2 = document.getElementById("acara-card-2");
        if (acaraCard2) {
            acaraCard2.style.display = acara2Aktif ? "" : "none";
        }

        const sectionAcara = document.getElementById("acara");
        if (sectionAcara) {
            sectionAcara.style.display = (!acara1Aktif && !acara2Aktif) ? "none" : "";
        }

        const buttonAcara1 = document.getElementById("button-acara1");
        if (buttonAcara1 && weddingData["url-1"]) {
            buttonAcara1.onclick = function () {
                window.open(weddingData["url-1"], "_blank");
            };
        }

        const buttonAcara2 = document.getElementById("button-acara2");
        if (buttonAcara2 && weddingData["url-2"]) {
            buttonAcara2.onclick = function () {
                window.open(weddingData["url-2"], "_blank");
            };
        }

        const buttonKalender = document.getElementById("button-kalender");
        if (buttonKalender && weddingData["url-3"]) {
            buttonKalender.onclick = function () {
                window.open(weddingData["url-3"], "_blank");
            };
        }
    });
});