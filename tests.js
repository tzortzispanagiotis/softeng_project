var request = require('request-promise');

async function test()
{
    var token;
    var prod_id;
    var original_name = "TEST_PROION";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


//------------------------------------------------------------------------------------------------

    var login_options = {
        url: 'https://localhost:7882/observatory/api/login',
        //host: "localhost",
        // port: 7882,
        //  path: "/observatory/api/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        json: {
            "username": "Γιώργης",
            "password": "123456"
        }
    };
    await request(login_options, function (error, response, body) {
        //var responseString = "";
        //console.log(body.token);
        token = body.token;
    });




    console.log(token);
    console.log("LOGIN OK");



//------------------------------------------------------------------------------------------------
    var insert_options = {
        url: 'https://localhost:7882/observatory/api/products',
        //host: "localhost",
        // port: 7882,
        //  path: "/observatory/api/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        json: {
            "name": "TEST_PROION",
            "description": "Hope it works.",
            "category": "Tromou",
            "tags": "tag1"
        }
    };

    await request(insert_options, function (error, response, body) {
        //var responseString = "";
        //console.log(body.token);
        prod_id = body.id;
         console.log(body);
    });

    console.log(prod_id);
    console.log("INSERT OK");

//------------------------------------------------------------------------------------------------
      var put_options = {
        url: 'https://localhost:7882/observatory/api/products/' + String(prod_id),
        //host: "localhost",
        // port: 7882,
        //  path: "/observatory/api/login",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        json: {
            "name": "TEST_PROION_CHANGED",
            "description": "Hope it works. CHANGED",
            "category": "Tromou CHANGED",
            "tags": ["tag1 CHANGED","tag2 CHANGED"],
            "extras":["extra1 CHANGED","extra2 CHANGED"]
        }
    };
    await request(put_options, function (error, response, body) {
        //var responseString = "";
        //console.log(body.token);
        if (original_name !== body.name){
            console.log("OLD NAME WAS " + original_name);
            console.log("PUT OK, NEW NAME IS " + body.name);
        }
    });
//------------------------------------------------------------------------------------------------
      var patch_options = {
        url: 'https://localhost:7882/observatory/api/products/' + String(prod_id),
        //host: "localhost",
        // port: 7882,
        //  path: "/observatory/api/login",
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        json: {     
            "description": "THIS_WAS_PATCHED"
        }
    };
    await request(patch_options, function (error, response, body) {
        //var responseString = "";
        //console.log(body.token);
        if ("THIS_WAS_PATCHED" === body.description){
            console.log("PATCH OK, NEW DESCRIPTION IS " + body.description);
        }
    });

//------------------------------------------------------------------------------------------------
      var get_options = {
        url: 'https://localhost:7882/observatory/api/products/',
        //host: "localhost",
        // port: 7882,
        //  path: "/observatory/api/login",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        json: {     
            "start": "0",
            "count": "1",
            "status": "ALL",
            "sort": "id|ASC"

        }
    };
    await request(get_options, function (error, response, body) {
        //var responseString = "";
        //console.log(body.token);
        console.log("GET OK,\n RESULTS = " + JSON.stringify(body.products[0]));
        }
    );

//------------------------------------------------------------------------------------------------
      var delete_options = {
        url: 'https://localhost:7882/observatory/api/products/' + String(prod_id),
        //host: "localhost",
        // port: 7882,
        //  path: "/observatory/api/login",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        // json: {     
        // }
    };
    await request(delete_options, function (error, response, body) {
        //var responseString = "";
        //console.log(body.token);
        console.log("DELETE OK");
       
    });

    console.log("PRODUCTS ENDPOINT SUCCESFULLY CHECKED\n");

}

test();
//console.log(token);