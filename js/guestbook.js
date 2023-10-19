document.getElementById("guestbookForm").onsubmit = function(e) {
  e.preventDefault();
  var data = new FormData(this);
  fetch('https://script.google.com/macros/s/AKfycbzf9sScQFfSS3X2NSdEoN3zObMKRvF8-rC3-W7uW-mEgB1-Z27M/exec', {
    method: 'POST',
    body: data
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      alert('Data berhasil disimpan.');
    } else {
      alert('Gagal menyimpan data.');
    }
  });
}