const API_URL = "/api/app.py";

let datosPython = null;


// ==========================================================
// CONECTAR CON PYTHON
// ==========================================================

async function conectarPython()
{
    try
    {
        const respuesta = await fetch(
            API_URL,
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if(!respuesta.ok)
        {
            throw new Error(
                "Python no respondió"
            );
        }

        const datos =
            await respuesta.json();

        datosPython = datos;


        // ------------------------------------------
        // ESTADO
        // ------------------------------------------

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


        // ------------------------------------------
        // VERSIÓN
        // ------------------------------------------

        document.getElementById(
            "version"
        ).textContent =
            datos.version;


        // ------------------------------------------
        // QR
        // ------------------------------------------

        if(datos.qr)
        {
            document.getElementById(
                "qrImage"
            ).src =
                datos.qr;
        }

    }
    catch(error)
    {
        console.error(error);

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
    }
}



// ==========================================================
// DESCARGAR
// ==========================================================

function descargar()
{
    if(
        !datosPython ||
        !datosPython.links ||
        !datosPython.links.download
    )
    {
        alert(
            "No se pudo obtener el enlace de descarga."
        );

        return;
    }


    /*
        IMPORTANTE:

        No usamos href="#".

        No hacemos scroll.

        Vamos directamente al enlace que
        entregó Python.
    */

    window.location.href =
        datosPython.links.download;
}


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
// WHATSAPP
// ==========================================================

function comprar(tipo)
{
    if(
        !datosPython ||
        !datosPython.links ||
        !datosPython.links.licencias
    )
    {
        alert(
            "Python todavía no está conectado."
        );

        return;
    }


    const enlace =
        datosPython.links.licencias[tipo];


    if(enlace)
    {
        window.location.href =
            enlace;
    }
}


document.getElementById(
    "buy24"
).addEventListener(
    "click",
    function()
    {
        comprar("24h");
    }
);


document.getElementById(
    "buy7"
).addEventListener(
    "click",
    function()
    {
        comprar("7dias");
    }
);


document.getElementById(
    "buy30"
).addEventListener(
    "click",
    function()
    {
        comprar("30dias");
    }
);


document.getElementById(
    "buyPermanent"
).addEventListener(
    "click",
    function()
    {
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
    function()
    {
        if(
            datosPython &&
            datosPython.links &&
            datosPython.links.whatsapp
        )
        {
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
    function()
    {
        if(window.scrollY > 400)
        {
            topButton.classList.add(
                "visible"
            );
        }
        else
        {
            topButton.classList.remove(
                "visible"
            );
        }
    }
);


topButton.addEventListener(
    "click",
    function()
    {
        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );
    }
);



// ==========================================================
// INICIAR
// ==========================================================

conectarPython();
