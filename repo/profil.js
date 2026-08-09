document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const profil = `
    <h3>Bride & Groom</h3>
    <div class="card-container">
        <div class="card-wrap">
            <div class="card bottom">
                <h4 class="judul-quotes1"></h4>
                <p class="quotes1"></p>
                <h5 class="sumber-quotes1"></h5>
            </div>
        </div>
        <div class="card-wrap">
            <div class="card left">
                <div class="box groom-image"></div>
                <h4 class="groom"></h4>
                <p>Anak <span class="groom-anak-ke"></span> dari Bapak <span class="ayah-groom"></span> dan Ibu <span class="ibu-groom"></span></p>
                <div class="item-acara">
                    <span><h5 class="icon">c</h5></span><br>
                    <h5 class="alamat-groom"></h5>
                </div>
            </div>
            <div class="card right">
                <div class="box bride-image"></div>
                <h4 class="bride"></h4>
                <p>Anak <span class="bride-anak-ke"></span> dari Bapak <span class="ayah-bride"></span> dan Ibu <span class="ibu-bride"></span></p>
                <div class="item-acara">
                    <span><h5 class="icon">c</h5></span><br>
                    <h5 class="alamat-bride"></h5>
                </div>
            </div>
        </div>
        <div class="card-wrap">
            <div class="card bottom">
                <h4 class="judul-quotes2"></h4>
                <p class="quotes2"></p>
                <h5 class="sumber-quotes2"></h5>
            </div>
        </div>
    </div>
        `;
    
document.getElementById('profil').innerHTML = profil;
})
