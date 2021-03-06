
let validTimeToClick = false;
let alreadyClickedThisHour = false;
let user =  {
    name: "",
    score: 0,
    lastPoint: null,
    combo: null
}
let score= 0; //TODO remove legacy

$(document).ready(function (){
    $('#defaultOpen').click();
    let thisLocalStorage = window.localStorage;
    if(user.name === ""){
        user = thisLocalStorage.get('user');
        updateUserData()
        alert('playing as '+user.name);
    }else{
        $("#activeUser").text("No user found");
        $("#score").text("0");
    }
});

// Update the clock every 1 second
setInterval(function() {
    // Get local time, format: hh:mm:ss AM
    let now = new Date().toLocaleTimeString();
    console.log(now);

    //Test simulation: click every minute
    let seconds = [];
    if(now.charAt(0)==='1' && now.charAt(1)!== ':'){
        // it means that time is equal as or greater then 10
        seconds[0] = now.charAt(6);
        seconds[1] = now.charAt(7);
    }else {
        seconds[0] = now.charAt(5);
        seconds[1] = now.charAt(6);
    }

    if(seconds[0] === '0' && seconds[1] === '0'){
        validTimeToClick = true;
        console.log('validTimeToClick: '+ validTimeToClick);
    } else{
        validTimeToClick = false;
        alreadyClickedThisHour = false;
    }

    //Real simulation; click every hour:
    /*
        let minutes = [];
        if(now.charAt(0)==='1' && now.charAt(1)!== ':'){
            // it means that time is equal as or greater then 10
            minutes[0] = now.charAt(4);
            minutes[1] = now.charAt(5);
        }else {
            minutes[0] = now.charAt(3);
            minutes[1] = now.charAt(4);
        }

        if(minutes[0] === '0' && minutes[1] === '0'){
            validTimeToClick = true;
            console.log('validTimeToClick: '+ validTimeToClick);
        } else{
            validTimeToClick = false;
            alreadyClickedThisHour = false;
        }
    */// Display the result in the element with id="current_time"
    document.getElementById("current_time").innerHTML = now;
}, 1000);


/**
 * This method is called when the user clicks the clock
 */
function timeClicked() {
    if(validTimeToClick && !alreadyClickedThisHour){
        let url = "/addPoints"
        if(user.name ===""){
            login();
        }
        $.post(url, JSON.stringify(user),function (data, status){
            if(status ==="success") {
                user = JSON.parse(data);
                updateUserData();
            } else {
                console.error("Something went wrong updating the score!")
            }
        });
        alreadyClickedThisHour = true;
    }
    updateUserData();
    console.log('Click');
}


function login(){
    let userName = prompt("Please enter your name", "Harry Potter");
    //check if person exists
    // if it does not exits, make a pop up to ask to make a new account with this name
    // or log in with different username
    let url = "/login"
    let data = {
        name: userName
    }
    let stringifiedData = JSON.stringify(data);
    $.post(url, stringifiedData, function (receivedData, status){
        console.log("raw data from login post: "+receivedData);
        let returnedUserInfo = JSON.parse(receivedData);
        console.log( status+', with data:  ' + receivedData+ " with name "+ returnedUserInfo["name"]);
        if(returnedUserInfo.name ==="No user found"){
            if(window.confirm("There was no user found with username: "+ userName +"\\n"
        + "Do you want to create a new account with this username?\\n Cancel to try a new login")){
                addUserToDB(userName);
            }else{ //Trying to login again
                login();
            }
        }else{
            user = returnedUserInfo;
            updateUserData();
        }
    });
}

function addUserToDB(userName){
    let url = "/newUser"
    let data = {
        name: userName
    }
    let stringifiedData = JSON.stringify(data);
    $.post(url, stringifiedData, function (data, status){
       if(status === "success" && !data.includes("Error")){
           user = JSON.parse(data);
           updateUserData();
       }else{
           alert('Something went wrong with creating new user: '+userName);
       }
    });
}

function updateUserData() {

    $("#activeUser").text(user.name);
    $("#score").text(user.score);
}


//Tab layout
function openTab(evt, chosenTab) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(chosenTab).style.display = "block";
    evt.currentTarget.className += " active";
}

