from http.server import BaseHTTPRequestHandler
import json
import platform
import urllib.parse


# ==========================================================
# CONFIGURACIÓN
# ==========================================================

PROJECT = "GrifoPYME"

VERSION = "1.0"


GITHUB_URL = (
    "https://github.com/xyvenqorix/GrifoPYME"
)


DOWNLOAD_URL = (
    "https://github.com/xyvenqorix/"
    "GrifoPYME/releases/download/"
    "GrifoPYME1.0v/GrifoPYME.exe"
)


WHATSAPP = "5356639178"


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

    texto = urllib.parse.quote(mensaje)

    return (
        "https://wa.me/"
        + WHATSAPP
        + "?text="
        + texto
    )


# ==========================================================
# IP
# ==========================================================

def get_client_ip(handler):

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
# HANDLER
# ==========================================================

class handler(BaseHTTPRequestHandler):


    def do_GET(self):

        client_ip = get_client_ip(self)


        response = {

            "online": True,

            "project": PROJECT,

            "version": VERSION,

            "runtime": "Python",

            "python":
                platform.python_version(),

            "platform":
                platform.system(),

            "architecture":
                platform.machine(),

            "client_ip":
                client_ip,


            "links": {

                "github":
                    GITHUB_URL,

                "download":
                    DOWNLOAD_URL,

                "whatsapp":
                    whatsapp(
                        "Licencia GrifoPYME",
                        "Consultar"
                    )

            },


            "licencias": {

                "24h":
                    whatsapp(
                        "24 horas",
                        "GRATIS"
                    ),

                "7dias":
                    whatsapp(
                        "7 días",
                        "150 CUP"
                    ),

                "30dias":
                    whatsapp(
                        "30 días",
                        "250 CUP"
                    ),

                "permanente":
                    whatsapp(
                        "Permanente",
                        "1000 CUP"
                    )

            },


            "git": {

                "clone":
                    f"git clone {GITHUB_URL}.git"

            }

        }


        self.send_json(
            response,
            200
        )


    # ======================================================
    # OPTIONS
    # ======================================================

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


    # ======================================================
    # JSON
    # ======================================================

    def send_json(
        self,
        data,
        status
    ):

        body = json.dumps(
            data,
            ensure_ascii=False
        ).encode("utf-8")


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
