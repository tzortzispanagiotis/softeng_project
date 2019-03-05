var bcrypt = require("bcryptjs"),
    Sequelize = require("sequelize");
//--------------------------shops---------------------------------    
var shopObj =  [
    {
        name: 'ΜΑΧΗΤΕΣ ΤΩΝ ΔΡΟΜΩΝ',
        address :'ΚΑΠΟΔΙΣΤΡΙΟΥ 78, ΜΑΡΟΥΣΙ',
        latitude: 38.030540,
        longtitude: 23.778410,
        shopTags: 'EKO, fuel',
        withdrawn: false
    },
    {
        name: 'ΜΑΧΗΤΕΣ ΤΩΝ ΔΡΟΜΩΝ',
        address :'ΚΑΠΟΔΙΣΤΡΙΟΥ 78, ΜΑΡΟΥΣΙ',
        latitude: 38.030540,
        longtitude: 23.778410,
        shopTags: 'EKO, fuel',
        withdrawn: false
    }, 
    {
        name: 'ΠΑΠΑΔΟΠΟΥΛΟΣ',
        address :'ΒΑΣ. ΣΟΦΙΑΣ 100,ΑΘΗΝΑ',
        latitude: 37.982578,
        longtitude: 23.757160,
        shopTags: 'SHELL',
        withdrawn: false
    },
    {
        name: 'ΑΦΟΙ ΑΝΑΣΤΑΣΟΠΟΥΛΟΙ',
        address :'ΠΕΙΡΑΙΩΣ 250,ΑΘΗΝΑ',
        latitude: 37.954830,
        longtitude: 23.673790,
        shopTags: 'AVIN',
        withdrawn: false
    },
    {
        name: 'ΠΟΛΑΚΗΣ ΑΕ',
        address :'ΟΥΛΩΦ ΠΑΛΜΕ 24 ,ΑΓ.ΑΝΑΡΓΥΡΟΙ',
        latitude: 38.029160,
        longtitude: 23.722670,
        shopTags: 'AVIN',
        withdrawn: false
    },
    {
        name: 'ΣΠΙΝΤΟΣ',
        address :'Καραολή και Δημητρίου και Σοφιανοπούλου, 18547, Αθήνα',
        latitude: 37.9482607,
        longtitude: 23.6620392,
        shopTags: 'SHELL',
        withdrawn: false
    },
    {
        name: 'ΣΠΙΝΤΟΣ',
        address :'Νικ. Γενηματά, Αμπελόκηποι, 11524, ΑΘήνα',
        latitude: 37.9938309,
        longtitude: 23.7616977,
        shopTags: 'EKO',
        withdrawn: false
     
    },
    {   
        name: 'ΣΑΙΔΗΣ',
        address :' Ιερά Οδός 59, Αθήνα',
        latitude: 37.9810466,
        longtitude: 23.7085819,
        shopTags: 'BP',
        withdrawn: false
        
    },
    {   
        name: 'ΓΕΩΡΓΙΟΥ',
        address : 'Βενέζη 6, Ηράκλειο, 14121, Αθήνα',
        latitude: 38.0430615,
        longtitude: 23.7730606,
        shopTags: 'BP',
        withdrawn: false
       
    },
    {
        name: 'TZERANHS',
        address : 'Ερμού 48, Αιγάλεο, 12244, Αθήνα',
        latitude:38.0430615,
        longtitude: 23.7730606,
        shopTags: 'SHELL',
        withdrawn: false  
    },
        
    {
        name: 'LIOUTAS',
        address : 'Πολυγύρου 14, 11527, Αθήνα',
        latitude:  37.987712,
        longtitude: 23.7662746,
        shopTags: 'SHELL',
        withdrawn: false
    },
    {
        name: 'PAPADOPOULOS',
        address : 'Παραδείσου 37, 15125, Μαρούσι',
        latitude:  38.0370293,
        longtitude: 23.7998927,
        shopTags: 'BP',
        withdrawn: false
    },
    {
        name: 'ΠΑΠΑΣΠΥΡΟΥ',
        address : 'Βουλής 4, 10562, Αθήνα',
        latitude:  37.9768207,
        longtitude: 23.7327577,
        shopTags: 'EKO',
        withdrawn: false
    },
    {
        name: 'ΤΖΩΡΤΖΗΣ',
        address : 'Γρηγορίου Κουσίδη 101, 15773, Ζωγράφου',
        latitude:  37.9753849,
        longtitude: 23.7768793,
        shopTags: 'BP',
        withdrawn: false
    },
    {
        name: 'ΑΦΟΙ ΜΑΡΑΓΚΟΥ',
        address : 'Βασιλίσσης Σοφίας 50, 151 24 Μαρούσι',
        latitude:  38.0549836,
        longtitude: 23.8076143,
        shopTags: 'SHELL',
        withdrawn: false
    }


]

//--------------------------Products---------------------------------

var productObj = [
        {
            name: 'ΑΜΟΛΥΒΔΗ 95',
            description: 'ΒΕΝΖΙΝΗ',
            category: 'ΑΜΟΛΥΒΔΗ',
            productTags: 'ΦΘΗΝΗ',
            withdrawn: false
        },
        {
            name: ' SUPER ΑΜΟΛΥΒΔΗ 99',
            description: 'ΒΕΝΖΙΝΗ',
            category: 'ΑΜΟΛΥΒΔΗ',
            productTags: 'ΣΟΥΠΕΡ',
            withdrawn: false
        },
        {
            name: 'EKO SUPER DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΠΕΤΡΕΛAIΟ ΚΙΝΗΣΗΣ',
            productTags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            name: 'ULTIMATE DIESEL',
            description: 'ΠΕΤΡΕΛΕΟ ΚΙΝΗΣΗΣ',
            category: 'ΠΕΤΡΕΛAIΟ ΚΙΝΗΣΗΣ',
            productTags: 'ΠΕΤΡΕΛΕΟΚΙΝΗΤΑ',
            withdrawn: false
        },
        {
            name: 'SHELL ΥΓΡΑΕΡΙΟ',
            description: 'ΑΕΡΙΟ ΚΙΝΗΣΗΣ',
            category: 'ΥΓΡΑΕΡΙΟ',
            productTags: 'SHELL',
            withdrawn: false
        },
        {
            name: 'SHELL ΥΓΡΑΕΡΙΟ',
            description: 'ΑΕΡΙΟ ΚΙΝΗΣΗΣ',
            category: 'ΥΓΡΑΕΡΙΟ',
            productTags: 'AUTOGAS',
            withdrawn: false
        },
        {
            name: 'SUPER ΥΓΡΑΕΡΙΟ',
            description: 'ΑΕΡΙΟ ΚΙΝΗΣΗΣ',
            category: 'ΥΓΡΑΕΡΙΟ',
            productTags: 'AUTOGAS',
            withdrawn: false
        },
        {
            name: 'EXTREME ΘΕΡΜΑΝΣΗ',
            description: 'ΑΕΡΙΟ ΚΙΝΗΣΗΣ',
            category: 'ΠΕΤΡΕΛΑΙΟ ΘΕΡΜΑΝΣΗΣ',
            productTags: 'AUTOGAS',
            withdrawn: false
        }

    ]

//--------------------------USERS---------------------------------//

    var userObj = [
        {   
            username : 'Nick',
            password : bcrypt.hashSync('123456',10),
            email : 'el14118@central.ntua.gr',
            role: 'ADMIN',
            
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
        },
        {   
            username : 'Mary',
            password : bcrypt.hashSync('123456',10),
            email : 'mary@example.com',
            role: 'USER',
        },
        {   
            username : 'Sia',
            password : bcrypt.hashSync('123456',10),
            email : 'sia@example.com',
            role: 'USER',
        }
    ]

    
    var pricesObj = [
        {
            userId: 1,
            shopId: 1,
            productId:1,
            price: 1.488 , 
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
            price: 1.479 , 
            date:'1/1/2019',
        },
        {
            userId: 1,
            shopId: 3,
            productId:1,
            price: 1.513 , 
            date:'1/1/2019',
        },
        {
            userId: 1,
            shopId: 10,
            productId:1,
            price: 1.499 , 
            date:'1/2/2019',
        },
        {
            userId: 2,
            shopId: 1,
            productId:5,
            price: 0.732 , 
            date:'12/1/2018',
        },
        {
            userId: 1,
            shopId: 10,
            productId:5,
            price: 0.731 , 
            date:'1/2/2019',
        },
        {
            userId: 3,
            shopId: 4,
            productId:4,
            price: 1.487 , 
            date:'1/3/2019',
        },
        {
            userId: 3,
            shopId: 6,
            productId:1,
            price: 1.497 , 
            date:'1/3/2019',
        },
        {
            userId: 3,
            shopId: 10,
            productId: 2,
            price: 1.502 , 
            date:'1/3/2019',
        },
        {
            userId: 4,
            shopId: 14,
            productId: 2,
            price: 1.509 , 
            date:'4/3/2019',
        },
        {
            userId: 4,
            shopId: 12,
            productId: 1,
            price: 1.487 , 
            date:'4/3/2019',
        },
        {
            userId: 4,
            shopId: 4,
            productId:1,
            price: 1.493 , 
            date:'2/1/2019',
        },
        {
            userId: 4,
            shopId: 6,
            productId:4,
            price: 1.254 , 
            date:'2/1/2019',
        },
        {
            userId: 5,
            shopId: 13,
            productId:4,
            price: 1.259 , 
            date:'2/1/2019',
        },
        {
            userId: 3,
            shopId: 9,
            productId: 3,
            price: 1.263 , 
            date:'2/1/2019',
        },
        {
            userId: 3,
            shopId: 4,
            productId: 3,
            price: 1.270 , 
            date:'2/1/2019',
        },
        {
            userId: 3,
            shopId: 7,
            productId: 3,
            price: 1.274 , 
            date:'2/1/2019',
        },
        {
            userId: 2,
            shopId: 15,
            productId:5,
            price: 0.739 , 
            date:'2/1/2019',
        },
        {
            userId: 1,
            shopId: 9,
            productId:7,
            price: 0.729 , 
            date:'2/1/2019',
        },
        {
            userId: 5,
            shopId: 3,
            productId:5,
            price: 0.741 , 
            date:'2/2/2019',
        },
        {
            userId: 5,
            shopId: 11,
            productId: 6,
            price: 0.788 , 
            date:'4/1/2019',
        }

    ]

module.exports = { 
    users: userObj,
    shops: shopObj,
    products: productObj,
    prices: pricesObj
 }

