
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if( !started ){
        $("#level-title").text("Level "+ level);//____________
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");//_____________
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);//_____________
});


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {//_____________
        
        console.log("Success");

        if( userClickedPattern.length === gamePattern.length ){//___________
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");


        startOver();
    }

}

function nextSequence(){

    userClickedPattern = [];//________
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor( Math.random()*4 );
    var randomChosenColour = buttonColours[ randomNumber ];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

// alert("Systems are Online");
function startOver(){

    
    level = 0;
    gamePattern = [];
    started = false;
}
