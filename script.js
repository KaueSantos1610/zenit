document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER
    ========================= */

    const header = document.getElementById("header");

    function handleHeader() {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });

    handleHeader();


    /* =========================
       MENU MOBILE
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

            document.body.style.overflow = isOpen
                ? "hidden"
                : "";
        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

                document.body.style.overflow = "";

            });

        });

    }


    /* =========================
       REVEAL ON SCROLL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       DATA ATUAL
    ========================= */

    const dateInput = document.getElementById("date");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;
    }


    /* =========================
       MÁSCARA DE WHATSAPP
    ========================= */

    const phoneInput = document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener("input", event => {

            let value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 11);

            if (value.length > 6) {

                value = value.replace(
                    /^(\d{2})(\d{5})(\d{0,4}).*/,
                    "($1) $2-$3"
                );

            } else if (value.length > 2) {

                value = value.replace(
                    /^(\d{2})(\d{0,5})/,
                    "($1) $2"
                );

            } else {

                value = value.replace(
                    /^(\d*)/,
                    "($1"
                );

            }

            event.target.value = value;

        });

    }


    /* =========================
       AGENDAMENTO WHATSAPP
    ========================= */

    const appointmentForm =
        document.getElementById("appointmentForm");

    if (appointmentForm) {

        appointmentForm.addEventListener("submit", event => {

            event.preventDefault();

            const formData = new FormData(appointmentForm);

            const name =
                formData.get("name")?.trim();

            const phone =
                formData.get("phone")?.trim();

            const service =
                formData.get("service");

            const date =
                formData.get("date");

            const time =
                formData.get("time");

            const message =
                formData.get("message")?.trim();


            if (!name || !phone || !service || !date || !time) {
                return;
            }


            /* Formata a data */

            const dateObject = new Date(
                `${date}T12:00:00`
            );

            const formattedDate =
                dateObject.toLocaleDateString(
                    "pt-BR",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );


            /* Mensagem */

            const whatsappMessage = [
                "Olá, Zenit Odontologia! Tudo bem?",
                "",
                "Gostaria de solicitar um agendamento.",
                "",
                `Nome: ${name}`,
                `WhatsApp: ${phone}`,
                `Atendimento: ${service}`,
                `Data desejada: ${formattedDate}`,
                `Horário desejado: ${time}`,
                message
                    ? `Observação: ${message}`
                    : "",
                "",
                "Aguardo a confirmação do horário. Obrigado(a)!"
            ]
                .filter(Boolean)
                .join("\n");


            const whatsappUrl =
                `https://wa.me/5588992263720?text=${encodeURIComponent(
                    whatsappMessage
                )}`;


            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* =========================
       ANO DO FOOTER
    ========================= */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }

});