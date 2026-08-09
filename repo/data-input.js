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
