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
                "Python respondió con HTTP " +
                respuesta.status
            );
        }


        const datos =
            await respuesta.json();


        console.log(
            "Respuesta de Python:",
            datos
        );


        datosPython = datos;


        // ==================================================
        // ESTADO
        // ==================================================

        document.getElementById(
            "pythonStatus"
        ).textContent =
            "PYTHON CONECTADO";


        document.getElementById(
            "terminalStatus"
        ).textContent =
            "ONLINE";


        document.getElementById(
            "terminalOnline"
        ).textContent =
            "ONLINE";


        // ==================================================
        // VERSIÓN
        // ==================================================

        document.getElementById(
            "version"
        ).textContent =
            datos.version || "1.0";


    }
    catch (error) {

        console.error(
            "Error conectando con Python:",
            error
        );


        datosPython = null;


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
// DESCARGAR GRIFOPYME
// ==========================================================

function descargar() {

    console.log(
        "Datos disponibles:",
        datosPython
    );


    if (!datosPython) {

        alert(
            "Python todavía no está conectado."
        );

        return;

    }


    if (
        !datosPython.links
    ) {

        alert(
            "Python no devolvió los enlaces."
        );

        return;

    }


    if (
        !datosPython.links.download
    ) {

        alert(
            "Python no devolvió el enlace de descarga."
        );

        console.error(
            "links.download no existe:",
            datosPython
        );

        return;

    }


    const enlace =
        datosPython.links.download;


    console.log(
        "Descargando:",
        enlace
    );


    // Va DIRECTAMENTE al enlace del EXE.
    window.location.href =
        enlace;

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
// COMPRAR LICENCIA
// ==========================================================

function comprar(tipo) {

    if (!datosPython) {

        alert(
            "Python todavía no está conectado."
        );

        return;

    }


    if (
        !datosPython.licencias
    ) {

        alert(
            "No se pudieron obtener las licencias."
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


    window.location.href =
        enlace;

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
// WHATSAPP
// ==========================================================

document.getElementById(
    "qrButton"
)?.addEventListener(
    "click",
    function () {

        if (
            datosPython &&
            datosPython.links &&
            datosPython.links.whatsapp
        ) {

            window.location.href =
                datosPython.links.whatsapp;

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

        if (
            window.scrollY > 400
        ) {

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
