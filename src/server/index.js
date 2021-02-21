const http = require('http')

//const port = process.env.PORT //not working?
const port = 3000 //not working?

// use createReadStream instead to save memory
const fs = require('fs');
const index = fs.readFileSync('../client/index.html');
const java = fs.readFileSync('../client/js/index.js');
const style = fs.readFileSync('../client/css/style.css');

const server = http.createServer((req, res) => {
    console.log(req);
    res.statusCode = 200
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write(index);
    }
    if (req.url === "/js/index.js") {
        res.setHeader("Content-Type", "text/javascript");
        res.write(java);
    }
    if (req.url === "/css/style.css") {
        res.setHeader("Content-Type", "text/css");
        res.write(style);
    }
    if (req.url === "/test") {
        res.setHeader("Content-Type", "application/json");
        let data = {
            name: 'walti',
            score: 2
        }
        //let dataTS = JSON.parse(data.toString());
        console.log(JSON.stringify(data));
        res.write(JSON.stringify(data));
    }
    if( req.url === "/newUser"){
        req.on('data', function (data){
            console.log('new user and dataJSONparese.name is:',JSON.parse(data).name);
            let newUsersName = JSON.parse(data).name;
            addUserToDB(newUsersName, 0);
        })
    }
    res.end();
})
server.listen(port, () => {
    console.log(`Server running at port ${port}`)

})

/*
let mysql      = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database: 'clickeveryhourDB', //make alternative code for if this doesn't exist
    table: 'users'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    /*next lines will create a database, but this is already created
    connection.query("CREATE DATABASE clickeveryhourDB", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    */
 /*
    /* these lines will create a new table calle Users and then add an ID
    let sql = "CREATE TABLE users (name VARCHAR(255), score INT)";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    let sql = "ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table altered");
    });
     */
/*
});

function addUser(name){
        let sql = "INSERT INTO users (name, score) VALUES ('" + name + "', '0')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("added user: " +name);
    });
}


 */

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
let firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/database");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
    apiKey: "AIzaSyAgkWwrddQfPf5nMVScNaxTEQyNZa5wiXc",
    authDomain: "clickeveryhour.firebaseapp.com",
    databaseURL: "https://clickeveryhour-default-rtdb.firebaseio.com",
    projectId: "clickeveryhour",
    storageBucket: "clickeveryhour.appspot.com",
    messagingSenderId: "936151217624",
    appId: "1:936151217624:web:052db4e2b3f0fb76142ead",
    measurementId: "G-3GKM1WZQZH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function addUserToDB(name, score){
    firebase.database();
    //TODO invent smth for userID
    userId = 0;
    firebase.database().ref('users/' + userId).set({
        username: name,
        score: score
    });

}