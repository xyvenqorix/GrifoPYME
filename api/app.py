from http.server import BaseHTTPRequestHandler
import json
import platform
import urllib.parse
import io
import base64

import qrcode


# ==========================================================
# CONFIGURACIÓN
# ==========================================================

PROJECT = "GrifoPYME"

VERSION = "1.0"


GITHUB_URL = (
    "https://github.com/"
    "xyvenqorix/GrifoPYME"
)


DOWNLOAD_URL = (
    "https://github.com/"
    "xyvenqorix/"
    "GrifoPYME/"
    "releases/download/"
    "GrifoPYME1.0v/"
    "GrifoPYME.exe"
)


WHATSAPP = "5356639178"


# ==========================================================
# OBTENER IP
# ==========================================================

def get_client_ip(handler):

    forwarded = handler.headers.get(
        "X-Forwarded-For"
    )

    if forwarded:

        return forwarded.split(
            ","
        )[0].strip()


    real_ip = handler.headers.get(
        "X-Real-IP"
    )

    if real_ip:

        return real_ip.strip()


    try:

        return handler.client_address[0]

    except Exception:

        return "unknown"


# ==========================================================
# CREAR WHATSAPP
# ==========================================================

def crear_whatsapp(
    licencia,
    precio
):

    mensaje = (
        "Hola, me interesa una licencia "
        "de GrifoPYME.\n\n"
        "Licencia: "
        + licencia
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
# CREAR QR
# ==========================================================

def crear_qr():

    enlace = crear_whatsapp(
        "Consultar licencia",
        "Consultar"
    )


    qr = qrcode.QRCode(
        version=1,
        box_size=8,
        border=3
    )


    qr.add_data(
        enlace
    )


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
# HANDLER
# ==========================================================

class handler(
    BaseHTTPRequestHandler
):


    def do_GET(self):

        client_ip = get_client_ip(
            self
        )


        whatsapp = crear_whatsapp(
            "Consultar licencia",
            "Consultar"
        )


        response = {

            "online": True,

            "project":
                PROJECT,

            "version":
                VERSION,

            "runtime":
                "Python",

            "python":
                platform.python_version(),

            "platform":
                platform.system(),

            "architecture":
                platform.machine(),

            "client_ip":
                client_ip,


            "qr":
                crear_qr(),


            "links": {

                "github":
                    GITHUB_URL,

                "download":
                    DOWNLOAD_URL,

                "whatsapp":
                    whatsapp,


                "licencias": {

                    "24h":
                        crear_whatsapp(
                            "24 horas",
                            "GRATIS"
                        ),

                    "7dias":
                        crear_whatsapp(
                            "7 días",
                            "150 CUP"
                        ),

                    "30dias":
                        crear_whatsapp(
                            "30 días",
                            "250 CUP"
                        ),

                    "permanente":
                        crear_whatsapp(
                            "Permanente",
                            "1000 CUP"
                        )

                }

            },


            "git": {

                "clone":
                    "git clone "
                    + GITHUB_URL
                    + ".git"

            }

        }


        self.send_json(
            response,
            200
        )


    def do_OPTIONS(self):

        self.send_response(
            204
        )


        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )


        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        )


        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )


        self.end_headers()


    def send_json(
        self,
        data,
        status
    ):

        body = json.dumps(
            data,
            ensure_ascii=False
        ).encode(
            "utf-8"
        )


        self.send_response(
            status
        )


        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )


        self.send_header(
            "Cache-Control",
            "no-store, no-cache, must-revalidate"
        )


        self.send_header(
            "Pragma",
            "no-cache"
        )


        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )


        self.send_header(
            "Content-Length",
            str(len(body))
        )


        self.end_headers()


        self.wfile.write(
            body
        )
