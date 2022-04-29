// Author: Drew Walizer
// Date: 10/4/21
// Rock, Paper, Scissor, Lizzard, Spock Game implementation 

// Scores for the user and cpu.
var userScore = 0;
var cpuScore = 0;

// Text of the user and cpu's scores.
var userScore_span = document.getElementById("user-score");
var cpuScore_span = document.getElementById("cpu-score");

// The text that displays the result of the game.
var result_p = document.querySelector("#result p");

// The different moves you can pick when playing the game.
var rock_div = document.getElementById("rock");
var paper_div = document.getElementById("paper");
var scissor_div = document.getElementById("scissor");
var lizard_div = document.getElementById("lizard");
var spock_div = document.getElementById("spock");

// Reset button
var reset_div = document.getElementById("reset");

// Get the CPU's move. 
function getCpuChoice() {
    var choices = ["r", "p", "sc", "l", "sp"];
    var index = Math.floor(Math.random() * 5);
    return choices[index];
}

// Determines if the user won, lose, or tied.
function game(userChoice) {
    var cpu = getCpuChoice();
    switch (userChoice + cpu) {
        case "rsc":
        case "rl":
        case "scp":
        case "scl":
        case "pr":
        case "psp":
        case "lsp":
        case "lp":
        case "spsc":
        case "spr":
            win(userChoice + cpu);
            break;
        case "scr":
        case "lr":
        case "psc":
        case "lsc":
        case "rp":
        case "spp":
        case "spl":
        case "pl":
        case "scsp":
        case "rsp":
            lose(userChoice + cpu);
            break;
        default:
            draw();
            break;

    }
}


// If the user won change the result text to say how they won. 
function win(userWon) {


    userScore++;
    userScore_span.innerHTML = userScore;
    
    if (userScore == 10) {
        result_p.innerHTML = "You have reached 10 first. You Win!";
        finish();
    }
    else if (userWon == "rsc") {
        result_p.innerHTML = "Rock Crushes Scissors. You Win!";
    }
    else if (userWon == "rl") {
        result_p.innerHTML = "Rock Crushes Lizard. You Win!";
    }
    else if (userWon == "scp") {
        result_p.innerHTML = "Scissors Cuts Paper. You Win!";
    }
    else if (userWon == "scl") {
        result_p.innerHTML = "Scissors Decapites Lizard. You Win!";
    }
    else if (userWon == "pr") {
        result_p.innerHTML = "Paper Covers Rock. You Win!";
    }
    else if (userWon == "psp") {
        result_p.innerHTML = "Paper Desproves Spock. You Win!";
    }
    else if (userWon == "lsp") {
        result_p.innerHTML = "Lizard Poisons Spock. You Win!";
    }
    else if (userWon == "lp") {
        result_p.innerHTML = "Lizard Eats Paper. You Win!";
    }
    else if (userWon == "spsc") {
        result_p.innerHTML = "Spock Smashes Scissors. You Win!";
    }
    else if (userWon == "spr") {
        result_p.innerHTML = "Spock Vaporizes Rock. You Win!";
    }

}


// If the CPU won change the result text to say how they lost. 
function lose(userLost) {

    cpuScore++;
    cpuScore_span.innerHTML = cpuScore;
    
    if (cpuScore == 10) {
        result_p.innerHTML = "CPU has reached 10 first. CPU Wins!";
        finish();
    }
    else if (userLost == "scr") {
        result_p.innerHTML = "Rock Crushes Scissors. You Lose!";
    }
    else if (userLost == "lr") {
        result_p.innerHTML = "Rock Crushes Lizard. You Lose!";
    }
    else if (userLost == "psc") {
        result_p.innerHTML = "Scissors Cuts Paper. You Lose!";
    }
    else if (userLost == "lsc") {
        result_p.innerHTML = "Scissors Decapites Lizard. You Lose!";
    }
    else if (userLost == "rp") {
        result_p.innerHTML = "Paper Covers Rock. You Lose!";
    }
    else if (userLost == "spp") {
        result_p.innerHTML = "Paper Desproves Spock. You Lose!";
    }
    else if (userLost == "spl") {
        result_p.innerHTML = "Lizard Poisons Spock. You Lose!";
    }
    else if (userLost == "pl") {
        result_p.innerHTML = "Lizard Eats Paper. You Lose!";
    }
    else if (userLost == "scsp") {
        result_p.innerHTML = "Spock Smashes Scissors. You Lose!";
    }
    else if (userLost == "rsp") {
        result_p.innerHTML = "Spock Vaporizes Rock. You Lose!";
    }

}

// If there is a draw tell the user that the result was a draw.
function draw() {
    console.log("draw");
    result_p.innerHTML = "There was a Draw! Play again!";
}

// Removes all eventListeners from the game.
function finish() {
    rock_div.removeEventListener("click", rock);
    paper_div.removeEventListener("click", paper);
    scissor_div.removeEventListener("click", scissor);
    lizard_div.removeEventListener("click", lizard);
    spock_div.removeEventListener("click", spock);
}

// Resets the game so user doesn't have to reload the page to play again.
function reset () {
    userScore = 0;
    cpuScore = 0;
    cpuScore_span.innerHTML = cpuScore;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = "Click the Images to Play!"
    rock_div.addEventListener("click", rock);
    paper_div.addEventListener("click", paper);
    scissor_div.addEventListener("click", scissor);
    lizard_div.addEventListener("click", lizard);
    spock_div.addEventListener("click", spock);
}


// Functions for the different game moves to call. 
function rock() { game("r"); }
function paper() { game("p"); }
function scissor() { game("sc"); }
function lizard() { game("l"); }
function spock() { game("sp"); }

// add EventListeners to the game.
rock_div.addEventListener("click", rock);
paper_div.addEventListener("click", paper);
scissor_div.addEventListener("click", scissor);
lizard_div.addEventListener("click", lizard);
spock_div.addEventListener("click", spock);

// add EventListener to reset the game.
reset_div.addEventListener("click", reset);


