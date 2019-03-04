const Joi = require('joi'),
      jwt = require('jsonwebtoken'),
      config = require('../configurations/credentials'),
      database = require('../database/connect'),
      invalidTokens = require('../database/invalidTokens');

module.exports = {
    login (req, res, next){
    const schema = {
        username: Joi.string().min(4).max(20).required(),
        password: Joi.string().required()
    };
    const { error } = Joi.validate(req.body, schema);
    if(error) {
        switch(error.details[0].context.key){
        case 'username':
            res.status(400).json({ error: "You must provide a valid username"});
            break;
        case 'password':
            res.status(400).json({ error: "Incorrent password"});
            break;
        default:
            res.status(400).json({ error: "Incorrect Input "});
            break;
        }
    } 
    else {
        next();
    }
    },
    checkToken (req, res, next) {
        //console.log(req.headers)
        let token = req.headers['x-observatory-auth'] ||  req.headers['authorization']; // Express headers are auto converted to lowercase
        if (!token) {
          res.status(401).json({
          success: false,
          message: 'Auth token is not supplied'
          })
          return
        }
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
      
        if (token) {
          invalidTokens.findOne({where: {token: token}}).then(found => {
          if (found) {
            res.status(401).json({success : false, message: "invalid token"})
            return
          }
          else {
            jwt.verify(token, config.jwt_secret, (err, decoded) => {
              if (err) {
                res.status(401).json({
                  success: false,
                  message: 'Token is not valid'
                })
                return
              } 
              else {
                req.decoded = decoded;
                console.log("VERIFIED!")
                next();
              }
            });
          }
        })}
        else {
          res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
          })
          return
        }
    }
}