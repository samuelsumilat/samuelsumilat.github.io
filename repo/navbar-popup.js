document.addEventListener("DOMContentLoaded", function () {
  fetch("data-input/data.txt")
    .then(response => response.text())
    .then(data => {
      const parsedData = parseDataFile(data);
      console.log("Data berhasil dimuat:", parsedData);
      insertNavbarAndMusic();
    })
    .catch(error => {
      console.error("Gagal memuat data:", error);
    });
});

function parseDataFile(data) {
  const lines = data.split(/\r?\n/);
  const result = {};
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    if (trimmedLine.startsWith("==========")) continue;
    if (trimmedLine.startsWith("(")) continue;
    const separatorIndex = trimmedLine.indexOf(":");
    if (separatorIndex !== -1) {
      const key = trimmedLine.substring(0, separatorIndex).trim();
      const value = trimmedLine.substring(separatorIndex + 1).trim();
      result[key] = value;
    }
  }
  return result;
}

let track = new Audio("assets/music.mp3");

function updateMusicIcon() {
  const controlBtn = document.getElementById("play-pause");
  if (!controlBtn) return;
  controlBtn.className = track.paused ? "play" : "pause";
}

function insertNavbarAndMusic() {
  const navbarHTML = `
    <nav>
      <ul>
        <li>
          <a class="nav-icon active" href="#home">1</a>
          <a class="nav-icon" href="#profil">2</a>
          <a class="nav-icon" href="#acara">3</a>
          <a class="nav-icon" href="#galeri">4</a>
          <a class="nav-icon" href="#cerita">5</a>
          <a class="nav-icon" href="#gift">6</a>
          <a class="nav-icon" href="#ucapan">7</a>
          <span id="play-pause" class="pause"></span>
        </li>
      </ul>
    </nav>
  `;
  const navbarElement = document.getElementById("navbar");
  if (navbarElement) {
    navbarElement.innerHTML = navbarHTML;
  } else {
    console.error("Element #navbar tidak ditemukan.");
  }

  const articles = document.querySelectorAll("article");
  const navLinks = document.querySelectorAll("li a");
  window.onscroll = function () {
    const top = window.scrollY;
    articles.forEach(function (article) {
      const offset = article.offsetTop - 150;
      const height = article.offsetHeight;
      const id = article.getAttribute("id");
      if (top >= offset && top < offset + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
        });
        const activeLink = document.querySelector(`li a[href*="${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  const controlBtn = document.getElementById("play-pause");
  if (controlBtn) {
    controlBtn.addEventListener("click", function () {
      if (track.paused) {
        track.play()
          .then(function () {
            updateMusicIcon();
          })
          .catch(function (error) {
            console.error("Gagal memainkan musik:", error);
          });
      } else {
        track.pause();
        updateMusicIcon();
      }
    });
  }

  track.addEventListener("ended", function () {
    updateMusicIcon();
  });

  const closeButton = document.querySelector(".close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      const popup = document.querySelector(".popup");
      if (popup) {
        popup.style.display = "none";
      }
      track.play()
        .then(function () {
          updateMusicIcon();
        })
        .catch(function (error) {
          console.warn("Musik tidak dapat diputar:", error);
        });
      document.body.scrollIntoView();
    });
  }
}