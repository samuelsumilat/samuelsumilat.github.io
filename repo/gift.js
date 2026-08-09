document.addEventListener('DOMContentLoaded', () => {
    fetch('data-input/data.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Gagal membaca data.txt. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Parsing data rekening dan gift
            const rekening = {};
            const gifts = {};

            const rekeningRegex = /^rekening-(\d+):\s*(.+)$/gm;
            let match;
            while ((match = rekeningRegex.exec(data)) !== null) {
                rekening[parseInt(match[1], 10)] = match[2].trim();
            }

            const giftRegex = /^gift-(\d+):\s*(.+)$/gm;
            let giftMatch;
            while ((giftMatch = giftRegex.exec(data)) !== null) {
                gifts[parseInt(giftMatch[1], 10)] = giftMatch[2].trim();
            }

            // Render kartu gift
            const cardWrap = document.querySelector('#gift .card-wrap');
            if (!cardWrap) {
                console.error('Element #gift .card-wrap tidak ditemukan.');
                return;
            }

            cardWrap.innerHTML = '';

            const nomorGift = Object.keys(gifts)
                .map(Number)
                .sort((a, b) => a - b);

            nomorGift.forEach(nomor => {
                const card = document.createElement('div');
                card.className = 'card top';

                const gift = document.createElement('div');
                gift.className = 'gift-name';
                gift.textContent = gifts[nomor];

                const giftItem = document.createElement('div');
                giftItem.className = 'gift-item';

                const input = document.createElement('input');
                input.id = `input-${nomor}`;
                input.type = 'text';
                input.readOnly = true;
                input.className = 'copytext';
                input.value = rekening[nomor] || '';

                const button = document.createElement('button');
                button.className = 'copybtn';
                button.type = 'button';

                const buttonText = document.createElement('h5');
                buttonText.textContent = 'Copy';
                button.appendChild(buttonText);

                giftItem.appendChild(input);
                giftItem.appendChild(button);
                card.appendChild(gift);
                card.appendChild(giftItem);
                cardWrap.appendChild(card);
            });

            // Event listener untuk tombol copy
            const copyBtns = document.querySelectorAll('.copybtn');
            const copyTexts = document.querySelectorAll('.copytext');

            copyBtns.forEach((copyBtn, index) => {
                copyBtn.addEventListener('click', async () => {
                    if (!copyTexts[index]) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal Menyalin',
                            text: 'Elemen teks tidak ditemukan.',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        return;
                    }

                    const textToCopy = copyTexts[index].value || 
                                       copyTexts[index].textContent || 
                                       copyTexts[index].innerText;

                    if (!textToCopy) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal Menyalin',
                            text: 'Tidak ada teks yang bisa disalin.',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        return;
                    }

                    try {
                        if (navigator.clipboard) {
                            await navigator.clipboard.writeText(textToCopy);
                        } else {
                            const textArea = document.createElement('textarea');
                            textArea.value = textToCopy;
                            document.body.appendChild(textArea);
                            textArea.select();
                            const success = document.execCommand('copy');
                            document.body.removeChild(textArea);

                            if (!success) {
                                throw new Error('Gagal menyalin teks.');
                            }
                        }

                        Swal.fire({
                            icon: 'success',
                            title: 'Teks Berhasil Disalin',
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } catch (err) {
                        console.error('Tidak dapat menyalin teks:', err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Gagal Menyalin',
                            text: err.message || 'Terjadi kesalahan saat menyalin teks.',
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }
                });
            });
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});