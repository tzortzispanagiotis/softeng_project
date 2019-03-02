const forgotenController = {},
      database            = require('../database/connect') , 
      forget              = require('../database/forget') , 
      User                = require ('../database/user')


      forgotenController.forgetPassword  = (req,res) => {
          const token = req.query.token
          forget.findOne({where: {
            token: token
        }})
          .then( founduser => {
              if (founduser){
            var myemail = founduser.email
            var updated = req.body.password
            User.findOne({where: {
                email: myemail
            }}).then(found  => {
                found.update(updated ,{fields: ['name','description','category','productTags']})
                res.json({
                    userId: found.userId,
                    username: found.username,
                    password: updated.password,
                    email: found.email,
                    role: 'USER',
                    
                })
            

        })
        res.json({message: 'OK'})}
      else {res.json({message:'No such user found'})}
    })
}

module.exports = forgotenController ;