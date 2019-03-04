var authController = {}

const db = require("../../database/connect"),
      bcrypt = require("bcryptjs"),
      jwt    = require("jsonwebtoken"),
      config = require("../../configurations/credentials");

var User = require('../../database/user'),
    invalidToken = require('../../database/invalidTokens');

authController.renderLoginAction = function (req, res) {
    res.render('login')
}

authController.login = function (req,res) {
    User.findOne({ where: { username: req.body.username } }).then(foundUser => {
        if (foundUser) {
            bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    if (foundUser.invalidUser==true){
                        res.status(400).json({success:false , 
                        message:'Account suspended'})
                    }
                    else {    
                        var token = jwt.sign({ id: foundUser.userId }, config.jwt_secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.status(200).send({ auth: true, token: token });
                    } 
                }
                else {            
                    res.status(401).send({ auth:false, token: null});
                }
          });
        } 
        else {
            res.status(401).send({ auth:false, token: null});
        }
        // res.redirect("/admin/login");
      });
    }

authController.signup = (req,res) => {
    User.findOne({ where: {username: req.body.username}})
    .then(foundUser => {
        if (foundUser) {
            res.status(400).json({signupSuccess : 'false',error : 'User already exists'})
        }
        else {
            newUser = {}
            newUser.username = req.body.username
            newUser.password = bcrypt.hashSync(req.body.password, 10)
            newUser.email = req.body.email
            newUser.role = req.body.role
            User.create(newUser)
            res.status(200).json({signupSuccess : 'true', error: null})
        }
    })
}

authController.logout = (req, res) => {
    let token = req.headers['x-observatory-auth'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (!token) {
          return res.json({
          success: false,
          message: 'Auth token is not supplied'
          })
        }
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
      
        if (token) {
            invalidToken.create({token:token})
            res.status(200).json({message:"OK"});
        }
}

module.exports = authController
