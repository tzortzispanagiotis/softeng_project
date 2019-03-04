const recoveryController = {},
      database            = require('../database/connect') , 
      forget              = require('../database/forget') , 
      User                = require ('../database/user'),
      emailMiddlewares               = require("../middlewares/email_middlewares");

recoveryController.renderRecoverEmailAction = (req,res) => {
        res.render('recoverform')
}

recoveryController.createTokenAction = (req,res) => {
    const email = req.body.email
    User.findOne({where: {email: email}})
    .then(founduser => {
        if (founduser){
            var newtoken =  require('crypto').randomBytes(32).toString('hex');
            var updated  = {
                forgetToken : newtoken , 
                email : founduser.email,
            }
            forget.create(updated)
            req.token = newtoken
            emailMiddlewares.sendMail(req,res)
            res.json({success:true, msg:"email sent"})
        }
        else {
            res.status(406).json({success:false, msg:"email not sent"})
        }
    })
}

//       recoveryController.forgetPassword  = (req,res) => {
//           const email = req.body.email
//           User.findOne({where: {
//             email: email
//         }})
//           .then( founduser => {
//               if (founduser){
//             var newtoken =  require('crypto').randomBytes(32).toString('hex');
//             var updated  = {
//                 token : newtoken , 
//                 email : founduser.email
        
//             }
//             forget.create(updated)
//             "use strict";
//             const nodemailer = require("nodemailer");
            
//             // async..await is not allowed in global scope, must use a wrapper
            
//               // Generate test SMTP service account from ethereal.email
//               // Only needed if you don't have a real mail account for testing
//               //let account = await nodemailer.createTestAccount();
//               var auth = { mail: { host: 'smtp.zoho.com', port: 465, secure: true, auth: { user: 'donotreply@bar.com', pass: 'strongpassword' } };

//               // create reusable transporter object using the default SMTP transport
//                 transporter = nodemailer.createTransport({
//                 host: "smtp.ethereal.email",
//                 port: 587,
//                 secure: false, // true for 465, false for other ports
//                 auth: {
//                   user: account.user, // generated ethereal user
//                   pass: account.pass // generated ethereal password
//                 }
//               });
            
//               // setup email data with unicode symbols
//               let mailOptions = {
//                 from: '"Fred Foo 👻" <foo@example.com>', // sender address
//                 to: "bar@example.com, baz@example.com", // list of receivers
//                 subject: "Hello ✔", // Subject line
//                 text: "Hello world?", // plain text body
//                 html: "<b>Hello world?</b>" // html body
//               };
            
//               // send mail with defined transport object
//               let info = await transporter.sendMail(mailOptions)
            
//               console.log("Message sent: %s", info.messageId);
//               // Preview only available when sending through an Ethereal account
//               console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
//               // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//               // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//             }
            
//             main().catch(console.error); 

//         })
//         res.json({message: 'OK'})}
//       else {res.json({message:'No such user found'})}
//     })
// }

module.exports = recoveryController ;