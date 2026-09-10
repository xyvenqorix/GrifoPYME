const API = "/api/data";

const heroDownload =
    document.getElementById("heroDownload");

const downloadButton =
    document.getElementById("downloadButton");

const buy24 =
    document.getElementById("buy24");

const buy7 =
    document.getElementById("buy7");

const buy30 =
    document.getElementById("buy30");

const buyPermanent =
    document.getElementById("buyPermanent");

const qrImage =
    document.getElementById("qrImage");

const qrWhatsapp =
    document.getElementById("qrWhatsapp");

const topButton =
    document.getElementById("topButton");


async function cargarDatos()
{
    try
    {
        const respuesta =
            await fetch(API);

        if(!respuesta.ok)
        {
            throw new Error(
                "No se pudo conectar con Python"
            );
        }

        const datos =
            await respuesta.json();


        /*
            DESCARGA
        */

        heroDownload.href =
            datos.descarga;

        downloadButton.href =
            datos.descarga;


        /*
            LICENCIAS
        */

        buy24.href =
            datos.licencias["24h"];

        buy7.href =
            datos.licencias["7dias"];

        buy30.href =
            datos.licencias["30dias"];

        buyPermanent.href =
            datos.licencias["permanente"];


        /*
            QR
        */

        qrImage.src =
            datos.qr;

        qrWhatsapp.href =
            datos.whatsapp;


    }
    catch(error)
    {
        console.error(
            error
        );

        document.body.classList.add(
            "api-error"
        );
    }
}


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


/*
    Animación de las tarjetas
*/

const tarjetas =
    document.querySelectorAll(
        ".card"
    );


const observador =
    new IntersectionObserver(
        function(elementos)
        {
            elementos.forEach(
                function(elemento)
                {
                    if(
                        elemento.isIntersecting
                    )
                    {
                        elemento.target.style.opacity =
                            "1";

                        elemento.target.style.transform =
                            "translateY(0)";
                    }
                }
            );
        },
        {
            threshold: 0.15
        }
    );


tarjetas.forEach(
    function(tarjeta)
    {
        observador.observe(
            tarjeta
        );
    }
);


/*
    Cargar todo desde Python
*/

cargarDatos();
