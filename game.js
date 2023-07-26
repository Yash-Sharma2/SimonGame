var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var level=0;
var gameInProgress=false;
var userPointer=0;
function nextSequence(){
  level++;
  userPointer=0;
  $("#level-title").text("Level "+level);
  var nextSequenceRes=Math.floor(Math.random()*4);
  setTimeout(function(){
    playSound(buttonColours[nextSequenceRes]);
    animatePress(buttonColours[nextSequenceRes]);
  },500);
  gamePattern.push(nextSequenceRes);
}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function gameOver(){
  $("#level-title").text("Game Over!");
  playSound("wrong");
  userPointer=0;
  gamePattern=[];
  level=0;
  gameInProgress=false;
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
}
$(document).keypress(function(e){
  if(!gameInProgress){
    gameInProgress=true;
    nextSequence();
  }
});

$(".btn").click(function(e){
  if(gameInProgress){
    userChosenColour=$(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if(buttonColours[gamePattern[userPointer]]==userChosenColour){
      userPointer++;
      if(userPointer==gamePattern.length){
        setTimeout(nextSequence,200);
        }
    }else{
      gameOver();
    }
  }
});
