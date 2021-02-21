
let validTimeToClick = false;
let alreadyClickedThisHour = false;
let score= 0;


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
        score += 1;
        alreadyClickedThisHour = true;
    }
    document.getElementById('score').innerHTML = score;

    console.log('Click');
    let url = "/test"
    $.get(url, function (data, status){
        let parsedData = JSON.stringify(data);
        console.log(`${parsedData} with status: ${status}`);
    });
}

function addUserToDB(){
    let url = "/newUser"
    let data = {
        name: "Walti", //TODO change this name
    }
    let stringifiedData = JSON.stringify(data);
    $.post(url, stringifiedData, function (data, status){
        console.log( status+', with data:  ' + JSON.stringify(data));
    });
}

