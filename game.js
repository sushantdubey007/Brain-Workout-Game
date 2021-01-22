
var started=false;
var level=0;

var userClickedPattern = [];
var gamePattern=[];

var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var randomNumber=1;

function nextSequence(){
 userClickedPattern = [];

  level++;
  $("#level-title").text("Level-"+level);

  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();

}

/*
randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
$("#"+randomChosenColour).on("click",function(){
  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();
})
*/
/*
function handlerFunction(){
  var userChosenColour=$(this).text();
  console.log(userChosenColour);
}
*/
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
     $("#"+currentColour).removeClass("pressed");
 },100); //delay is in milliseconds
}


$(document).keypress(function(){
  if(started==false){
    $("#level-title").text("Level-"+level);
    nextSequence();
    started = true;
    $("#start-btn").hide();
  }
})

$("#start-btn").on("click",function(){
  if(started==false){
    $("#level-title").text("Level-"+level);
    nextSequence();
    started = true;
    $("#start-btn").hide();
  }
})


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
       $("body").removeClass("game-over");
   },200); //delay is in milliseconds
   $("#level-title").text("Game-Over Click Start Button for New Game");
   started=false;
   userClickedPattern=[];
   gamePattern=[];
   level=0;
   $("#start-btn").show();
  }
}
