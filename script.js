/*********************************************COLOUR BUTTONS:*********************************************/

//Selectors for my buttons
let defaultButton = document.getElementById("defaultMode");
let lightButton = document.getElementById("lightMode");
let colorfulButton = document.getElementById("colorfulMode");

//Stores the current mode locally (+ globally) so that it doesn't change when going from one page to another
//For some strange reason this does not work in FireFox. I cannot figure out why after hours of searching, it
//stores the data on a page by page basis, not overall, does not seem like this is possible in FireFox the way
//I'm currently doing it. I do not have access to IOS / any Apple device so I cannot test that.

let currentMode = localStorage.getItem("selectedMode");
localStorage.setItem("selectedMode", currentMode);


//Root selector
let root = document.querySelector(':root');

//Click events for each button
defaultButton.addEventListener("click", defaultMode);
lightButton.addEventListener("click", lightMode);
colorfulButton.addEventListener("click", colorMode);

//This is the event + function used to apply the current styling to a different page
document.addEventListener("DOMContentLoaded", loadPage);

function loadPage() {
    if (currentMode == "light") {
        lightMode();
    } 
    else if (currentMode == "colorful") {
        colorMode();
    } 
    else {
        defaultMode();
    }
}

/* Default styling */

function defaultMode() {

    //Colours:
    root.style.setProperty('--text', '#FFFFFF');
    root.style.setProperty('--bg', '#1F1F1F');
    root.style.setProperty('--main', '#B87CFF');
    root.style.setProperty('--light', '#EDB3FF');
    root.style.setProperty('--dark', '#4b3275');
    root.style.setProperty('--select', 'hsl(260, 100%, 60%)');
    root.style.setProperty('--error', '#F63C80');
    root.style.setProperty('--special', '#4b3275');

    //Reset() and the classList.add is used to highlight the button of the syling the user is using currently
    reset();
    defaultButton.classList.add("active");

    //Sets the mode to default
    localStorage.setItem("selectedMode", "default");

    //The "special" styling here is used to the top row of the table in aspirations.html
    document.getElementsByClassName("special")[0].style.color = "white";
    document.getElementsByClassName("special")[1].style.color = "white";
}

/* Light styling */
function lightMode() {

    //Colours
    root.style.setProperty('--text', '#000000');
    root.style.setProperty('--bg', '#F4ECF6');
    root.style.setProperty('--main', '#7C5295');
    root.style.setProperty('--light', '#3C1361');
    root.style.setProperty('--dark', '#BCA0DC');
    root.style.setProperty('--select', '#CDA5F3');
    root.style.setProperty('--error', '#D10A53');
    root.style.setProperty('--special', '#BCA0DC');

    //Same reset() function
    reset();
    lightButton.classList.add("active");

    //Same sort of mode setting
    localStorage.setItem("selectedMode", "light");

    //Same kind of special styling
    document.getElementsByClassName("special")[0].style.color = "black";
    document.getElementsByClassName("special")[1].style.color = "black";
}

/* Color styling */

//Bascially the exact same thing
function colorMode() {
    root.style.setProperty('--text', '#FFFFFF');
    root.style.setProperty('--bg', '#333333');
    root.style.setProperty('--main', '#FF6B6B');
    root.style.setProperty('--light', '#FFD166');
    root.style.setProperty('--dark', '#06D6A0');
    root.style.setProperty('--select', '#065D88');
    root.style.setProperty('--error', '#F96CA0');
    root.style.setProperty('--special', '#333333');

    reset();
    colorfulButton.classList.add("active");

    localStorage.setItem("selectedMode", "colorful");

    document.getElementsByClassName("special")[0].style.color = "#333333";
    document.getElementsByClassName("special")[1].style.color = "#333333";
}

//Here is the actual reset function. It just removes the active class from all buttons
function reset() {
    defaultButton.classList.remove("active");
    colorfulButton.classList.remove("active");
    lightButton.classList.remove("active");
}



/*************************************************FORM:*************************************************/



//Form selector + event listener
let myForm = document.getElementById("myForm");
myForm.addEventListener("submit", validateForm);


//This function validates the form. It checks each input for validity, if its invalid the form is not submitted
//Side note: there is no backend, the form does nothing and does not contact me
function validateForm(event) {

    //Value "getters". There are 6 inputs to get and one to display error messages
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("emailForm").value;
    let phone = document.getElementById("phone").value;
    let country = document.getElementById("country").value;
    let message = document.getElementById("message").value;
    let error = document.getElementById("error");

    //Regular expressions. First is my own and the second one is cited and encompasses all (as far as I can tell) emails
    let phoneREGEX = /^(\(\d\d\d\)\ \d\d\d\-\d\d\d\d)$/
    let emailREGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //[6]

    //Conditions, fname and lname must be filled in to continue
    if (fname == "") {
        event.preventDefault();
        error.innerHTML = "Please fill in your First Name";
    }
    else if (lname == "") {
        event.preventDefault();
        error.innerHTML = "Please fill in your Last Name";
    }
    else if (!emailREGEX.test(email)) { //Test email on the regular expression, required
        event.preventDefault();
        error.innerHTML = "Please enter a proper email";
    }
    else if (!phoneREGEX.test(phone) && !(phone == "")) { //Test email on the regular expression, not required
        console.log(phone.value);
        event.preventDefault();
        error.innerHTML = "Invalid USA/CAN phone number";
    }
    else if (country == "---") { //If the user has yet to select a Country
        event.preventDefault();
        error.innerHTML = "Please fill in your Country";
    }
    else if (message == "") { //If the user has yet to enter a message
        event.preventDefault();
        error.innerHTML = "Please enter a message";
    }
    else {
        alert("Contact Me Form Submitted!"); //"Notification?"
        error.innerHTML = ""; //Reset error message upon completion (page is refreshed anyways so not super necessary)
    }
}