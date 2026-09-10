from http.server import BaseHTTPRequestHandler
import json
import urllib.parse
import io
import base64

import qrcode


# ==========================================================
# CONFIGURACIÓN
# ==========================================================

PROJECT = "GrifoPYME"

VERSION = "1.0"

WHATSAPP = "5356639178"


DOWNLOAD_URL = (
    "https://github.com/"
    "xyvenqorix/"
    "GrifoPYME/"
    "releases/download/"
    "GrifoPYME1.0v/"
    "GrifoPYME.exe"
)


# ==========================================================
# WHATSAPP
# ==========================================================

def whatsapp(plan, precio):

    mensaje = (
        "Hola, me interesa comprar "
        "una licencia de GrifoPYME.\n\n"
        "Licencia: "
        + plan
        + "\n"
        "Precio: "
        + precio
    )

    texto = urllib.parse.quote(
        mensaje
    )

    return (
        "https://wa.me/"
        + WHATSAPP
        + "?text="
        + texto
    )


# ==========================================================
# QR
# ==========================================================

def generar_qr():

    enlace = whatsapp(
        "Licencia GrifoPYME",
        "Consultar"
    )

    qr = qrcode.QRCode(
        version=1,
        box_size=8,
        border=3
    )

    qr.add_data(enlace)

    qr.make(
        fit=True
    )

    imagen = qr.make_image()

    memoria = io.BytesIO()

    imagen.save(
        memoria,
        format="PNG"
    )

    memoria.seek(0)

    datos = base64.b64encode(
        memoria.read()
    ).decode(
        "utf-8"
    )

    return (
        "data:image/png;base64,"
        + datos
    )


# ==========================================================
# DATOS
# ==========================================================

def obtener_datos():

    return {

        "project": PROJECT,

        "version": VERSION,

        "descarga": DOWNLOAD_URL,

        "whatsapp": whatsapp(
            "Licencia GrifoPYME",
            "Consultar"
        ),

        "qr": generar_qr(),

        "licencias": {

            "24h": whatsapp(
                "24 horas",
                "GRATIS"
            ),

            "7dias": whatsapp(
                "7 días",
                "150 CUP"
            ),

            "30dias": whatsapp(
                "30 días",
                "250 CUP"
            ),

            "permanente": whatsapp(
                "Permanente",
                "1000 CUP"
            )

        }

    }


# ==========================================================
# VERCEL
# ==========================================================

class handler(BaseHTTPRequestHandler):

    def do_GET(self):

        try:

            datos = obtener_datos()

            respuesta = json.dumps(
                datos,
                ensure_ascii=False
            ).encode(
                "utf-8"
            )


            self.send_response(200)

            self.send_header(
                "Content-Type",
                "application/json; charset=utf-8"
            )

            self.send_header(
                "Cache-Control",
                "no-store, no-cache, must-revalidate"
            )

            self.send_header(
                "Access-Control-Allow-Origin",
                "*"
            )

            self.end_headers()

            self.wfile.write(
                respuesta
            )


        except Exception as error:

            respuesta = json.dumps(
                {
                    "error": str(error)
                }
            ).encode(
                "utf-8"
            )

            self.send_response(500)

            self.send_header(
                "Content-Type",
                "application/json; charset=utf-8"
            )

            self.end_headers()

            self.wfile.write(
                respuesta
            )
