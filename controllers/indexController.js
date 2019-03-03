const indexController = {}
const Shop = require('../database/shops'),
      Product = require('../database/products'),
      jwt     = require('jsonwebtoken'),
      config  = require('../configurations/credentials'),
      sequelize = require('../database/connect'),
      User   =require('../database/user');

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
    if (!token) res.status(400).html("UNAUTHENTICATED")
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
module.exports = indexController