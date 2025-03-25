(function () {
    // Obtener el elemento del datetime
    const datetimeElement = document.getElementById("datetime");

    // Función para actualizar la fecha y hora
    function updateDateTime() {
        const now = new Date();
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

    // Llamar la función para actualizar la fecha y hora cada segundo
    setInterval(updateDateTime, 1000);
})();

(function () {
    const faq = {
        toggleRespuesta: function (id) {
            var respuesta = document.getElementById(id);
            if (respuesta.style.display === "none") {
                respuesta.style.display = "block";
            } else {
                respuesta.style.display = "none";
            }
        }
    };

    //Asignar evento click a las preguntas
    const preguntas = document.querySelectorAll('.pregunta');
    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', function () {
            const respuestaId = this.dataset.respuesta;
            faq.toggleRespuesta(respuestaId);
        });
    });
})();

(function () {
    const carousel = {
        imagenes: document.querySelectorAll('.imagenes-lado img'),
        indicators: document.querySelectorAll('.carousel-indicator'),
        index: 0,
        intervalId: null,

        updateIndicators: function () {
            this.indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === this.index);
            });
        },
        showSlide: function (n) {
            this.index = (n + this.imagenes.length) % this.imagenes.length;

            for (let i = 0; i < this.imagenes.length; i++) {
                this.imagenes[i].classList.remove('active');
            }
            this.imagenes[this.index].classList.add('active');
            this.updateIndicators();
        },
        nextSlide: function () {
            this.showSlide(this.index + 1);
        },
        prevSlide: function () {
            this.showSlide(this.index - 1);
        },
        goToSlide: function (n) {
            this.showSlide(n);
        },
        startCarousel: function () {
            this.intervalId = setInterval(() => this.nextSlide(), 3000);

        },
        stopCarousel: function () {
            clearInterval(this.intervalId);
        },
    };

    //Inicilizar variables

    carousel.startCarousel();
    carousel.imagenes[0].classList.add('active');
    carousel.updateIndicators();

    //Asignar carousel al ambito global
    window.carousel = carousel;

})();

// Intersection Observer API para iniciar el carrusel cuando está visible
const carouselSection = document.querySelector('.imagenes-lado');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // El elemento está visible
            carousel.startCarousel();
        } else {
            // El elemento no está visible
            carousel.stopCarousel();
        }
    });
});
observer.observe(carouselSection);