document.getElementById("guestbook-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const ucapan = document.getElementById("ucapan").value;
  const kehadiran = document.getElementById("kehadiran").value;
  
  google.script.run.insertData(nama, ucapan, kehadiran);

  document.getElementById("nama").value = "";
  document.getElementById("ucapan").value = "";
  document.getElementById("kehadiran").value = "ada";
});
