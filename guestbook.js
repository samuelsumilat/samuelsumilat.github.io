const guestbookForm = document.getElementById("guestbook-form");
        const guestbookEntries = document.getElementById("guestbook-entries");

        // Mengecek apakah data sudah dikirim dari perangkat ini
        //if (localStorage.getItem('guestbook-submitted')) {
            //guestbookForm.style.display = 'none';
        //}

        async function fetchGuestbookData() {
            const response = await fetch("https://guestbook-7b935-default-rtdb.asia-southeast1.firebasedatabase.app/guestbook.json");
            const data = await response.json();

            if (response.ok) {
                let entries = "";

                // Loop melalui data dari API dan tampilkan di bawah form
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const entry = data[key];
                        // Tambahkan kelas gaya berdasarkan pilihan "Hadir," "Belum Pasti," atau "Tidak Hadir"
                        const kehadiranClass = entry.kehadiran === "Hadir" ? "text-blue" :
                            entry.kehadiran === "Belum Pasti" ? "text-green" : "text-red";
                        entries += `
                            <section class="guestbook-container">
                                <div class="guestbook-wrap">
                                    <div class="avatar">
                                        <minidenticon-svg username="${entry.nama}"></minidenticon-svg>
                                    </div>
                                    <div class="comments">
                                        <h3>${entry.nama}</h3>
                                        <h4><span class="${kehadiranClass}">${entry.kehadiran}</span></h4>
                                        <p>Ucapan: ${entry.ucapan}</p>
                                        <h6>${entry.waktu}</h6>
                                    </div>
                                </div>
                            </section>
                        `;
                    }
                }

                guestbookEntries.innerHTML = entries;
            }
        }

        // Panggil fungsi untuk mengambil data saat halaman dimuat
        fetchGuestbookData();

        guestbookForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Cek apakah data sudah dikirim dari perangkat ini
            //if (localStorage.getItem('guestbook-submitted')) {
                //alert('Anda telah mengirimkan data sebelumnya dari perangkat ini.');
                //return;
            //}

            const formData = new FormData(guestbookForm);
            const data = {};

            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Tambahkan waktu postingan
            data.waktu = new Date().toLocaleString();

            const response = await fetch("https://guestbook-7b935-default-rtdb.asia-southeast1.firebasedatabase.app/guestbook.json", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                // Tambahkan data yang baru ditambahkan ke tampilan di bawah form
                // Gunakan kelas gaya berdasarkan pilihan "Hadir," "Belum Pasti," atau "Tidak Hadir"
                const kehadiranClass = data.kehadiran === "Hadir" ? "text-blue" :
                    data.kehadiran === "Belum Pasti" ? "text-green" : "text-red";
                guestbookEntries.innerHTML += `
                    <section class="guestbook-container">
                        <div class="guestbook-wrap">
                            <div class="avatar">
                                <minidenticon-svg username="${data.nama}"></minidenticon-svg>
                            </div>
                            <div class="comments">
                                <h3>${data.nama}</h3>
                                <h4><span class="${kehadiranClass}">${data.kehadiran}</span></h4>
                                <p>Ucapan: ${data.ucapan}</p>
                                <h6>${data.waktu}</h6>
                            </div>
                        </div>
                    </section>
                `;
                guestbookForm.reset();

                // Tandai bahwa data sudah dikirim dari perangkat ini
            //    localStorage.setItem('guestbook-submitted', 'true');
            //    guestbookForm.style.display = 'none';
            }
        });