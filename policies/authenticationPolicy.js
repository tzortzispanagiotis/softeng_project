const Joi = require('joi')

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
  }
}