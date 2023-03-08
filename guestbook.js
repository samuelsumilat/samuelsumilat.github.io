const form = document.querySelector('#guestbook-form');
const table = document.querySelector('#guestbook-table tbody');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	
	const name = form.querySelector('#name').value;
	const email = form.querySelector('#email').value;
	const attend = form.querySelector('#attend').value;
	const message = form.querySelector('#message').value;
	
	// tambahkan data ke tabel
	const row = table.insertRow();
	const nameCell = row.insertCell();
	nameCell.textContent = name;
	const emailCell = row.insertCell();
	emailCell.textContent = email;
	const attendCell = row.insertCell();
	attendCell.textContent = attend === 'yes' ? 'Ya' : 'Tidak';
	const messageCell = row.insertCell();
	messageCell.textContent = message;
	
	// reset form setelah data ditambahkan
	form.reset();
});
