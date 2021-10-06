var girl, girlImg;    
var mask, maskImg;
var sanitizer, sanitizerImg;
var virus, virusImg, virusGrp;
var bgImg;
var road;
var covidPositiveImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
  girlImg = loadImage("girl.png");
  virusImg = loadImage("virus img 3.jpg");
  maskImg = loadImage("mask.png");
  sanitizerImg = loadImage("sanitizer.png");
  bgImg = loadImage("BG IMG.jpeg");
  covidPositiveImg = loadImage("covid positive.jpg");
}


function setup() {
  createCanvas(1000, 600);
  
  road = createSprite(500,300);
  road.scale = 1.3;
  road.velocityY = 2;
  road.addImage(bgImg);
  road.velocityY = 3;
  
  girl = createSprite(100,160,20,50);
  girl.addImage(girlImg);
  girl.scale = 0.3;

  edges = createEdgeSprites();
  girl.collide(edges);
  
  virusGrp = new Group();
  maskGrp = new Group();
  sanitizerGrp = new Group();
  
    invisibleleftboundary = createSprite(0,300,5,1000);
  
  
  invisiblerightboundary = createSprite(1000,300,5,1000);


}

  function draw() {
     background(0);
     if(gameState === PLAY){

          girl.x = mouseX;

          if(road.y>300){
            road.y = height/2;
          }

          createMask();
          createSanitizer();

          if(maskGrp.isTouching(girl)){
            maskGrp.detroyEach();
            score = score+50;
          }
          if(sanitizerGrp.isTouching(girl)){
            sanitizerGrp.destroyEach();
            score = score+100;
          }

        
      
        obs();
        if(virusGrp.isTouching(girl)){
          gameState = END;
        }

        
        
        drawSprites();
     }

    else if(gameState === END){
      background("white");
      textSize(40);
      stroke("violet");
      strokeWeight(5);
      fill("magenta");
      text(" YOU LOST " ,400,300);
      image(covidPositiveImg , 100,200,250,250);

      maskGrp.setVelocityYEach(0);
      sanitizerGrp.setVelocityYEach(0);
      virusGrp.setVelocityYEach(0);

      
    }
    
}
function obs(){
  if(frameCount%100 === 0){
    virus = createSprite(200, -50);
    virus.addImage(virusImg);
    virus.scale = 0.3;
    virus.x = Math.round(random(120, 400));
    virus.velocityY = 1;
    virus.lifetime = 800;
    virusGrp.add(virus);
  }
  
  function createMask() {
    if (World.frameCount % 200 == 0) {
    mask = createSprite(Math.round(random(50,width-50),40, 10, 10));
    mask.addImage(maskImg);
    mask.scale=0.12;
    mask.velocityY = 3;
    mask.lifetime = 190;
    maskGrp.add(mask);
    }
  }

  function createSanitizer() {
    if (World.frameCount % 300 == 0) {
    sanitizer = createSprite(Math.round(random(100,width-50),60, 20, 20));
    sanitizer.addImage(sanitizerImg);
    sanitizer.scale=0.12;
    sanitizer.velocityY = 3;
    sanitizer.lifetime = 190;
    sanitizerGrp.add(sanitizer);
    }
  }
  
  
  
  
}