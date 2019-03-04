const nodemailer = require("nodemailer");
const Credentials = require("../configurations/credentials.js");


var email = {}


email.sendMail = function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true, // use SSL
        auth: {
            user: Credentials.email.username,
            pass: Credentials.email.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    link = 'https://'+Credentials.host+':'+Credentials.port+"/forgottenpassword?token="+req.token
    const mailOptions = {
        from: Credentials.email.username, // sender address
        to: req.body.email, // list of receivers
        subject: 'Recover Password', // Subject line
        html: `<div>
            <label>Πατήστε στον σύνδεσμο για να γίνει επαναφορά του κωδικού πρόσβασης:</label>
            <a href="${link}">${link}</a>
        </div>` // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err)
            res.redirect("/");
        } 
        else {
            console.log(info);
            next();
        }
    });
}

module.exports = email;