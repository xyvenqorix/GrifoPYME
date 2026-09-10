const API_URL = "/api/app.py";

let datosPython = null;


// ==========================================================
// CONECTAR CON PYTHON
// ==========================================================

async function conectarPython() {

    try {

        const respuesta = await fetch(
            API_URL + "?t=" + Date.now(),
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!respuesta.ok) {
            throw new Error(
                "Python respondió con error " +
                respuesta.status
            );
        }

        const datos = await respuesta.json();

        datosPython = datos;


        // ==================================================
        // ESTADO
        // ==================================================

        document.getElementById(
            "pythonStatus"
        ).textContent = "PYTHON CONECTADO";


        document.getElementById(
            "terminalStatus"
        ).textContent = "ONLINE";


        document.getElementById(
            "terminalOnline"
        ).textContent = "ONLINE";


        // ==================================================
        // VERSIÓN
        // ==================================================

        document.getElementById(
            "version"
        ).textContent =
            datos.version || "1.0";


        // ==================================================
        // QR
        // ==================================================

        if (datos.qr) {

            document.getElementById(
                "qrImage"
            ).src = datos.qr;

        }

    }
    catch (error) {

        console.error(
            "Error conectando con Python:",
            error
        );


        document.getElementById(
            "pythonStatus"
        ).textContent =
            "PYTHON SIN CONEXIÓN";


        document.getElementById(
            "terminalStatus"
        ).textContent =
            "OFFLINE";


        document.getElementById(
            "terminalOnline"
        ).textContent =
            "OFFLINE";


        document.getElementById(
            "version"
        ).textContent =
            "—";

    }

}


// ==========================================================
// DESCARGAR
// ==========================================================

function descargar() {

    if (
        !datosPython ||
        !datosPython.descarga
    ) {

        alert(
            "No se pudo obtener el enlace de descarga."
        );

        return;

    }


    // IMPORTANTE:
    // No usamos #descargar.
    // No hacemos scroll.
    // Vamos directamente al EXE.

    window.location.assign(
        datosPython.descarga
    );

}


// ==========================================================
// BOTONES DE DESCARGA
// ==========================================================

document.getElementById(
    "downloadBtn"
).addEventListener(
    "click",
    descargar
);


document.getElementById(
    "downloadBottom"
).addEventListener(
    "click",
    descargar
);


// ==========================================================
// WHATSAPP / LICENCIAS
// ==========================================================

function comprar(tipo) {

    if (
        !datosPython ||
        !datosPython.licencias
    ) {

        alert(
            "Python todavía no está conectado."
        );

        return;

    }


    const enlace =
        datosPython.licencias[tipo];


    if (!enlace) {

        alert(
            "No se encontró el enlace de esta licencia."
        );

        return;

    }


    window.location.assign(
        enlace
    );

}


// ==========================================================
// BOTONES DE LICENCIA
// ==========================================================

document.getElementById(
    "buy24"
).addEventListener(
    "click",
    function () {
        comprar("24h");
    }
);


document.getElementById(
    "buy7"
).addEventListener(
    "click",
    function () {
        comprar("7dias");
    }
);


document.getElementById(
    "buy30"
).addEventListener(
    "click",
    function () {
        comprar("30dias");
    }
);


document.getElementById(
    "buyPermanent"
).addEventListener(
    "click",
    function () {
        comprar("permanente");
    }
);


// ==========================================================
// QR → WHATSAPP
// ==========================================================

document.getElementById(
    "qrButton"
).addEventListener(
    "click",
    function () {

        if (
            datosPython &&
            datosPython.whatsapp
        ) {

            window.location.assign(
                datosPython.whatsapp
            );

        }
        else {

            alert(
                "Python todavía no está conectado."
            );

        }

    }
);


// ==========================================================
// BOTÓN ARRIBA
// ==========================================================

const topButton =
    document.getElementById(
        "topButton"
    );


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 400) {

            topButton.classList.add(
                "visible"
            );

        }
        else {

            topButton.classList.remove(
                "visible"
            );

        }

    }
);


topButton.addEventListener(
    "click",
    function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================================
// INICIAR
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        conectarPython();

    }
);
