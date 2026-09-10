import urllib.parse
import io
import base64

import qrcode


# ==========================================
# CONFIGURACIÓN
# ==========================================

WHATSAPP = "5356639178"


DESCARGA = (
    "https://github.com/"
    "xyvenqorix/"
    "GrifoPYME/"
    "releases/download/"
    "GrifoPYME1.0v/"
    "GrifoPYME.exe"
)


# ==========================================
# WHATSAPP
# ==========================================

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


# ==========================================
# QR
# ==========================================

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


# ==========================================
# DATOS DE LA WEB
# ==========================================

def obtener_datos():

    return {

        "descarga": DESCARGA,

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


# ==========================================
# VERCEL
# ==========================================

def handler(request):

    datos = obtener_datos()

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
        },
        "body": datos
    }


# ==========================================
# COMPATIBILIDAD
# ==========================================

def main(request):

    return handler(
        request
    )
