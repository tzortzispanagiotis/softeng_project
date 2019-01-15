var authController = {}

const db = require("../../database/connect"),
      bcrypt = require("bcryptjs"),
      jwt    = require("jsonwebtoken"),
      config = require("../../configurations/credentials");

var User = db.User;

authController.renderLoginAction = function (req, res) {
    res.render('login')
}

authController.login = function (req,res) {
    User.findOne({ where: { username: req.body.username } }).then(foundUser => {
        if (foundUser) {
            bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                //   foundUser.update({
                //     last_login: Date.now()
                //   });
                    var token = jwt.sign({ id: foundUser.userId }, config.jwt_secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.status(200).send({ auth: true, token: token });
                    
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
    res.status(200).send({ auth: false, token: null });

}

module.exports = authController
