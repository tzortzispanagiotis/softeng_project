var bcrypt = require("bcryptjs"),
    Sequelize = require("sequelize");
//--------------------------shops---------------------------------    
var shopObj =  [
    {
        name: 'ΜΑΧΗΤΕΣ ΤΩΝ ΔΡΟΜΩΝ',
        address :'ΚΑΠΟΔΙΣΤΡΙΟΥ 78, ΜΑΡΟΥΣΙ',
        latitude: 38.030540,
        longtitude: 23.778410,
        shopTags: 'a',
        withdrawn: false
    },
   
    {
        name: 'ΠΑΠΑΔΟΠΟΥΛΟΣ',
        address :'ΒΑΣ. ΣΟΦΙΑΣ 100,ΑΘΗΝΑ',
        latitude: 37.982578,
        longtitude: 23.757160,
        shopTags: 'ΠΛΗΝΤΥΡΙΟ',
        withdrawn: false
    },
    {
        name: 'ΑΦΟΙ ΑΝΑΣΤΑΣΟΠΟΥΛΟΙ',
        address :'ΠΕΙΡΑΙΩΣ 250,ΑΘΗΝΑ',
        latitude: 37.954830,
        longtitude: 23.673790,
        shopTags: 'a',
        withdrawn: false
    },
    {
        name: 'ΠΟΛΑΚΗΣ ΑΕ',
        address :'ΟΥΛΩΦ ΠΑΛΜΕ 24 ,ΑΓ.ΑΝΑΡΓΥΡΟΙ',
        latitude: 38.029160,
        longtitude: 23.722670,
        shopTags: 'a',
        withdrawn: false
    },
    {
        name: 'ΣΠΙΝΤΟΣ',
        address :'Καραολή και Δημητρίου και Σοφιανοπούλου, 18547, Αθήνα',
        latitude: 37.9482607,
        longtitude: 23.6620392,
        shopTags: 'a',
        withdrawn: false
    },
    {
        name: 'ΣΠΙΝΤΟΣ',
        address :'Νικ. Γενηματά, Αμπελόκηποι, 11524, ΑΘήνα',
        latitude: 37.9938309,
        longtitude: 23.7616977,
        shopTags: 'a',
        withdrawn: false
     
    },
    {   
        name: 'ΦΟΥΛ ΤΑ ΓΚΑΖΙΑ',
        address :' Ιερά Οδός 59, Αθήνα',
        latitude: 37.9810466,
        longtitude: 23.7085819,
        shopTags: 'a',
        withdrawn: false
        
    },
    {   
        name: 'ΦΟΥΛ ΤΑ ΓΚΑΖΙΑ',
        address : 'Βενέζη 6, Ηράκλειο, 14121, Αθήνα',
        latitude: 38.0430615,
        longtitude: 23.7730606,
        shopTags: 'a',
        withdrawn: false
       
    },
    {
        name: 'TZERANHS',
        address : 'Ερμού 48, Αιγάλεο, 12244, Αθήνα',
        latitude:38.0430615,
        longtitude: 23.7730606,
        shopTags: 'a',
        withdrawn: false  
    },
        
    {
        name: 'LIOUTAS',
        address : 'Πολυγύρου 14, 11527, Αθήνα',
        latitude:  37.987712,
        longtitude: 23.7662746,
        shopTags: 'a',
        withdrawn: false
    }
]

//--------------------------Products---------------------------------

var productObj = [
        {
            name: 'AMOLIVDI 95',
            description: 'ΒΕΝΖΙΝΗ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'ΦΘΗΝΗ',
            withdrawn: false
        },
        {
            name: ' SUPER AMOLIVDI 99',
            description: 'ΒΕΝΖΙΝΗ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'ΣΟΥΠΕΡ',
            withdrawn: false
        },
        {
            id: 1,
            name: 'DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            id: 1,
            name: 'ULTIMATE DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            id: 1,
            name: 'ΥΓΡΑΕΡΙΟ',
            description: 'ΑΕΡΙΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'AUTOGAS',
            withdrawn: false
        },
    ]

//--------------------------USERS---------------------------------//

    var userObj = [
        {   
            username : 'Γιώργης',
            password : bcrypt.hashSync('123456',10),
            email : 'george@example.com',
            role: 'USER',
            
        },
        {   
            username : 'Κώστας', 
            password : bcrypt.hashSync('123456',10),
            email : 'kostas@example.com',
            role: 'USER',
           
        },
        {   
            username : 'Γιάννης',
            password : bcrypt.hashSync('123456',10),
            email : 'john@example.com',
            role: 'USER',
        }
    ]

    
    var pricesObj = [
        {
            userId: 1,
            shopId: 1,
            productId:1,
            price: 1.511 , 
            date:'1/1/2019',
        },
        {
            userId: 1,
            shopId: 2,
            productId:1,
            price: 1.211 , 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 3,
            productId:1,
            price: 1.611 , 
            date: '1/1/2019',
        },
        {
            userId: 1,
            shopId: 5,
            productId:1,
            price: 1.4, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 6,
            productId:1,
            price: 1.195, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 1,
            productId: 2,
            price: 1.484, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 1,
            productId: 2,
            price: 1.984, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 4,
            productId: 2,
            price: 1.384, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 8,
            productId: 2,
            price: 1.784, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 9,
            productId: 2,
            price: 1.584, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 10,
            productId: 2,
            price: 1.333, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 7,
            productId: 2,
            price: 1.666, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 1,
            productId:3,
            price: 1.62 , 
            date:'1/1/2019',
        },
        {
            userId: 1,
            shopId: 3,
            productId:3,
            price: 1.211 , 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 5,
            productId:1,
            price: 1.19 , 
            date:'1/1/2019' ,
        },
        {
            userId: 1,
            shopId: 4,
            productId:3,
            price: 1.4, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 6,
            productId:4,
            price: 1.195, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 1,
            productId: 4,
            price: 1.484, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 1,
            productId: 5,
            price: 0.64, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 4,
            productId: 5,
            price: 0.98, 
            date:'1/1/2019',

        },

        {
            userId: 1,
            shopId: 8,
            productId: 4,
            price: 1.784, 
            date: '1/1/2019',

        },

        {
            userId: 1,
            shopId: 5,
            productId: 5,
            price: 0.77, 
            date:'1/1/2019',

        },
        {
            userId: 1,
            shopId: 10,
            productId: 5,
            price: 0.57, 
            date:'1/1/2019',

        },
    ]

module.exports = { 
    users: userObj,
    shops: shopObj,
    products: productObj,
    prices: pricesObj
 }