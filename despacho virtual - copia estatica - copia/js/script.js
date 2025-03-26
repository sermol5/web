function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementById("datetime");
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Hermosillo'
    };
    datetimeElement.textContent = now.toLocaleDateString('es-MX', options);
}

// Actualizar la fecha y hora cada segundo
setInterval(updateDateTime, 1000);

function toggleRespuesta(id) {
    var respuesta = document.getElementById(id);
    if (respuesta.style.display === "none") {
        respuesta.style.display = "block";
    } else {
        respuesta.style.display = "none";
    }
}
// Carrusel de imágenes
const imagenes = document.querySelectorAll('.imagenes-lado img');
const indicators = document.querySelectorAll('.carousel-indicator');
let index = 0;
let intervalId;

function updateIndicators() {
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}
function showSlide(n) {
    // Reset to 0 if n is out of range
    index = (n + imagenes.length) % imagenes.length;

    // Hide all images
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].classList.remove('active');
    }

    // Show the nth image
    imagenes[index].classList.add('active');
    updateIndicators();

}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

function goToSlide(n) {
    showSlide(n);
}

function startCarousel() {
    intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function stopCarousel() {
    clearInterval(intervalId);
}

// Init
startCarousel();
imagenes[0].classList.add('active');
updateIndicators();