let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function showSlide(n) {
  const slides = document.getElementsByClassName('slide');

  // Si llega al final, vuelve al inicio
  if (n > slides.length) {
    slideIndex = 1;
  }
  // Si está en el inicio y se retrocede, muestra el último slide
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Oculta todas las imágenes
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  // Muestra la imagen activa
  slides[slideIndex - 1].style.display = 'block';
}

// Asegurémonos de que el Slide se actualice cada cierto tiempo
setInterval(function() {
  changeSlide(1);
}, 4000); // Cambiar cada 4 segundos (ajustar según sea necesario)

