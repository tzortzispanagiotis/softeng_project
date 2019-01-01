module.exports = {
    host: process.env.HOST || "localhost",
    database: {
        db_name: process.env.DB_NAME || "rns_softeng_database",
        username: process.env.DB_USER ||"my_user",
        password: process.env.DB_PASS || "my_password"
    },
    jwt_secret: process.env.SECRET || 'mylittlesecret'
} 