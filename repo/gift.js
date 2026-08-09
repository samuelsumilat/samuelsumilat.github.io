document.addEventListener("DOMContentLoaded", function () {
    function loadGift() {
        if (typeof weddingData === "undefined") {
            console.error("weddingData tidak ditemukan.");
            return;
        }

        const giftSection = document.getElementById("gift");
        if (!giftSection) {
            console.error("Element #gift tidak ditemukan.");
            return;
        }

        let adaGift = false;

        for (let i = 1; i <= 4; i++) {
            const nomor = String(i).padStart(2, "0");
            const status = String(weddingData["aktifkan-gift-" + nomor] || "").trim().toLowerCase();
            const nama = weddingData["gift-" + nomor] || "";
            const rekening = weddingData["rekening-" + i] || "";
            const card = giftSection.querySelector(".gift-card-" + nomor);

            if (!card) continue;

            if (status !== "ya") {
                card.style.display = "none";
                continue;
            }

            card.style.display = "block";
            adaGift = true;

            let namaBank = card.querySelector(".gift-name");
            if (!namaBank) {
                namaBank = document.createElement("h4");
                namaBank.className = "gift-name";
                const giftIcon = card.querySelector(".gift-" + nomor);
                if (giftIcon) {
                    giftIcon.insertAdjacentElement("afterend", namaBank);
                } else {
                    card.prepend(namaBank);
                }
            }

            namaBank.textContent = nama;
            namaBank.style.display = "block";
            namaBank.style.visibility = "visible";
            namaBank.style.opacity = "1";
            namaBank.style.color = "inherit";
            namaBank.style.position = "relative";
            namaBank.style.zIndex = "999";
            namaBank.style.textAlign = "center";

            const input = document.getElementById("input-" + i);
            if (input) {
                input.value = rekening;
            }
        }

        giftSection.style.display = adaGift ? "" : "none";
        console.log("Gift berhasil dimuat:", weddingData);
    }

    document.addEventListener("weddingDataReady", loadGift);
});