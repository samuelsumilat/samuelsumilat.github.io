document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const cerita = `
        <div class="background-02"></div>
        <div>
            <h2 class="judul-cerita">Kisah Kami</h2>
        </div>
        <section class="c-timeline">
            <div class="timeline">
                <div class="tl-left left">
                    <div>
                    <h3 class="waktu-cerita-1"></h3>
                    <h5 class="judul-cerita-1"></h5>
                    <p class="isi-cerita-1"></p>
                    </div>
                </div>
                <div class="tl-right right">
                    <div>
                    <h3 class="waktu-cerita-2"></h3>
                    <h5 class="judul-cerita-2"></h5>
                    <p class="isi-cerita-2"></p>
                    </div>
                </div>
                <div class="tl-left left">
                    <div>
                    <h3 class="waktu-cerita-3"></h3>
                    <h5 class="judul-cerita-3"></h5>
                    <p class="isi-cerita-3"></p>
                    </div>
                </div>
                <div class="tl-right right">
                    <div>
                    <h3 class="waktu-cerita-4"></h3>
                    <h5 class="judul-cerita-4"></h5>
                    <p class="isi-cerita-4"></p>
                    </div>
                </div>
            </div>
        </section>
        `;
    
document.getElementById('cerita').innerHTML = cerita;
})
