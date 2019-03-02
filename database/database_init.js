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
            name: 'DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            name: 'ULTIMATE DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΚΑΥΣΙΜΑ',
            productTags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
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
            username : 'Chris',
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
            date:'1/19/2019',
        },
        {
            userId: 2,
            shopId: 1,
            productId:2,
            price: 1.511 , 
            date:'1/2/2019',
        },
        {
            userId: 3,
            shopId: 1,
            productId:3,
            price: 1.511 , 
            date:'1/1/2019',
        },
        {
            userId: 1,
            shopId: 3,
            productId:1,
            price: 1.511 , 
            date:'1/1/2019',
        },
        {
            userId: 1,
            shopId: 10,
            productId:1,
            price: 1.511 , 
            date:'1/2/2019',
        },
        {
            userId: 1,
            shopId: 1,
            productId:5,
            price: 1.511 , 
            date:'12/1/2018',
        },
        {
            userId: 1,
            shopId: 10,
            productId:5,
            price: 1.511 , 
            date:'1/1/2019',
        },
    ]

module.exports = { 
    users: userObj,
    shops: shopObj,
    products: productObj,
    prices: pricesObj
 }

