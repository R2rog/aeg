require("dotenv").config();

const MY_VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const request = require('request');
const bodyParser = require('body-parser');
const responses = require('./responses');

let test = (req, res) => {
  return res.send("Hello again!")
}


let postWebhook = (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function (entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {

        handlePostback(sender_psid, webhook_event.postback);
      }

    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// Accepts GET requests at the /webhook endpoint
let getWebhook = (req, res) => {
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === MY_VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      console.log("token: ", token);
      console.log("MY_VERIFY_TOKEN: ", MY_VERIFY_TOKEN);
      res.sendStatus(403);
    }
  }
};

//NLP functions
function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  // Checks if the message contains text
  if (received_message.text) {
    textMessage = received_message.text;
    ts = new Date();
    console.log(ts)
    date = ts.toDateString().slice(0,3);
    time = ts.toLocaleTimeString();
    subStr1 = 'gracias';
    subStr2 = 'Gracias';
    if (date != "Dom" && time > '18:30:00' && time < '8:30:00') {
      response = {
        "text": "Hola, por el momento no podemos atenderte pero deja tu mensaje y nos comunicaremos contigo dentro de nuestros horarios: Lun-Vie de 8:30 a 18:30 y Sab de 8:30 a 14:30"
      }
    } else {
      let phoneNumber = firstTrait(received_message.nlp, 'wit$phone_number:phone_number');
      if (textMessage.includes(subStr1) || textMessage.includes(subStr2)) {
        response = {
          "text": "A usted por elegirnos"
        };
      } else if (phonenumber(textMessage)) {
        response = {
          "text": "Pasamos tu información a nuestro personal que se contactará contigo a la brevedad"
        };
      }
      else {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = responses.canal;
      }
    }
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "text": "Hemos recibido su mensajen en breve nuestro equipo se comunicará contigo"
    }
  }
  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  //Handles all the paybacks
  switch (payload) {
    case 'comenzar':
      response = responses.comenzar;
      break;
    /*
    case 'refaccionaria':
      response = responses.refaccionaria;
      break;
    case 'horario':
      response = responses.horario
      break;
    case 'ref_loc':
      response = responses.ref_loc;
      break;
    case 'existencia':
      response = responses.existencia;
      break;
    case 'cita':
      response = responses.cita;
      break;
    case 'taller':
      response = responses.taller;
      break;
    case 'domicilio':
      response = responses.domicilio;
      break;
    case 'refacciones':
      response = responses.refacciones;
      break;
    case 'ser_aut':
      response = responses.ser_aut;
      break;
    case 'seguimiento':
      response = responses.seguimiento;
      break;*/
    case 'telefono':
      response = responses.telefono;
      break
    case 'messenger':
      response = responses.messenger;
      break
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  console.log(request_body);
  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v7.0/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

//Phone validation
function phonenumber(textMessage) {
  console.log(textMessage);
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (textMessage.match(phoneno)) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = {
  test: test,
  getWebhook: getWebhook,
  postWebhook: postWebhook
}
