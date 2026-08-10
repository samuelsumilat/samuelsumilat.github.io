document.addEventListener("weddingDataReady", () => {
  const ceritaContainer = document.getElementById("cerita");
  if (!ceritaContainer) {
    console.error("Element #cerita tidak ditemukan.");
    return;
  }

  const cerita1Aktif = (weddingData["aktifkan-cerita-1"] || "").toLowerCase() === "ya";
  const cerita2Aktif = (weddingData["aktifkan-cerita-2"] || "").toLowerCase() === "ya";
  const cerita3Aktif = (weddingData["aktifkan-cerita-3"] || "").toLowerCase() === "ya";
  const cerita4Aktif = (weddingData["aktifkan-cerita-4"] || "").toLowerCase() === "ya";

  if (!cerita1Aktif && !cerita2Aktif && !cerita3Aktif && !cerita4Aktif) {
    ceritaContainer.style.display = "none";
    return;
  }

  let ceritaHTML = `
    <div class="background-02"></div>
    <div>
      <h2 class="judul-cerita">Kisah Kami</h2>
    </div>
    <section class="c-timeline">
      <div class="timeline">
  `;

  if (cerita1Aktif) {
    ceritaHTML += `
      <div class="tl-left left">
        <div>
          <h3 class="waktu-cerita-1"></h3>
          <h5 class="judul-cerita-1"></h5>
          <p class="isi-cerita-1"></p>
        </div>
      </div>
    `;
  }

  if (cerita2Aktif) {
    ceritaHTML += `
      <div class="tl-right right">
        <div>
          <h3 class="waktu-cerita-2"></h3>
          <h5 class="judul-cerita-2"></h5>
          <p class="isi-cerita-2"></p>
        </div>
      </div>
    `;
  }

  if (cerita3Aktif) {
    ceritaHTML += `
      <div class="tl-left left">
        <div>
          <h3 class="waktu-cerita-3"></h3>
          <h5 class="judul-cerita-3"></h5>
          <p class="isi-cerita-3"></p>
        </div>
      </div>
    `;
  }

  if (cerita4Aktif) {
    ceritaHTML += `
      <div class="tl-right right">
        <div>
          <h3 class="waktu-cerita-4"></h3>
          <h5 class="judul-cerita-4"></h5>
          <p class="isi-cerita-4"></p>
        </div>
      </div>
    `;
  }

  ceritaHTML += `
      </div>
    </section>
  `;

  ceritaContainer.innerHTML = ceritaHTML;
  ceritaContainer.style.display = "";

  const fields = [
    "waktu-cerita-1", "judul-cerita-1", "isi-cerita-1",
    "waktu-cerita-2", "judul-cerita-2", "isi-cerita-2",
    "waktu-cerita-3", "judul-cerita-3", "isi-cerita-3",
    "waktu-cerita-4", "judul-cerita-4", "isi-cerita-4"
  ];

  fields.forEach((key) => {
    const elements = document.getElementsByClassName(key);
    for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = weddingData[key] || "";
    }
  });

  console.log("Kisah Kami berhasil dimuat.");
});