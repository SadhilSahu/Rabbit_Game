const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var link;
var rabbit_image, melon_image, bg_image,cut_button_image;
var bunny;
var blink,eat,sad;

function preload(){
  rabbit_image=loadImage("Rabbit.png");
  melon_image=loadImage("melon.png");
  bg_image=loadImage("background.png");
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}
 


function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  button=createImg("cut_button.png");
  button.position(200,50);

  button.mouseClicked(drop);

  button.size(50,50)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,700,600,20);



  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny=createSprite(250,650,100,100);
  bunny.addImage(rabbit_image);
 bunny.scale=0.2;bunny.scale = 0.2;

 bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
 

  rope = new Rope (8,{x:220,y:30})

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit); 

  

  link = new Link (rope, fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image (bg_image, width/2,height/2,500,700);
  ground.show();
  rope.show();
  image(melon_image,fruit.position.x,fruit.position.y,60,60);

  Engine.update(engine);

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }
  
  if(collide(fruit,ground.body)==true)
  {
    bunny.changeAnimation('crying');
  }

 drawSprites();
   
}


function drop(){
  rope.break();
  link.detached();
  link=null;
}


function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80)
    {
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}