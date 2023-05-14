let btnColor=["red","blue","yellow","green"];

let gamePattern=[];
let userClickedPattern=[];

let started=false;
let level=0;

// Chainging the level

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        $(".pTag").css("display", "none")
        newSequence();
        started=true;
    }
});


// Returns the button that the user clicked

$(".btn").click(function(){
    let clickedVal= $(this).attr('id');
    userClickedPattern.push(clickedVal);

    playSound(clickedVal);
    animate(clickedVal);

    checkAnswer(userClickedPattern.length-1);
})

// Playing sound

function playSound(name){
    let audio= new Audio("sounds/"+ name+ ".mp3");
    audio.play();
}

// Animation

function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Checking pattern

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          newSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// new sequwnce generator

function newSequence(){
  userClickedPattern=[];
  level++;

  $("#level-title").html("Level "+ level);
  let randomNum=Math.floor(Math.random()*4);
  let randomColor= btnColor[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}