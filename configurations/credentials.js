module.exports = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 7880,
    database: {
        db_name: process.env.DB_NAME || "rns_softeng_database",
        username: process.env.DB_USER ||"my_user",
        password: process.env.DB_PASS || "my_password"
    },
    jwt_secret: process.env.SECRET || 'mylittlesecret',
    email: {
        username: process.env.EMAIL_USER || "rnssofteng@gmail.com",
        password: process.env.EMAIL_PASS || "Rnssofteng1@",
        address: process.env.EMAIL_ADDRESS || "rnssofteng@gmail.com"
    }
} 
