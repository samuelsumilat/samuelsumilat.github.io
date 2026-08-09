document.addEventListener("DOMContentLoaded", function() {
    fetch('data-input/data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const giftLinks = {};

            lines.forEach(line => {
                if (line.startsWith('gift-01:')) {
                    giftLinks['gift-01'] = line.split(': ')[1].trim();
                } else if (line.startsWith('gift-02:')) {
                    giftLinks['gift-02'] = line.split(': ')[1].trim();
                } else if (line.startsWith('gift-03:')) {
                    giftLinks['gift-03'] = line.split(': ')[1].trim();
                } else if (line.startsWith('gift-04:')) {
                    giftLinks['gift-04'] = line.split(': ')[1].trim();
                }
            });

            // Set the CSS variables
            document.documentElement.style.setProperty('--gift-01', `url(${giftLinks['gift-01']})`);
            document.documentElement.style.setProperty('--gift-02', `url(${giftLinks['gift-02']})`);
            document.documentElement.style.setProperty('--gift-03', `url(${giftLinks['gift-03']})`);
            document.documentElement.style.setProperty('--gift-04', `url(${giftLinks['gift-04']})`);
        })
        .catch(error => console.error('Error fetching data:', error));
});
