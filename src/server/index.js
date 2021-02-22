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
        res.end();
    }
    if (req.url === "/js/index.js") {
        res.setHeader("Content-Type", "text/javascript");
        res.write(java);
        res.end();
    }
    if (req.url === "/css/style.css") {
        res.setHeader("Content-Type", "text/css");
        res.write(style);
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
            res.write(JSON.stringify(addUserToDB(newUsersName)));
            res.end();
        })
    }
    if( req.url === "/login"){
        req.on('data', function (data){
            //TODO implement this function
            let userName = JSON.parse(data).name;
            let user = getUserFromDB(userName);
            res.write(JSON.stringify(user));
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


function addUserToDB(name){
    firebase.database();
    //TODO invent smth for userID
    let userId = 3;
    let user =  {
        name: name,
        score: 0,
        lastPoint: null,
        combo: null
    };
    firebase.database().ref('users/' + userId).set(user).then();
    return user;
}

function getUserFromDB(userName){
    let user = {
        name: "No user found",
        score: 0,
        lastPoint: null,
        combo: null
    }
    let users = firebase.database().ref("users/");
    users.on('value', (snapchot)=>{
        const  data = snapchot.val();
        for(let i = 0; i< data.length; i++){
            if(data[i].name === userName){
                user= data[i];
                console.log('user found in db: '+ JSON.stringify(data[i]));
            }
        }
        console.log(data);
    })
    return user;
}