const chatbotController = require("../controllers/chatbotController");
const sendMail = require("../controllers/sendMail");
const nodemailer = require('nodemailer');
const { getMaxListeners } = require("gulp");
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;

express = require("express");
let router = express.Router();

let initWebRoutes = (app)=>{
    /*router.get("/",(req,res)=>{
        res.sendFile("../public/index.html");
    });*/

    router.get("/webhook", chatbotController.getWebhook);

    router.post("/webhook", chatbotController.postWebhook);

    router.post("/sendMail",(req,res)=>{
        console.log(req.body);
        let transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: EMAIL_ACCOUNT, // generated ethereal user
              pass: EMAIL_PASSWORD, // generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
        });
          
          let mailOptions = {
            from: req.body.email,
            to: 'sirr2rog@gmail.com',
            subject: "Correo enviado desde el sitio web de Autoeléctrica Guevara",
            text: req.body.mensaje
          };
    
          transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
              res.status(500).send(error.message);
            }else{
              console.log("Email enviado con éxito");
              res.status(200).jsonp(req.body);
            }
          });
    });
        
    return app.use("/",router);
};

module.exports = initWebRoutes;

