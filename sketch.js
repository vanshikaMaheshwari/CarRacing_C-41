var gameState = 0;
var player, form, game, playerCount
var database;
var players;
var distance;
var Car1, Car2, Car3, Car4, Cars

function preload(){
    CarImg1 = loadImage("car1.png");
    CarImg2 = loadImage("car2.png");
    CarImg3 = loadImage("car3.png");
    CarImg4 = loadImage("car4.png");
    TrackImg = loadImage("track.jpg");
}

function setup(){
    createCanvas(displayWidth-30,displayHeight-130);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    
    if(playerCount === 4){
        game.updateState(1);
    }

    if(gameState === 1){
        clear();
        game.play();
    }

    if(gameState === 2){
        game.end();
    }
}
