/*
function description() {
    console.log(data[0].description)
    console.log(data[1].description)
    console.log(data[2].description)
    console.log(data[3].description)
}   
description();

*/
let nbqst = 1;
let id = new URL(location.href).searchParams.get("liste");
let currentqst = 0;
let bonneReponse = 0;
window.onload = initList();
/**
 * inittialise la liste avec une boucle 
 * et affiche les differente description du fichier data
 */
function initList() {
    for (let i = 0; i < data.length; i++) {
        $("#select").append($("<option>").val(data[i].id).text(data[i].description));

    }
}

function afch() {

    let id = new URL(location.href).searchParams.get("liste");
    console.log(id);
}

/**
 * display the theme of game
 * 
 */
function displaytitle() {


    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            document.getElementById('title').textContent = "QUIZ SUR LE THEME :" + data[i].description;

        }

    }

}

/**
 * 
 * display the question 
 * 
 */
function qst() {
    console.log(currentqst);
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            document.getElementById('qst').textContent = "Question " + nbqst + ":" + data[i].questions[currentqst].question;

        }
    }
}

function displaybutton() {

    let questions;
    for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
            questions = data[i].questions[currentqst];

        }
    }
    let answer = (questions.answer + " " + questions.extras).split(" ");

    shuffle(answer);

    for (let i = 0; i < answer.length; i++) {
        $("#mots").append($("<button>").text(answer[i]).addClass("espace").addClass("answerbouton").one("click", placerMot));
    }
}

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        // Swap positions counter and index in the array.
        [array[counter], array[index]] = [array[index], array[counter]];
    }
}


function placerMot() {
    $("#zone").append($(this).one("click", retirerMot));

}


function retirerMot() {
    $("#mots").append($(this).one("click", placerMot));

}

function verif() {
    // $(".boutton").one("click", function() {
    let phrase = $("#zone").children();
    let reponse = "";
    for (i = 0; i < phrase.length; i++) {
        reponse += $(phrase[i]).text();
        if (i != phrase.length - 1) {
            reponse += " ";
        }

    }
    let index = data.find(item => item.id === id);
    if (reponse != index.questions[currentqst].answer) {

        $("#result").append($("<p>").addClass("bad").text("Mauvaise réponse"));

    } else {

        $("#result").append($("<p>").addClass("good").text("Bonne réponse"));
        bonneReponse = bonneReponse + 1;
    }
    $(".boutton").hide();
    $(".answerbouton").attr("disabled", true);
    // })


}



function passe() {

    console.log("ok");
    currentqst = currentqst + 1;
    nbqst = nbqst + 1;
    $("#passe").on("click")
    $("#mots").empty();
    $("#zone").empty();
    $("#result").empty();
    $(".boutton").show();


    qst();
    displaybutton();
    let index = data.find(item => item.id === id);
    if (nbqst > index.questions.length) {

        fin();
    }
    // verif();
}

function fin() {

    $("#bonne").append($("<p>").text("vous avez " + bonneReponse + "bonne réponse"));

}