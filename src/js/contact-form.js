// Validación del formulario nuevo
import emailjs from '@emailjs/browser'
const apiKey = import.meta.env.PUBLIC_API_KEY
const serviceKey = import.meta.env.PUBLIC_SERVICE_KEY

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form")
    const resultDiv = document.getElementById("result")

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault()

            // Validar el formulario
            if (!form.checkValidity()) {
                event.stopPropagation()
                form.classList.add("was-validated")
                return
            }

            // Mostrar mensaje de carga
            if (resultDiv) {
                resultDiv.innerHTML = '<p class="text-emerald-50">Enviando mensaje...</p>'
            }

            // Enviar el formulario con EmailJS (que ya está inicializado en el layout)
            if (typeof emailjs !== "undefined") {
                emailjs.sendForm(serviceKey, "template_nu83u5j", this, { publicKey: apiKey }).then(
                    (response) => {
                        console.log("SUCCESS!", response)
                        if (resultDiv) {
                            resultDiv.innerHTML =
                                '<p class="success-message text-emerald-50">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</p>'
                        }
                        form.reset()
                        form.classList.remove("was-validated")
                    },
                    (error) => {
                        console.log("FAILED...", error)
                        if (resultDiv) {
                            resultDiv.innerHTML =
                                '<p class="error-message text-red-100">Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.</p>'
                        }
                    },
                )
            } else {
                console.error("EmailJS is not initialized. Make sure it is properly included in your layout.")
                if (resultDiv) {
                    resultDiv.innerHTML =
                        '<p class="error-message">EmailJS is not initialized. Please check the console for details.</p>'
                }
            }
        })

        // Validación en tiempo real
        const inputs = form.querySelectorAll("input, textarea, select")
        inputs.forEach((input) => {
            input.addEventListener("blur", function () {
                if (!this.validity.valid) {
                    this.classList.add("is-invalid")
                } else {
                    this.classList.remove("is-invalid")
                }
            })
        })
    }
})

