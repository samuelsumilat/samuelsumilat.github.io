document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.getElementById('thumbnails');
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let imageArray = [];
  let totalImages = 0;
  let currentImageIndex = 0;

  const imageFolder = "img/";
  const extensions = [".webp", ".jpg", ".jpeg", ".png"];

  function checkImage(number) {
    return new Promise(resolve => {
      let index = 0;
      const name = String(number).padStart(3, "0");

      function checkNext() {
        if (index >= extensions.length) {
          resolve(null);
          return;
        }

        const url = imageFolder + name + extensions[index];
        const img = new Image();

        img.onload = function () {
          resolve(url);
        };

        img.onerror = function () {
          index++;
          checkNext();
        };

        img.src = url;
      }

      checkNext();
    });
  }

  async function loadImages() {
    let number = 1;

    while (true) {
      const image = await checkImage(number);

      if (!image) {
        break;
      }

      imageArray.push(image);
      number++;
    }

    totalImages = imageArray.length;
    renderThumbnails();
  }

  function renderThumbnails() {
    thumbnails.innerHTML = "";

    imageArray.forEach((imageUrl, index) => {
      const img = document.createElement("img");
      img.className = "bottom";
      img.src = imageUrl;
      img.loading = "lazy";

      img.onclick = function () {
        openModal(imageUrl, index);
      };

      thumbnails.appendChild(img);
    });
  }

  function openModal(url, index) {
    modal.style.display = "block";
    modalImg.src = url;
    currentImageIndex = index;
    document.body.style.overflow = "hidden";
  }

  closeBtn.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  prevBtn.onclick = function () {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    modalImg.src = imageArray[currentImageIndex];
  };

  nextBtn.onclick = function () {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    modalImg.src = imageArray[currentImageIndex];
  };

  let touchStartX = 0;
  let touchEndX = 0;

  modalImg.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  });

  modalImg.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].clientX;

    if (touchStartX - touchEndX > 50) {
      nextBtn.click();
    } else if (touchEndX - touchStartX > 50) {
      prevBtn.click();
    }
  });

  loadImages();
});