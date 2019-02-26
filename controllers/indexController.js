const indexController = {}

indexController.renderIndexAction =  (req, res) => {
    res.render('index')
}

indexController.renderLoginAction = (req, res) => {
    res.render('loginregister')
}

indexController.renderContactAction = (req,res) => {
    res.render('contact')
}

module.exports = indexController