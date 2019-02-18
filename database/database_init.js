//const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
//const Credentials = require("../configurations/credentials.js"); 
const bcrypt = require("bcryptjs");
const db  = require('../database/connect') , 
      User = db.User ;


function initializeDB(db, done) {
//--------------------------shops---------------------------------
    
var shopobj =  [
    {
        shopId:1,
        name: 'ΜΑΧΗΤΕΣ ΤΩΝ ΔΡΟΜΩΝ',
        address :'ΚΑΠΟΔΙΣΤΡΙΟΥ 78, ΜΑΡΟΥΣΙ',
        latitude: 38.030540,
        longtitude: 23.778410,
        tags: '',
        withdrawn: false
    },
   
    {
        shopId:1,
        name: 'ΠΑΠΑΔΟΠΟΥΛΟΣ',
        address :'ΒΑΣ. ΣΟΦΙΑΣ 100,ΑΘΗΝΑ',
        latitude: 37.982578,
        longtitude: 23.757160,
        tags: 'ΠΛΗΝΤΥΡΙΟ',
        withdrawn: false
    },
    {
        shopId:1,
        name: 'ΑΦΟΙ ΑΝΑΣΤΑΣΟΠΟΥΛΟΙ',
        address :'ΠΕΙΡΑΙΩΣ 250,ΑΘΗΝΑ',
        latitude: 37.954830,
        longtitude: 23.673790,
        tags: '',
        withdrawn: false
    },
    {
        shopId:1,
        name: 'ΠΟΛΑΚΗΣ ΑΕ',
        address :'ΟΥΛΩΦ ΠΑΛΜΕ 24 ,ΑΓ.ΑΝΑΡΓΥΡΟΙ',
        latitude: 38.029160,
        longtitude: 23.722670,
        tags: '',
        withdrawn: false
    },
    {
        shopId:1,
        name: 'ΣΠΙΝΤΟΣ',
        address :'Καραολή και Δημητρίου και Σοφιανοπούλου, 18547, Αθήνα',
        latitude: 37.9482607,
        longtitude: 23.6620392,
        tags: '',
        withdrawn: false
    },
    {
        shopId:1,
        name: 'ΣΠΙΝΤΟΣ',
        address :'Νικ. Γενηματά, Αμπελόκηποι, 11524, ΑΘήνα',
        latitude: 37.9938309,
        longtitude: 23.7616977,
        tags: '',
        withdrawn: false
     
    },
    {   shopId:1,
        name: 'ΦΟΥΛ ΤΑ ΓΚΑΖΙΑ',
        address :' Ιερά Οδός 59, Αθήνα',
        latitude: 37.9810466,
        longtitude: 23.7085819,
        tags: '',
        withdrawn: false
        
    },
    {   shopId:1,
        name: 'ΦΟΥΛ ΤΑ ΓΚΑΖΙΑ',
        address : 'Βενέζη 6, Ηράκλειο, 14121, Αθήνα',
        latitude: 38.0430615,
        longtitude: 23.7730606,
        tags: '',
        withdrawn: false
       
    },
    {
        shopId:1,
        name: 'TZERANHS',
        address : 'Ερμού 48, Αιγάλεο, 12244, Αθήνα',
        latitude:38.0430615,
        longtitude: 23.7730606,
        tags: '',
        withdrawn: false
       
    },
        
    {
        shopId:1,
        name: 'LIOUTAS',
        address : 'Πολυγύρου 14, 11527, Αθήνα',
        latitude:  37.987712,
        longtitude: 23.7662746,
        tags: '',
        withdrawn: false
    },
 

    
    
    
    
];

//function initializeDB(db, done) {

//--------------------------Categories---------------------------------
    // for each supported category make sure, we have it in the categories table
    //conf.supportedCategories.forEach(function (category, idx) {
     //   db.Categories.findOne({ where: { categoryName: category } }).then(res => {
         //   if (!res) {
                // this category has to be added.
            //    db.Categories.create({ categoryName: category }).catch(err => { console.log(err); });
          //  }
      //  }).catch(err => { console.log(err); });
  //  });

//--------------------------Providers---------------------------------

var productobj = [
        {
            id: 1,
            name: 'AMOLIVDI 95',
            description: 'ΒΕΝΖΙΝΗ',
            category: 'ΚΑΥΣΙΜΑ',
            tags: 'ΦΘΗΝΗ',
            withdrawn: false
        },
        {
            id: 1,
            name: ' SUPER AMOLIVDI 99',
            description: 'ΒΕΝΖΙΝΗ',
            category: 'ΚΑΥΣΙΜΑ',
            tags: 'ΣΟΥΠΕΡ',
            withdrawn: false
        },
        {
            id: 1,
            name: 'DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            tags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            id: 1,
            name: 'ULTIMATE DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            tags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            id: 1,
            name: 'ΥΓΡΑΕΡΙΟ',
            description: 'ΑΕΡΙΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            tags: 'AUTOGAS',
            withdrawn: false
        },
    ];

//--------------------------USERS---------------------------------//

    var USERobj = [
        {   userid:1,
            username : 'Γιώργης',
            password : bcrypt.hashSync('123456',10),
            email : 'george@example.com',
            role: 'USER',
            invalid_info: 1
        },
        {   userid:1,
            username : 'Κώστας', 
            password : bcrypt.hashSync('123456',10),
            email : 'kostas@example.com',
            role: 'USER',
            invalid_info: 0
           
        },
        {   userid:1,
            name : 'Γιάννης',
            password : bcrypt.hashSync('123456',10),
            email : 'john@example.com',
            role: 'USER',
            invalid_info: 0
        },
    ];



    
    var pricesobj = [
        {
            shopId: 1,
            productId:1,
            price: 1.511 , 
            date:Sequelize.NOW,
        },
        {
            shopId: 2,
            productId:1,
            price: 1.211 , 
            date:Sequelize.NOW,

        },
        {
            shopId: 3,
            productId:1,
            price: 1.611 , 
            date: Sequelize.NOW,
        },
        {
            shopId: 5,
            productId:1,
            price: 1.4, 
            date:Sequelize.NOW,

        },
        {
            shopId: 6,
            productId:1,
            price: 1.195, 
            date:Sequelize.NOW,

        },

        {
            shopId: 1,
            productId: 2,
            price: 1.484, 
            date:Sequelize.NOW,

        },

        {
            shopId: 1,
            productId: 2,
            price: 1.984, 
            date:Sequelize.NOW,

        },

        {
            shopId: 4,
            productId: 2,
            price: 1.384, 
            date:Sequelize.NOW,

        },

        {
            shopId: 8,
            productId: 2,
            price: 1.784, 
            date:Sequelize.NOW,

        },

        {
            shopId: 9,
            productId: 2,
            price: 1.584, 
            date:Sequelize.NOW,

        },
        {
            shopId: 10,
            productId: 2,
            price: 1.333, 
            date:Sequelize.NOW,

        },
        {
            shopId: 7,
            productId: 2,
            price: 1.666, 
            date:Sequelize.NOW,

        },
        {
            shopId: 1,
            productId:3,
            price: 1.62 , 
            date:Sequelize.NOW,
        },
        {
            shopId: 3,
            productId:3,
            price: 1.211 , 
            date:Sequelize.NOW,

        },
        {
            shopId: 5,
            productId:1,
            price: 1.19 , 
            date:Sequelize.NOW ,
        },
        {
            shopId: 4,
            productId:3,
            price: 1.4, 
            date:Sequelize.NOW,

        },
        {
            shopId: 6,
            productId:4,
            price: 1.195, 
            date:Sequelize.NOW,

        },

        {
            shopId: 1,
            productId: 4,
            price: 1.484, 
            date:Sequelize.NOW,

        },

        {
            shopId: 1,
            productId: 5,
            price: 0.64, 
            date:Sequelize.NOW,

        },

        {
            shopId: 4,
            productId: 5,
            price: 0.98, 
            date:Sequelize.NOW,

        },

        {
            shopId: 8,
            productId: 4,
            price: 1.784, 
            date: Sequelize.NOW,

        },

        {
            shopId: 5,
            productId: 5,
            price: 0.77, 
            date:Sequelize.NOW,

        },
        {
            shopId: 10,
            productId: 5,
            price: 0.57, 
            date:Sequelize.NOW,

        },
    ];

   
    /*User.bulkCreate(USERobj)
    .then((succ) => db.Shop.bulkCreate(shopobj))
    .then((succ) => db.Product.bulkCreate(productobj))
    .then((succ) => db.Price.bulkCreate(pricesobj))
    .then(() => {done();})
    .catch((err) => console.log(err));*/

}







module.exports = { initializeDB: initializeDB };