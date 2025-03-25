document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            asunto: formData.get('asunto'),
            mensaje: formData.get('mensaje')
        };

        try {
            const response = await fetch('/api/guardar-contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                statusMessage.classList.remove('hidden');
                statusMessage.classList.add('bg-green-100', 'text-green-700');
                statusMessage.textContent = "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
                form.reset();
            } else {
                statusMessage.classList.remove('hidden');
                statusMessage.classList.add('bg-red-100', 'text-red-700');
                statusMessage.textContent = result.error || "Error al enviar el mensaje";
            }
        } catch (error) {
            statusMessage.classList.remove('hidden');
            statusMessage.classList.add('bg-red-100', 'text-red-700');
            statusMessage.textContent = "Error al enviar el mensaje";
        }
    });
});