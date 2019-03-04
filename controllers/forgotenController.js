const forgotenController = {},
      database            = require('../database/connect') , 
      forget              = require('../database/forget') , 
      User                = require ('../database/user'),
      bcrypt              = require('bcryptjs');


forgotenController.renderChangePasswordAction = (req,res) => {
  const token = req.query.token
  //console.log(token)
    forget.findOne({where: {
      forgetToken: token
    }})
    .then( founduser => {
      if (founduser) {
        res.render('changepassword')
      }
      else {
        res.status(400).json({error: "token invalid"})
      }
    })
}

forgotenController.changePassword  = (req,res) => {
    const token = req.body.token
    console.log(token)
    forget.findOne({where: {
      forgetToken: token
    }})
    .then( founduser => {
      if (founduser){
        var myemail = founduser.email
        
        User.findOne({where: {
            email: myemail
        }})
        .then(found  => {
          if (found) {
            var updated = {
              username: found.username,
              password: bcrypt.hashSync(req.body.password,10),
              email:  found.email,
              role: found.role,
              reportCount: found.reportCount,
              invalidUser: found.invalidUser
            }
            
            forget.destroy({where:{forgetToken:token}})
            found.update(updated ,{fields: ['username','password','email','role', 'reportCount','invalidUser']})
            res.json({
                userId: found.userId,
                username: found.username,
                password: updated.password,
                email: found.email,
                role: 'USER',     
                })
          }
          else {
            res.status(400).json({error: "no such user"})
          }
        })
      }
      else {
        res.json({message:'No such token found'})
      }
  })
}

module.exports = forgotenController ;