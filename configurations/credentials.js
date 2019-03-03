module.exports = {
    host: process.env.HOST || "localhost",
    database: {
        db_name: process.env.DB_NAME || "rns_softeng_database",
        username: process.env.DB_USER ||"root",
        password: process.env.DB_PASS || ""
    },
    jwt_secret: process.env.SECRET || 'mylittlesecret'
}

//  Kwdikos Google Map Api
//  AIzaSyCL-EHbgBsjgKSaP4hZ38JFx2GtLv9R5wM
