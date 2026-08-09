// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Ekstrak ID video dari berbagai format URL YouTube
 * @param {string} url - URL YouTube atau ID video
 * @returns {string|null} - ID video atau null jika tidak valid
 */
function getYouTubeVideoId(url) {
    if (!url) return null;
    
    url = url.trim();
    
    // Pola URL yang didukung:
    const patterns = [
        /youtu\.be\/([^?&]+)/,              // youtu.be/VIDEO_ID
        /[?&]v=([^?&]+)/,                   // watch?v=VIDEO_ID
        /youtube\.com\/embed\/([^?&]+)/     // embed/VIDEO_ID
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    
    // Jika input langsung berupa ID video (11 karakter)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url;
    }
    
    return null;
}

// ============================================================
// VIDEO RENDERER
// ============================================================

/**
 * Render iframe YouTube ke dalam container
 * @param {string} url - URL atau ID video YouTube
 */
function loadYouTubeVideo(url) {
    const videoContainer = document.getElementById('video');
    if (!videoContainer || !url) return;
    
    const videoId = getYouTubeVideoId(url);
    if (!videoId) {
        console.error('URL YouTube tidak valid:', url);
        return;
    }
    
    videoContainer.innerHTML = `
        <div class="youtube-container">
            <iframe 
                src="https://www.youtube.com/embed/${videoId}"
                title="Video Pernikahan"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>
        </div>
    `;
}

// ============================================================
// DATA LOADER
// ============================================================

/**
 * Membaca dan memproses file data.txt
 * Format: KEY: value
 */
function loadDataFromFile() {
    fetch('data-input/data.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal membaca data.txt');
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split(/\r?\n/);
            
            lines.forEach(line => {
                line = line.trim();
                
                // Lewati baris kosong atau komentar
                if (!line || line.startsWith('==========') || line.startsWith('(')) {
                    return;
                }
                
                // Parse KEY: value
                const separatorIndex = line.indexOf(': ');
                if (separatorIndex === -1) return;
                
                const key = line.substring(0, separatorIndex).trim();
                const value = line.substring(separatorIndex + 2).trim();
                
                // Handle video URL spesial
                if (key.toLowerCase() === 'url-video') {
                    loadYouTubeVideo(value);
                    return;
                }
                
                // Update semua elemen dengan class = key
                const elements = document.getElementsByClassName(key.toLowerCase());
                for (let i = 0; i < elements.length; i++) {
                    elements[i].textContent = value;
                }
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

// ============================================================
// INITIALIZATION
// ============================================================

window.addEventListener('load', loadDataFromFile);