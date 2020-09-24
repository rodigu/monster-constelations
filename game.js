var game_network;
var controller;
const INITIAL = Date.now(); // in millis

console.log(Date.now());
function setup(){
  noStroke();
  createCanvas(700, 500);
  background(0);
  controller = new Control();
  game_network = new GameNetwork();
  game_network.buildNetwork(15, 20);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == 'a')
    game_network.drawNetwork(1);
}

function draw(){
  background(0);
  controller.mouseController();
  let negative_nodes = game_network.network.negativeWeightNodes();
  if(negative_nodes.length == 0){
    fill(250);
    textAlign(CENTER, CENTER);
    text("WIN", width/2, height/2);
  }
  else
    game_network.drawNetwork(controller.mouse);
  console.log(controller.mouse);
}
