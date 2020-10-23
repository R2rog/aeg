//This file contains all the available responses proportioned by the bot.

responseList = {
    'comenzar': {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Muchas gracias por comunicarse con nosotros. Por favor elija alguno de nuestros servicios para continuar :)",
                    "subtitle": "Seleccione una opción",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Servicio de refacciones",
                            "payload": "refaccionaria",
                        },
                        {
                            "type": "postback",
                            "title": "Taller automovilístico",
                            "payload": "taller",
                        },
                        {
                            "type": "postback",
                            "title": "Servicio a domicilio",
                            "payload": "domicilio"
                        },
                    ],
                }]
            }
        }
    },
    "refaccionaria": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Si desea información acerca de alguna de refacción en específico no dude en llamarnos.",
                    "subtitle": "Por favor seleccione alguna de las opciones",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Horario",
                            "payload": "horario",
                        },
                        {
                            "type": "postback",
                            "title": "Locaciones",
                            "payload": "ref_loc",
                        },
                        {
                            "type": "postback",
                            "title": "Refacciones",
                            "payload": "existencia",
                        }
                    ],
                }]
            }
        }
    },
    "horario": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Nuestros horarios son lunes a viernes de 8:30 a 18:30 y sábados de 8:30 a 14:30",
                "buttons": [
                    {
                        "type": "phone_number",
                        "title": "Llamar",
                        "payload": "+5217717131011"
                    }
                ]
            }
        }
    },
    "ref_loc": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Contamos con 2 refaccionarias dentro de Pachuca de Soto",
                "buttons": [
                    {
                        "type": "web_url",
                        "url": "https://goo.gl/maps/awXvB4r1kV3Co9e4A",
                        "title": "Tienda Vicente Segura",
                        "webview_height_ratio": "tall"
                    },
                    {
                        "type": "web_url",
                        "url": "https://goo.gl/maps/KGuJ8g2nrPLYNqQ69",
                        "title": "Tienda Av.Madero",
                        "webview_height_ratio": "tall"
                    }
                ]
            }
        }
    },
    "existencia": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Envíe una foto o descripción de la pieza que busca o llame para ser atendido de manera inmediata",
                "buttons": [
                    {
                        "type": "phone_number",
                        "title": "Llamar",
                        "payload": "+5217717131011"
                    }
                ]
            }
        }
    },
    "taller": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Nuestro taller se encuentra ubicado en la calle de Vicente Segura 210 en Pachuca de Soto, Hgo ",
                "buttons": [
                    {
                        "type": "web_url",
                        "url": "https://goo.gl/maps/awXvB4r1kV3Co9e4A",
                        "title": "Como llegar",
                        "webview_height_ratio": "tall"
                    },
                    {
                        "type": "postback",
                        "title": "Horario",
                        "payload": "horario",
                    },
                    {
                        "type": "postback",
                        "title": "Agendar cita",
                        "payload": "cita",
                    }
                ]
            }
        }
    },
    "cita": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Si desea agendar una cita comuníquese al siguiente número",
                "buttons": [
                    {
                        "type": "phone_number",
                        "title": "Llamar",
                        "payload": "+5217717131011"
                    }
                ]
            }
        }
    },
    "domicilio": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Muchas gracias por comunicarse con nosotros.",
                    "subtitle": "Por favor seleccione alguno de nuestros servicios",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Refacciones",
                            "payload": "refacciones",
                        },
                        {
                            "type": "postback",
                            "title": "Servicio automovilístico",
                            "payload": "ser_aut",
                        }
                    ],
                }]
            }
        }
    },
    "refacciones": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Seleccione el tipo de refacción que desea: ",
                    "subtitle": "Servicios de refacciones",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Cambio de batería",
                            "payload": "seguimiento",
                        },
                        {
                            "type": "postback",
                            "title": "Cambio de focos",
                            "payload": "seguimiento",
                        },
                        {
                            "type": "postback",
                            "title": "Cambio de limpiaparabrisas",
                            "payload": "seguimiento",
                        }
                    ],
                }]
            }
        }
    },
    "ser_aut": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Seleccione el tipo de refacción que desea: ",
                    "subtitle": "Servicios de refacciones",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Cambio de aceite",
                            "payload": "seguimiento",
                        },
                        {
                            "type": "postback",
                            "title": "Afinación",
                            "payload": "seguimiento",
                        }
                    ],
                }]
            }
        }
    },
    "seguimiento":{
        "text": "Por favor proporcionenos los siguientes datos y en breve nos pondremos en conacto con usted: modelo de su auto, dirección del servicio, teléfono"
    }
}

module.exports = responseList