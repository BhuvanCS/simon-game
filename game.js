var currLevel = 1;
var gamePattern = [];
var userPattern = [];
var btnColors = ["green","red","yellow","blue"];

function playSound(btnID){
    var sound = new Audio("./sounds/"+btnID+".mp3");
    sound.play();
}

function performAnimation(btnID) {
    $("#"+btnID).addClass("pressed");
    setTimeout(function() {
        $("#"+btnID).removeClass("pressed");
    },100)
}
function nextSequence() {
    userPattern = [];
    $("#level-title").text("Level "+ currLevel++);
    var randomNum = Math.floor(Math.random()*4);   
    gamePattern.push(btnColors[randomNum]);
    //console.log(gamePattern); 
    performAnimation(btnColors[randomNum]);
    playSound(btnColors[randomNum]);
}
function checkPattern(){
    for(let i = 0; i<userPattern.length; i++){
        if(gamePattern[i] !== userPattern[i])
            return true;
    }
    return false;
}

function gameOverFunction() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over!! Press Any key to restart!");
    gamePattern = userPattern = [];
    currLevel = 1;
}

function userAction(btnID){
    userPattern.push(btnID);
    //console.log(userPattern);
    performAnimation(btnID);
    var gameOver = checkPattern();
    console.log(gameOver);
    if(gameOver === true)
        btnID = "wrong";
    playSound(btnID);
    if(gameOver === true){
        gameOverFunction();
    }
    else{
        if(gamePattern.length === userPattern.length){
            setTimeout(nextSequence, 1000);
        }
    }
}

$(".btn").on("click",function(){
    //console.log(this.id);
    userAction(this.id);
})

$(document).on("keydown",function(){
    nextSequence();
});

