var markerIndex = 0;
var gameState = -1;
var countdown = 0;
var markerClicks = [];
var startTimestamp = 0;

function nextMarker(){
    if(gameState != 1){return;}
    if(markerIndex==8){
        end();
        return;
    }
    $($(".marker")[markerIndex]).addClass("hide");
    markerIndex++;
    $($(".marker")[markerIndex]).removeClass("hide");
}

function init(noNewEvents){
    $("#top-text").html("Zum Starten klicken");
    markerClicks = [];
    for(marker of $(".marker")){
        $(marker).addClass("hide");
        if(!noNewEvents){
            $(marker).on("mousedown", (event) => {
                $(event.target).addClass("green")
            }).on("mouseup", (event) => {
                if($(event.target).hasClass("hide")==false){
                    //console.log(Date.now());
                    console.log(event);
                    let precision = calculateClickPrecision(event);
                    markerClicks.push(precision.off_diagonal);
                    console.log("Precision:", calculateClickPrecision(event));
                    nextMarker();
                    $(event.target).removeClass("green");
                }
            })
            $(document).on("click", (event) => {
                if(gameState == 0){
                    startCountdown();
                }
                if(gameState == -1){
                    console.log("Onclick gamestate==-1");
                    setTimeout(function(){init(true)}, 10);
                }
            })
        }
    }
    gameState = 0; 
}

function startCountdown(){
    if(countdown>0){return;}
    console.log("Countdown started");
    countdown = 3;
    $("#top-text").html("");
    $("#countdown").html(countdown);
    setTimeout(function (){countdownStep()}, 800);
}

function countdownStep(){
    console.log("Countdown:", countdown);
    countdown--;
    if(countdown<=0){
        $("#countdown").html("");
        start();
    }else{
        $("#countdown").html(countdown);
        setTimeout(function (){countdownStep()}, 800);
    }
}

function start(){
    markerIndex = 0;
    $($(".marker")[0]).removeClass("hide");
    $("#top-text").html("Drücken Sie auf den Mittelpunkt des Ziel und lassen Sie los");
    gameState = 1;
    startTimestamp = Date.now();
}

function end(){
    var time = Date.now() - startTimestamp;
    console.log("Time and clicks:", time, markerClicks);
    var score = calculateScore(time);
    var highscoreString = localStorage.getItem('highscore');
    var highscore;
    if(!highscoreString || parseInt(highscoreString)<score) {
        localStorage.setItem('highscore', score);
        highscore = score;
    } else {
        highscore = parseInt(highscoreString);
    }

    console.log("Ended");
    $($(".marker")[8]).addClass("hide");
    setTimeout(() => {
        console.log("Set gameState to -1");
        gameState=-1;
        $("#top-text").html("Score:<br>"+score+"<br><br>Highscore:<br>"+highscore);
    }, 10);
}

function calculateScore(time){
    //Average of precision
    let sum=0;
    for(let i of markerClicks){sum+=i}
    let precisionAverage = (sum/markerClicks.length);
    let precisionScore = 0;
    if(precisionAverage < 22){
        precisionScore = 50 / precisionAverage;
    }
    console.log("Precision:", precisionAverage, precisionScore);
    
    //Time score
    let timeScore = 0;
    if(time/1000 < 60 ){
        timeScore = 550 / (time/1000);
    }

    //Score
    return Math.round(precisionScore * timeScore);
    
}

function calculateClickPrecision(event){
    let ev_x = event.pageX;
    let ev_y = event.pageY;

    let e_bounds = event.target.getBoundingClientRect();
    let e_x = e_bounds.left + (e_bounds.right-e_bounds.left)/2;
    let e_y = e_bounds.top + (e_bounds.bottom-e_bounds.top)/2;

    //console.log(e_x, e_y, ev_x, ev_y);
    let off_x = Math.abs(e_x - ev_x);
    let off_y = Math.abs(e_y - ev_y);
    let off_diagonal = Math.sqrt(off_x**2 + off_y**2);

    return {off_x: off_x, off_y: off_y, off_diagonal: off_diagonal}
}

init();