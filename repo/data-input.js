let weddingData = {};

function loadDataFromFile() {
    return fetch("data-input/data.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal membaca data.txt");
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split(/\r?\n/);
            weddingData = {};

            lines.forEach(line => {
                line = line.trim();

                if (!line || line.startsWith("==========") || line.startsWith("(")) {
                    return;
                }

                const separatorIndex = line.indexOf(": ");
                if (separatorIndex === -1) {
                    return;
                }

                const key = line.substring(0, separatorIndex).trim().toLowerCase();
                const value = line.substring(separatorIndex + 2).trim();
                weddingData[key] = value;

                const elements = document.getElementsByClassName(key);
                for (let i = 0; i < elements.length; i++) {
                    elements[i].textContent = value;
                }

                if (key === "url-video") {
                    if (typeof loadYouTubeVideo === "function") {
                        loadYouTubeVideo(value);
                    }
                }
            });

            console.log("data.txt berhasil dimuat:", weddingData);
            document.dispatchEvent(new Event("weddingDataReady"));
            return weddingData;
        })
        .catch(error => {
            console.error("Error loading data:", error);
            throw error;
        });
}

document.addEventListener("DOMContentLoaded", loadDataFromFile);