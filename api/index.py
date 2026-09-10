from http.server import BaseHTTPRequestHandler
import json
import platform
import urllib.parse


# ==========================================================
# GRIFOPYME - CONFIGURACIÓN
# ==========================================================

PROJECT = "GrifoPYME"
VERSION = "1.0"

GITHUB_URL = "https://github.com/xyvenqorix/GrifoPYME"

DOWNLOAD_URL = (
    "https://github.com/xyvenqorix/GrifoPYME/"
    "releases/download/GrifoPYME1.0v/GrifoPYME.exe"
)

WHATSAPP = "5356639178"


# ==========================================================
# WHATSAPP
# ==========================================================

def crear_whatsapp(plan, precio):

    mensaje = (
        "Hola, me interesa GrifoPYME.%0A%0A"
        "Licencia: " + plan + "%0A"
        "Precio: " + precio
    )

    return (
        "https://wa.me/"
        + WHATSAPP
        + "?text="
        + urllib.parse.quote(
            mensaje,
            safe=""
        )
    )


# ==========================================================
# IP
# ==========================================================

def obtener_ip(handler):

    forwarded = handler.headers.get(
        "X-Forwarded-For"
    )

    if forwarded:
        return forwarded.split(",")[0].strip()

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
# API
# ==========================================================

class handler(BaseHTTPRequestHandler):

    def do_GET(self):

        datos = {

            "online": True,

            "project": PROJECT,

            "version": VERSION,

            "runtime": "Python",

            "python": platform.python_version(),

            "platform": platform.system(),

            "architecture": platform.machine(),

            "client_ip": obtener_ip(self),

            "links": {

                "github": GITHUB_URL,

                "download": DOWNLOAD_URL,

                "whatsapp": crear_whatsapp(
                    "Consultar",
                    "Consultar"
                )

            },

            "licencias": {

                "24h": crear_whatsapp(
                    "24 horas",
                    "GRATIS"
                ),

                "7dias": crear_whatsapp(
                    "7 días",
                    "150 CUP"
                ),

                "30dias": crear_whatsapp(
                    "30 días",
                    "250 CUP"
                ),

                "permanente": crear_whatsapp(
                    "Permanente",
                    "1000 CUP"
                )

            },

            "git": {

                "clone":
                    "git clone "
                    + GITHUB_URL
                    + ".git"

            }

        }

        self.enviar_json(
            datos,
            200
        )


    def do_OPTIONS(self):

        self.send_response(204)

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


    def enviar_json(
        self,
        datos,
        estado
    ):

        cuerpo = json.dumps(
            datos,
            ensure_ascii=False
        ).encode("utf-8")

        self.send_response(
            estado
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
            str(len(cuerpo))
        )

        self.end_headers()

        self.wfile.write(
            cuerpo
        )
