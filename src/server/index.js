const http = require('http')

//const port = process.env.PORT //not working?
const port = 3000

// use createReadStream instead to save memory
const fs = require('fs');
const index = fs.readFileSync('../client/index.html');
const java = fs.readFileSync('../client/js/index.js');
const layout = fs.readFileSync('../client/js/layout.js');
const style = fs.readFileSync('../client/css/style.css');
const favicon = fs.readFileSync('../img/favicon/favicon.ico');

const server = http.createServer((req, res) => {
    console.log(req);
    res.statusCode = 200
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write(index);
        res.end();
    }
    if (req.url === "/js/index.js") {
        res.setHeader("Content-Type", "text/javascript");
        res.write(java);
        res.end();
    }
    if (req.url === "/js/layout.js") {
        res.setHeader("Content-Type", "text/javascript");
        res.write(layout);
        res.end();
    }
    if (req.url === "/css/style.css") {
        res.setHeader("Content-Type", "text/css");
        res.write(style);
        res.end();
    }if (req.url === "/favicon.ico") {
        res.setHeader("Content-Type", "image/ico");
        res.write(favicon);
        res.end();
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
        res.end();
    }
    if(req.url === "/newUser"){
        req.on('data', function (data){
            console.log('new user and dataJSONparese.name is:',JSON.parse(data).name);
            let newUsersName = JSON.parse(data).name;
            let newUser = addUserToDB(newUsersName);
            res.write(JSON.stringify(newUser));
            res.end();
        })
    }
    if( req.url === "/login"){
        req.on('data', function (data){
            let objectData = JSON.parse(data);
            let userName = objectData.name;
            let user = getUserFromDB(userName);
            res.write(JSON.stringify(user));
            res.end();
        })
    }
    if( req.url === "/addPoints"){
        req.on('data', function (data){
            let objectData = JSON.parse(data);
            let updatedUser = addPoints(objectData);
            res.write(JSON.stringify(updatedUser));
            res.end();
        })
    }
})
server.listen(port, () => {
    console.log(`Server running at port ${port}`)

})

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
let database = firebase.database();

let currentUsersInDB = [];

database.ref("users").on("value", function(snapshot) {
    console.log(snapshot.val());
    currentUsersInDB = snapshot.val();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

function addUserToDB(name){
    //getting higest userId
    let newUserId=0;
    for(let userIdInList in currentUsersInDB){
        if(userIdInList > newUserId) {
            newUserId = userIdInList;
            console.log("found a higher userId: "+ newUserId);
        }
    }
    newUserId++;
    console.log("new user id: "+newUserId);
    let user =  {
        userId : newUserId,
        name: name,
        score: 0,
        lastPoint: null,
        combo: null
    };
    database.ref('users/' + newUserId).set(user);
    return user;
}

function getUserFromDB(userName){
    let user = {
        name: "No user found",
        userId:-1,
        score: 0,
        lastPoint: null,
        combo: null
    }
    for(let userInUserlist in currentUsersInDB){
        if(currentUsersInDB[userInUserlist].name === userName){
            user= currentUsersInDB[userInUserlist];
            console.log('user found in db: '+ JSON.stringify(user));
        }
    }
    return user;
}

function addPoints(user){
    //TODO add bonusses
    user.score++;
    database.ref('users/' + user.userId).set(user);
    return user;
}