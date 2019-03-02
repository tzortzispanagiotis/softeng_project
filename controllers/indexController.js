const indexController = {}
const Shop = require('../database/shops'),
      Product = require('../database/products');

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
    Product.findAll().then(foundProducts => {
        var categories = foundProducts.map(product => {
            return product.category
        })
        categories = categories.filter( onlyUnique);
        res.render('insertproduct', {categories})
    })
    
}
module.exports = indexController