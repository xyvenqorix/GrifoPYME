const API = "/api/app.py";

let datos = null;


// ==========================================================
// CARGAR PYTHON
// ==========================================================

async function cargarDatos() {

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
                "API no disponible"
            );
        }


        const datosAPI =
            await respuesta.json();


        datos = datosAPI;


        console.log(
            "GrifoPYME API:",
            datosAPI
        );


        // ==================================================
        // ESTADO
        // ==================================================

        const status =
            document.getElementById(
                "pythonStatus"
            );


        const terminalStatus =
            document.getElementById(
                "terminalStatus"
            );


        const terminalOnline =
            document.getElementById(
                "terminalOnline"
            );


        if (status) {
            status.textContent =
                "PYTHON CONECTADO";
        }


        if (terminalStatus) {
            terminalStatus.textContent =
                "ONLINE";
        }


        if (terminalOnline) {
            terminalOnline.textContent =
                "ONLINE";
        }


        // ==================================================
        // VERSIÓN
        // ==================================================

        const version =
            document.getElementById(
                "version"
            );


        if (version) {
            version.textContent =
                datosAPI.version || "1.0";
        }


        // ==================================================
        // DESCARGA
        // ==================================================

        const downloadButton =
            document.getElementById(
                "downloadButton"
            );


        const downloadButton2 =
            document.getElementById(
                "downloadButton2"
            );


        if (
            datosAPI.links &&
            datosAPI.links.download
        ) {

            if (downloadButton) {

                downloadButton.href =
                    datosAPI.links.download;

            }


            if (downloadButton2) {

                downloadButton2.href =
                    datosAPI.links.download;

            }

        }
        else {

            console.error(
                "Python no entregó links.download"
            );

        }


        // ==================================================
        // GITHUB
        // ==================================================

        const githubButton =
            document.getElementById(
                "githubButton"
            );


        const githubButton2 =
            document.getElementById(
                "githubButton2"
            );


        if (
            datosAPI.links &&
            datosAPI.links.github
        ) {

            if (githubButton) {

                githubButton.href =
                    datosAPI.links.github;

            }


            if (githubButton2) {

                githubButton2.href =
                    datosAPI.links.github;

            }

        }


        // ==================================================
        // GITHUB CLONE
        // ==================================================

        const cloneCommand =
            document.getElementById(
                "cloneCommand"
            );


        if (
            cloneCommand &&
            datosAPI.git &&
            datosAPI.git.clone
        ) {

            cloneCommand.textContent =
                datosAPI.git.clone;

        }


        // ==================================================
        // WHATSAPP
        // ==================================================

        const whatsappButton =
            document.getElementById(
                "whatsappButton"
            );


        if (
            whatsappButton &&
            datosAPI.links &&
            datosAPI.links.whatsapp
        ) {

            whatsappButton.href =
                datosAPI.links.whatsapp;

        }


    }

    catch (error) {

        console.error(
            "No se pudo conectar con Python:",
            error
        );


        const status =
            document.getElementById(
                "pythonStatus"
            );


        const terminalStatus =
            document.getElementById(
                "terminalStatus"
            );


        const terminalOnline =
            document.getElementById(
                "terminalOnline"
            );


        if (status) {

            status.textContent =
                "PYTHON SIN CONEXIÓN";

        }


        if (terminalStatus) {

            terminalStatus.textContent =
                "OFFLINE";

        }


        if (terminalOnline) {

            terminalOnline.textContent =
                "OFFLINE";

        }

    }

}


// ==========================================================
// AÑO
// ==========================================================

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}


// ==========================================================
// COPIAR GIT
// ==========================================================

document
    .getElementById(
        "copyButton"
    )
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

cargarDatos();
