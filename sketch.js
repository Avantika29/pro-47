const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var en, wld,Pgroup;
var enemy1, enemy2, enemy3;

var arrowMan,platform1,platform2,platform3,ground,roof, arrowmanImg, groundImg, iGround, arrowImg;
var score = 0;
var begin  = 0;
var PLAY  = 1;
var END = 2
var gameState =begin;
var eneEli,restart,restartImg;

function preload(){
arrowmanImg = loadAnimation("images/arrow_man.png");
groundImg = loadImage("images/ground.png")
arrowImg = loadImage("images/arrow.png")
deathImg = loadImage("images/deathStroke.png")
richardoImg = loadImage("images/Richardo.png")
s_Img = loadImage("images/start.png")
arrowRun = loadAnimation("images/run1.png","images/run2.png")
restartImg = loadImage("images/restart.png")

}

function setup(){
createCanvas(windowWidth,windowHeight)

// en = Engine.create();
// wld = en.world;

Pgroup = new Group()
Egroup = new Group()
Agroup = new Group()

// ground = new Ground(displayWidth/2, displayHeight - 50, displayWidth,120);

// platform1 = new Ground(400,displayHeight - 250,200,70)

// arrowMan  =  Bodies.rectangle(100,displayHeight -150,50,50.)
// World.add(wld,arrowMan);

ground  = createSprite(width/2, height-20,width, 20);
ground.addImage("ground", groundImg);
ground.scale  = 0.4;
//ground.debug = true;
ground.setCollider("rectangle",0,0,width,200)

restart = createSprite(100,150);
restart.addImage("re", restartImg);
restart.scale = 0.3;


// platform1 = createSprite(400,height - 250,200,70);
// platform1.addImage("platform1",groundImg)

// platform2 = createSprite(550,height - 150,200,70);
// platform2.addImage("platform2",groundImg)

// platform3 = createSprite( 700,height - 250,200,70)
// platform3.addImage("platform3",groundImg)




arrowMan  = createSprite(100,height - 100, 100,150);
arrowMan.addAnimation("man", arrowmanImg);
arrowMan.addAnimation("running", arrowRun);

arrowMan.scale  = 1.3;
//arrowMan.debug = true;




// arrow = createSprite(100,height - 100, 100,150)
// 
// arrow.scale  = 0.6;



iGround  = createSprite(width/2, height - 60, width, 10);
iGround.visible  = false

start = createSprite(300,150)
start.addImage(s_Img)
start.scale = 0.5;

}

function draw(){
    //Engine.update(en);
    background("white");

    textSize(22);
    fill("green");
    textStyle(BOLD);

   eneEli = text("ENEMIES ELIMINATED : "+score,camera.x, 50);

    if(score === 1){
        gameState = END;
     
        textSize(50)
        fill("black")
        textStyle(ITALIC)
        text("YOU WIN",camera.x - 100, 150)

        eneEli.visible = false;
        restart.visible = false;
    
      } 

      
      if(score < 0){
        gameState = END;
        textSize(50)
        fill("blue")
        textStyle(ITALIC)
        text("YOU LOSE",camera.x - 100, 150)    }


    if(gameState === begin){
       
start.visible  = true;
textSize(40)
fill("purple")
textStyle(ITALIC)
 startG = text("Press on Start Button to Begin", camera.x - 80, 120)

 restart.visible = false;

        if(mousePressedOver(start)){
            gameState = PLAY;
        }
    }else if(gameState === PLAY){

            start.visible  = false;
            startG.visible = false;
            restart.visible = false;
           
        camera.x = arrowMan.x;

    if(keyDown(UP_ARROW)){
        arrowMan.y -= 5;
    }

    if(keyDown(RIGHT_ARROW)){
        

        arrowMan.changeAnimation("running", arrowRun);
        arrowMan.x += 3;


    }
    //  if(keyWentUp(RIGHT_ARROW)){

    // }

    if(keyDown(DOWN_ARROW)){
        arrowMan.y += 5;
    }

    if(keyDown(LEFT_ARROW)){
        arrowMan.x -= 3;
    }

        //platform();
        makeEnemy1(); 
        makeEnemy2();
        //makeEnemy3();
        //start.visible  =false;
        if(keyDown("space")){
            //  arrowMan.velocityY = -5;
            arrowMan.changeAnimation("man",arrowmanImg)
           makeArrow();
          
          }
      
         for(var i  = 0; i<Egroup.length;i++){
              var enemy = Egroup.get(i)
              if(Agroup.isTouching(enemy) ){
                  enemy.destroy();
                Agroup.destroyEach();
                score = score + 1;

              }
              
             


               //camera.x = scor}
    }

    for(var i  = 0; i<Egroup.length;i++){
        var e = Egroup.get(i)
        if(arrowMan.isTouching(e) ){
            e.destroy();
          
          score = score - 1;
        }
    }

    for(var i  = 0; i<Egroup.length;i++){
        var ene = Egroup.get(i)
        if(Egroup.x < arrowMan.x - 150 ){
            ene.destroy();
          
          score = score - 1;
        }
    }

    // if(Egroup.isTouching(arrowMan) ){
    //     score = score - 1;
        
    // }

//     if(Egroup.x === arrowMan.x - 150 ){
// score = score - 1;
//     }
}

else if(gameState === END){
    Pgroup.destroyEach();
    Agroup.destroyEach();
    Egroup.destroyEach();

   
 


}

// if(mousePressedOver(restart)){
//     gameState = PLAY;
// }

if(gameState === END){

    restart.visible = true;
    fill("red")
    textSize(30)
    text("Press on Restart to Play Again",50,50)

}


   //arrowMan.velocityY = arrowMan.velocityY + 0.1;

   arrowMan.collide(iGround);

   
    
    drawSprites();

    
    // if(Agroup.isTouching(Egroup)){
    //    Egroup.destroyEach();
    //    Agroup.destroyEach();
    // }
   // arrowMan.velocityY = arrowMan.velocityY + 0.1;

   

// ground.display();
// platform1.display();

// imageMode(CENTER);
// image(this.arrowmanImg, arrowMan.position.x, arrowMan.position.y,100,150);

    
}

function platform(){
    if(frameCount % 100 === 0){
        var platform = createSprite(width,random(height/2 + 75,height/2 - 50),150,20);
        platform.velocityX = -5;
        Pgroup.add(platform)
        Pgroup.setLifetimeEach ( width/5);
        
        
    }
}

    function makeEnemy1(){
        if(frameCount % 150 === 0){
           enemy1 = createSprite(width,random(height/2 + 100,height/2 - 25),25,25);
           enemy1.addImage("enemy1",deathImg);
           enemy1.scale = 0.2
            enemy1.velocityX = -5;
           // Pgroup.add(platform)
           // Pgroup.setLifetimeEach ( width/5);
            Egroup.add(enemy1)
            
        }

    
}

function makeEnemy2(){
    if(frameCount % 200 === 0){
       enemy2 = createSprite(width,random(height/2 - 50,height/2 - 175),100,25);
       enemy2.addImage("enemy2",richardoImg);
       enemy2.scale = 0.2
        enemy2.velocityX = -5;
       // Pgroup.add(platform)
       // Pgroup.setLifetimeEach ( width/5);
        Egroup.add(enemy2)
        
    }


}

function makeEnemy3(){
    if(frameCount % 250 === 0){
       enemy3 = createSprite(width,random(height/2 - 250,height/2 - 350),40,25);
        enemy3.velocityX = -5;
       // Pgroup.add(platform)
       // Pgroup.setLifetimeEach ( width/5);
        Egroup.add(enemy3)
        
    }


}

function makeArrow(){
    arrow = createSprite(100,height - 190,5,5)
    arrow.scale = 0.3;
    arrow.velocityX = 4;
    arrow.lifetime = -7;
    arrow.addImage("arrow", arrowImg);
    arrow.y = arrowMan.y
    Agroup.add(arrow)
    arrow.x = arrowMan.x;
}

