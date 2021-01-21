class Game{
    constructor(){
    }
    //reads the gameState value from the database
    getState(){
        database.ref("gameState").on("value",function(data){
            gameState = data.val();
        })
    }
    //writes the gameState value to the database
    updateState(state){
        database.ref("/").update({
            gameState: state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var PlayerCountRef = await database.ref("playerCount").once("value");
            if(PlayerCountRef.exists()){
                playerCount = PlayerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        Car1 = createSprite(100,200);
        Car1.addImage(CarImg1);
        Car2 = createSprite(300,200);
        Car2.addImage(CarImg2);
        Car3 = createSprite(500,200);
        Car3.addImage(CarImg3);
        Car4 = createSprite(700,200);
        Car4.addImage(CarImg4);
        Cars = [Car1, Car2, Car3, Car4];
    }
    play(){
        form.Hide();
        Player.getPlayerInfo()
        if(players !== undefined){
            background("pink");
            image(TrackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
            var index = 0;
            var x = 175;
            var y;
            for(var i in players){
                index++
                x+=200
                y=displayHeight - players[i].distance
                Cars[index - 1].x = x;
                Cars[index - 1].y = y;
                if(index === player.index){
                    fill("green");
                    ellipse(x,y,60,60);
                    camera.position.x = displayWidth/2
                    camera.position.y = Cars[index-1].y
                }
            }
        }
        if(keyDown("UP_ARROW") && player.index !== null){
            player.distance += 10
            player.updateInfo();
        }
        player.getCarsAtEnd();
        if(player.distance>3500){
            gameState = 2;
            player.rank++
            Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }
    end(){
        console.log("Game Over");
        console.log(player.rank);
    }
}