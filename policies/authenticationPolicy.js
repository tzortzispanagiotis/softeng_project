const Joi = require('joi'),
      jwt = require('jsonwebtoken'),
      config = require('../configurations/credentials'),
      database = require('../database/connect'),
      invalidTokens = database.invalidTokens;

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
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
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
          invalidTokens.findOne({where: {token: token}}).then(found => {
          if (found) {
            res.status(403).json({success : false, message: "invalid token"})
          }
          else {
            jwt.verify(token, config.jwt_secret, (err, decoded) => {
              if (err) {
                return res.status(403).json({
                  success: false,
                  message: 'Token is not valid'
                });
              } else {
                req.decoded = decoded;
                next();
              }
            });
          }
        })}
        else {
          return res.status(403).json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
    }
}