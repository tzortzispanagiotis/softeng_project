const indexController = {}
const Shop = require('../database/shops')

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
    res.render('insertproduct')
    
}
module.exports = indexController