const indexController = {}
const Shop = require('../database/shops'),
      Product = require('../database/products'),
      jwt     = require('jsonwebtoken'),
      config  = require('../configurations/credentials'),
      sequelize = require('../database/connect'),
      User   =require('../database/user'),
      bcrypt              = require('bcryptjs');

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

indexController.renderIndexAction =  (req, res) => {
    res.render('index')
}

indexController.renderLoginAction = (req, res) => {
    res.render('loginregister')
}

indexController.renderContactAction = (req,res) => {
    res.render('contact')
}

indexController.renderProfileAction = (req,res) => {
    var token = req.query.token
    if (!token) res.status(400).json({error:"UNAUTHENTICATED"})
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: 'Token is not valid'
          })
          return
        } 
        else {
          user_creds = decoded;
        }
      });
    var prices = []  
    sequelize.query('SELECT * FROM `prices` AS `prices` WHERE `prices`.`userId` = '+user_creds.id+';', { type: sequelize.QueryTypes.SELECT})
    .then(results => {
        var prices = []
        for (i = 0; i < results.length; i++) {
            prices.push(results[i])
        }
        var self = {}
        User.findOne({where:{userId:user_creds.id}}).then(foundUser => {
            var self = {
                name: foundUser.username,
                email: foundUser.email,
                role: foundUser.role,
                reportCount:foundUser.reportCount
            }    
            // console.log(prices)
            // console.log(self)
        res.render('profile', {prices: prices, self: self})
        })
    })
}

indexController.renderSearchResultsAction = (req, res) => {
  res.render('filters');
}

indexController.renderInsertShopAction = (req,res) => {
    Shop.findAll().then(foundShops => {
        var tags = foundShops.map(shop => {
            return shop.shopTags.split(',')[0]
        })
        tags = tags.filter( onlyUnique );
        res.render('insertshop', {tags})
    })
}

indexController.renderInsertProductAction = (req,res) => {
    Product.findAll().then(foundProducts => {
        var categories = foundProducts.map(product => {
            return product.category
        })
        categories = categories.filter( onlyUnique);
        res.render('insertproduct', {categories})
    })   
}

indexController.renderAboutUsAction = (req,res) => {
    res.render('about')
}

indexController.renderInsertPriceAction = (req,res) => {
    res.render('insertprice')
}

indexController.changeMailAction = (req,res) => {
    var oldMail = req.body.oldMail

    if (oldMail) {//if we need to change mail
        var newMail = req.body.newMail
        if (!newMail) res.status(400).json({success:false, message:"no new mail provided"})
        else {
            
            var myUserId = req.decoded.id
            User.findOne({where:{userId:myUserId}})
            .then(foundUser => {
                
                //later: check if found user?
                if (oldMail == foundUser.email) {
                    var updated = {
                        username: foundUser.username,
                        password: foundUser.password,
                        email:  newMail,
                        role: foundUser.role,
                        reportCount: foundUser.reportCount,
                        invalidUser: foundUser.invalidUser
                      }
                    foundUser.update(updated ,{fields: ['username','password','email','role', 'reportCount','invalidUser']})
                    res.json({success:true})
                }
                else {
                    res.status(400).json({success:false, message:"wrong email, try again"})
                }
            })
        }        
    }
}

indexController.changePasswordAction = (req,res) => {
    var oldPassword = req.body.oldPassword
    console.log(oldPassword)
    if (oldPassword) {
        console.log("hi")
        var newPassword = req.body.newPassword
        if (!newPassword) res.status(400).json({success:false, message:"no new password provided"})
        else {
            var myUserId = req.decoded.id
            User.findOne({where:{userId:myUserId}})
            .then(foundUser => {
                //later: check if found user?
                //console.log(foundUser)
                var temp = bcrypt.hashSync(oldPassword,10)
                console.log(temp)
                console.log(foundUser.password)
                if (bcrypt.compareSync(oldPassword, foundUser.password)) {
                    var updated = {
                        username: foundUser.username,
                        password: bcrypt.hashSync(newPassword,10),
                        email: foundUser.email,
                        role: foundUser.role,
                        reportCount: foundUser.reportCount,
                        invalidUser: foundUser.invalidUser
                      }
                    foundUser.update(updated ,{fields: ['username','password','email','role', 'reportCount','invalidUser']})
                    res.json({success:true})
                }
                else {
                    res.status(400).json({success:false, message:"wrong password, try again"})
                }
            })
        }
    }
}


module.exports = indexController
