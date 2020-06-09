var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudGroup, cloudImage
var cactusGroup, cactusImage1, cactusImage2, cactusImage3, cactusImage4, cactusImage5, cactusImage6
var score = 0

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  cactusImage1 = loadImage("obstacle1.png");
  cactusImage2 = loadImage("obstacle2.png");
  cactusImage3 = loadImage("obstacle3.png");
  cactusImage4 = loadImage("obstacle4.png");
  cactusImage5 = loadImage("obstacle5.png");
  cactusImage6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  cactusGroup = new Group(); 
  
}

function draw() {
  background(180);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  spawnObstacles();
  
  spawnClouds();
  
  drawSprites();
  
  score = score + Math.round(getFrameRate()/60)
  text("Score" + score, 500,50 );
}

function spawnClouds() {
   //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch (rand) {
        
      case 1: obstacle.addImage(cactusImage1);
        break;
      
       case 2: obstacle.addImage(cactusImage2);
        break;
      
       case 3: obstacle.addImage(cactusImage3);
        break;
      
       case 4: obstacle.addImage(cactusImage4);
        break;
      
       case 5: obstacle.addImage(cactusImage5);
        break;
      
       case 6: obstacle.addImage(cactusImage6);
        break;
      
      default:
        break;
       
    }   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    cactusGroup.add(obstacle);
    
  }
}





