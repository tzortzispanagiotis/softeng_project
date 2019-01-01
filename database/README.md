## Database structure:

Έχω δημιουργήσει ένα τελικό αρχείο **connect.js** το οποιο κάνει export ένα object που έχει μέσα του το 
database connection, αλλά και κάθε model που δημιουργούμε. Για παράδειγμα, το export του connnect.js
έχει την παρακάτω μορφή:

var db = {
    sequelizeConnection: sequelize,
    User: User
}
module.exports = db;

Οπότε σε περίπτωση που θέλω σε κάποιο αρχείο να κάνω κάποιο SQL Query στο User Model, κάνω:

var db = require("Path/to/connect/js);
User = db.User;

Και μετά χρησιμοποιώ κανονικά το User (δηλαδή μπορώ να κάνω Queries).