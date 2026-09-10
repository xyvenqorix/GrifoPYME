const API = "/api";


// ==========================================================
// CARGAR API
// ==========================================================

async function cargarAPI() {

    const estado = document.getElementById("estado");
    const estadoTexto = document.getElementById("estadoTexto");
    const version = document.getElementById("version");

    try {

        const respuesta = await fetch(
            API + "?t=" + Date.now(),
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "HTTP " + respuesta.status
            );
        }

        const datos = await respuesta.json();

        console.log(
            "API GrifoPYME:",
            datos
        );


        // ==================================================
        // ESTADO
        // ==================================================

        if (estado) {
            estado.classList.add("online");
        }

        if (estadoTexto) {
            estadoTexto.textContent =
                "PYTHON CONECTADO";
        }


        // ==================================================
        // VERSIÓN
        // ==================================================

        if (version) {
            version.textContent =
                datos.version || "1.0";
        }


        // ==================================================
        // DESCARGA
        // ==================================================

        const descarga =
            datos.links &&
            datos.links.download;


        const botonesDescarga =
            document.querySelectorAll(
                "[data-download]"
            );


        botonesDescarga.forEach(
            boton => {

                if (descarga) {

                    boton.href =
                        descarga;

                    boton.target =
                        "_blank";

                    boton.removeAttribute(
                        "aria-disabled"
                    );

                }

            }
        );


        // ==================================================
        // GITHUB
        // ==================================================

        const github =
            datos.links &&
            datos.links.github;


        document.querySelectorAll(
            "[data-github]"
        ).forEach(
            boton => {

                if (github) {

                    boton.href =
                        github;

                    boton.target =
                        "_blank";

                }

            }
        );


        // ==================================================
        // WHATSAPP GENERAL
        // ==================================================

        const whatsapp =
            datos.links &&
            datos.links.whatsapp;


        document.querySelectorAll(
            "[data-whatsapp]"
        ).forEach(
            boton => {

                if (whatsapp) {

                    boton.href =
                        whatsapp;

                    boton.target =
                        "_blank";

                }

            }
        );


        // ==================================================
        // LICENCIAS
        // ==================================================

        if (datos.licencias) {

            Object.keys(
                datos.licencias
            ).forEach(
                tipo => {

                    const boton =
                        document.querySelector(
                            `[data-license="${tipo}"]`
                        );

                    if (
                        boton &&
                        datos.licencias[tipo]
                    ) {

                        boton.href =
                            datos.licencias[tipo];

                        boton.target =
                            "_blank";

                    }

                }
            );

        }


        // ==================================================
        // GIT
        // ==================================================

        const clone =
            document.getElementById(
                "cloneCommand"
            );


        if (
            clone &&
            datos.git &&
            datos.git.clone
        ) {

            clone.textContent =
                datos.git.clone;

        }


    }
    catch (error) {

        console.error(
            "Error API:",
            error
        );


        if (estado) {
            estado.classList.remove(
                "online"
            );
        }

        if (estadoTexto) {
            estadoTexto.textContent =
                "PYTHON SIN CONEXIÓN";
        }

    }

}


// ==========================================================
// COPIAR GIT
// ==========================================================

document
    .getElementById("copyButton")
    ?.addEventListener(
        "click",
        async function () {

            const comando =
                document.getElementById(
                    "cloneCommand"
                );

            if (!comando) {
                return;
            }

            try {

                await navigator.clipboard.writeText(
                    comando.textContent
                );

                this.textContent =
                    "Copiado";

                setTimeout(
                    () => {
                        this.textContent =
                            "Copiar";
                    },
                    1500
                );

            }
            catch {

                alert(
                    "No se pudo copiar."
                );

            }

        }
    );


// ==========================================================
// INICIAR
// ==========================================================

cargarAPI();
