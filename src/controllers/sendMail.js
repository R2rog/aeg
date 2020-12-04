//Controlador encargado de enviar los correos de la página
require("dotenv").config();

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;
const DOMPurify = require('dompurify');
const nodemailer = require('nodemailer');
//const Email = require('../public/js/smtp')
//const Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

let sendEmail = (req,res)=>{
  console.log(req.body);
    let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: EMAIL_ACCOUNT, // generated ethereal user
          pass: EMAIL_PASSWORD, // generated ethereal password
        },
      });
      
      let mailOptions = {
        from: req.body.email,
        to: EMAIL_ACCOUNT,
        subject: "Correo enviado desde el sitio web de Autoeléctrica Guevara",
        text: req.body.body
      }

      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          res.status(500).send(error.message);
        }else{
          console.log("Email enviado con éxito");
          res.status(200).jsonp(req.body);
        }
      });
      /* send mail with defined transport object
      let info = transporter.sendMail({
        from: req.body.email, // sender address
        to: EMAIL_ACCOUNT, // list of receivers
        subject: "Contacto desde el sitio web", // Subject line
        text: req.body.body, // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    /*Email.send({
        Host: 'smtp.mail.yahoo.com',
        Username: EMAIL_ACCOUNT,
        Password: EMAIL_PASSWORD,
        To:EMAIL_ACCOUNT,
        From: req.body.email,
        Subject:`${req.body.name} te ha enviado un correo a través del sitio de Autoeléctrica Guevara`,
        Body: req.body.body
    });*/
    /*.then((message)=>{
        alert('Tu mensaje ha sido enviado de manera exitosa');
    });*/
}
module.exports = {
    sendEmail: sendEmail
  }
  