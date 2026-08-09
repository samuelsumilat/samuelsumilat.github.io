// Fungsi untuk mengambil konfigurasi dari file data.txt
async function fetchConfig() {
    try {
        // Ambil konten dari data.txt
        const response = await fetch('data-input/data.txt');
        if (!response.ok) {
            throw new Error('Gagal mengambil konfigurasi');
        }
        const text = await response.text();

        // Ekstrak URL token dari konten data.txt
        const tokenLine = text.split('\n').find(line => line.startsWith('token:'));
        if (!tokenLine) {
            throw new Error('URL token tidak ditemukan dalam data.txt');
        }
        const tokenUrl = tokenLine.split('token:')[1].trim();

        // Ambil konfigurasi dari URL token yang diekstrak
        const tokenResponse = await fetch(tokenUrl);
        if (!tokenResponse.ok) {
            throw new Error('Gagal mengambil konfigurasi dari URL token');
        }
        const tokenText = await tokenResponse.text();
        const [token, username, repo] = tokenText.split('\n').map(line => line.trim());

        return {
            token: token,
            username: username,
            repo: repo
        };
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error;
    }
}

// Fungsi untuk memformat timestamp ke "dd, NamaBulan yyyy" dalam bahasa Indonesia
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk membaca data dari file guestbook.txt
async function bacaDataKomentar(API_TOKEN, repoOwner, repoName) {
    const filePath = 'data-input/guestbook.txt';
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${API_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Gagal membaca data komentar');
        }
        const data = await response.json();
        const content = atob(data.content); // Decode base64 content
        return content.split('\n').filter(line => line.trim() !== ""); // Filter baris kosong
    } catch (error) {
        console.error('Error reading comments:', error);
        throw error;
    }
}

// Fungsi untuk menulis data ke file guestbook.txt
async function tulisDataKomentar(API_TOKEN, repoOwner, repoName, dataBaru) {
    const filePath = 'data-input/guestbook.txt';
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    try {
        // Ambil data saat ini untuk mendapatkan SHA
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${API_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Gagal mengambil data saat ini');
        }
        const data = await response.json();
        const sha = data.sha;

        // Tambahkan data baru ke konten yang ada
        const content = atob(data.content); // Decode base64 content
        const newContent = content + '\n' + dataBaru;

        // Kirim pembaruan ke GitHub
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Menambahkan komentar baru',
                content: btoa(newContent), // Encode ke base64
                sha: sha
            })
        });

        if (!updateResponse.ok) {
            throw new Error('Gagal menulis data komentar');
        }
    } catch (error) {
        console.error('Error writing comments:', error);
        throw error;
    }
}

// Fungsi untuk menampilkan komentar
async function tampilkanKomentar(komentarList) {
    try {
        const config = await fetchConfig();
        const API_TOKEN = config.token;
        const repoOwner = config.username;
        const repoName = config.repo;

        const komentarData = await bacaDataKomentar(API_TOKEN, repoOwner, repoName);
        komentarList.innerHTML = ""; // Hapus konten sebelumnya

        // Parse setiap baris menjadi objek JSON dan urutkan berdasarkan timestamp
        const komentarObjek = komentarData.map(komentar => JSON.parse(komentar));
        komentarObjek.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Urutkan dari yang terbaru

        // Tampilkan komentar yang sudah diurutkan
        komentarObjek.forEach(komentar => {
            const komentarDiv = document.createElement("div");
            komentarDiv.classList.add("post");

            // Tampilkan timestamp dengan format "dd, NamaBulan yyyy"
            const timestamp = formatTimestamp(komentar.timestamp);

            komentarDiv.innerHTML = `
                <section class="post-container">
                    <minidenticon-svg username="${komentar.nama}"></minidenticon-svg>
                    <div class="post-wrap">
                        <div class="post-item">
                            <h5 class="post-name item">${komentar.nama}</h5>
                            <h6 class="post-status item"><span class="${komentar.kehadiran}">${komentar.kehadiran}</span></h6>
                        </div>
                        <p class="post-comment">${komentar.pesan}</p>
                        <h6 class="post-date">${timestamp}</h6>
                    </div>
                </section>
            `;

            komentarList.appendChild(komentarDiv);
        });
    } catch (error) {
        console.error('Error displaying comments:', error);
        alert('Terjadi kesalahan saat menampilkan komentar');
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Kode JavaScript untuk memasukkan kode HTML
        const ucapan = `
            <h3>RSVP</h3>
            <form id="guestbook-form">
                <input type="text" id="nama" placeholder="Nama" required>
                <select id="kehadiran" required>
                    <option value="" disabled selected>Pilih Kehadiran</option>
                    <option value="Hadir" class="status-biru">Hadir</option>
                    <option value="Belum Pasti" class="status-hijau">Belum Pasti</option>
                    <option value="Tidak Hadir" class="status-merah">Tidak Hadir</option>
                </select>
                <textarea id="pesan" placeholder="Ucapan" required></textarea>
                <button class="gbtn" type="submit"><h6>Kirim</h6></button>
            </form>
            <h4>Ucapan</h4>
            <div id="komentar-list"></div>
        `;

        document.getElementById('ucapan').innerHTML = ucapan;

        // Panggil fungsi untuk menampilkan komentar saat halaman dimuat
        const komentarList = document.getElementById("komentar-list");
        tampilkanKomentar(komentarList);

        // Tambahkan event listener untuk mengirim data dan memperbarui komentar saat formulir disubmit
        const form = document.getElementById("guestbook-form");
        form.addEventListener("submit", async function(event) {
            event.preventDefault();

            const nama = document.getElementById("nama").value.trim();
            const pesan = document.getElementById("pesan").value.trim();
            const kehadiran = document.getElementById("kehadiran").value;

            if (!nama || !pesan || !kehadiran) {
                alert('Harap isi semua field');
                return;
            }

            // Gabungkan nama dan timestamp untuk membuat kode unik
            const timestamp = new Date().toISOString();
            const uniqueCode = nama + "-" + timestamp;

            const data = JSON.stringify({
                nama: nama,
                pesan: pesan,
                kehadiran: kehadiran,
                timestamp: timestamp,
                uniqueCode: uniqueCode
            });

            try {
                const config = await fetchConfig();
                const API_TOKEN = config.token;
                const repoOwner = config.username;
                const repoName = config.repo;

                await tulisDataKomentar(API_TOKEN, repoOwner, repoName, data);
                alert("Pesan berhasil dikirim ke buku tamu!");
                document.getElementById("nama").value = "";
                document.getElementById("pesan").value = "";
                document.getElementById("kehadiran").value = ""; // Reset kehadiran ke default
                tampilkanKomentar(komentarList); // Perbarui tampilan komentar
            } catch (error) {
                console.error('Error submitting form:', error);
                alert("Terjadi kesalahan. Silakan coba lagi.");
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan dalam memuat konfigurasi');
    }
});
