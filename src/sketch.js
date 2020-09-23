var field = new Field(width, height);
var delay_time = movementDelay;
var delay_timeout;
var update_interval;
var move_interval;
var down_interval;
var remaining;
var startTime;
var speed_moving = false;
var pause = false;

function preload() {
  font = loadFont('./assets/font/PressStart2P-Regular.ttf');
}

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  update_interval = setInterval(function(){field.update();}, timer);
  down_interval = setInterval(function(){field.downMove();}, move_timer);
}

function draw() {
  if(!pause){
    background(238,238,238);
    field.placeHint();
    field.show();
  }else if(pause){
    background(255,255,255,125);
    field.showWords('PAUSE', pause_x, pause_y, pause_size);
  }
}

function keyPressed() {
  speed_moving = false;
  if(!pause){
    if(keyCode == 80){
      clearInterval(update_interval);
      clearInterval(move_interval);
      clearInterval(down_interval);
      pause = !pause;
      noLoop();
    }else if(keyCode == UP_ARROW || keyCode == 32 || keyCode == DOWN_ARROW || keyCode == 67){
      field.pressMove();
    }else{
      field.leftRightMove();
      clearInterval(move_interval);
      clearTimeout(delay_timeout);
      delay_timeout = setTimeout(setMove, delay_time);
    }
  }else if(pause){
    if(keyCode == 80){
      update_interval = setInterval(function(){field.update();}, timer);
      down_interval = setInterval(function(){field.downMove();}, move_timer);
      pause = !pause;
      loop();
    }
  }
}

function keyReleased() {
  if((keyCode == RIGHT_ARROW && keyIsDown(LEFT_ARROW)) || (keyCode == LEFT_ARROW && keyIsDown(RIGHT_ARROW))){
    if(speed_moving){
      field.leftRightMove();
      clearInterval(move_interval);
      clearTimeout(delay_timeout);
      delay_timeout = setTimeout(setMove, delay_time);
    }
  }
}

function setMove() {
  clearInterval(move_interval);
  move_interval = setInterval(function(){field.leftRightMove();}, move_timer);
  speed_moving = true;
}
