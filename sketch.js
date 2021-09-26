var gamestate = "play"


function preload(){

  climberimg = loadImage("climber.png")
  ghostimg = loadImage("ghost-standing.png")
  doorimg = loadImage("door.png")
  towerimg = loadImage("tower.png")

}

function setup(){
createCanvas(500,600)
tower = createSprite(250 ,200 , 0 , 0);
tower.addImage(towerimg)
ghost = createSprite(300 ,300, 50 , 50);
ghost.addImage(ghostimg)
ghost.scale = 0.5

doorgroup = createGroup()
climbergroup  = createGroup()
invisgroup = createGroup()

}

function draw(){
background("black")

if(gamestate === "play"){

    if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3
    }
    
    if(keyDown("right_arrow")){
        ghost.x = ghost.x + 3
    }
    
    if(keyDown("space")){
        ghost.velocityY = -8
    }
    ghost.velocityY = ghost.velocityY + 0.4 
    
    tower.velocityY = + 2   
    
    if(tower.y>500){
        tower.y = 200 
    }
    
    spawndoors();
    if(ghost.isTouching(climbergroup)){
        ghost.velocityY = 0
    } 

    if(ghost.y > 600 || ghost.isTouching(invisgroup)){
        gamestate = "end"    
    }
}


else{
  tower.destroy()    
  ghost.destroy()
  doorgroup.destroyEach()    
  climbergroup.destroyEach()
  invisgroup.destroyEach()
  textSize(30)
  fill("red")
  text("GAME OVER! " , 180 , 300   )


}



drawSprites();
  
}

 function spawndoors(){
     if(frameCount%250 === 0){

        door = createSprite(Math.round(random(40 , 450 )),-10)
        door.addImage(doorimg);
        door.velocityY = 2
        climber = createSprite(door.x , 45)
        climber.addImage(climberimg)
        climber.velocityY = 2 
        door.depth = ghost.depth 
        ghost.depth += 1
        invis = createSprite(door.x , 55 , climber.width , 10)
        invis.velocityY = 2 
        invis.visible = false
       doorgroup.add(door)
       climbergroup.add(climber)
       invisgroup.add(invis)
     }
    

 }