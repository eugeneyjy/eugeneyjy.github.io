// var pieces = [new Itetromino(1,1), new Otetromino(6,1), new Ttetromino(9,1), new Stetromino(1,5), new Ztetromino(5,5), new Jtetromino(9,5), new Ltetromino(1,8)];
// var piece2 = new Ltetromino(3,18);
var field = new Field(width, height);
var delay_time = movementDelay;
var delay_timeout;
var update_interval;
var move_interval;
var down_interval;
var speed_moving = false;

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  update_interval = setInterval(function(){field.update();}, timer);
  down_interval = setInterval(function(){field.downMove();}, move_timer);
}

function draw() {
  background("white");
  field.show();
}

function keyPressed() {
  speed_moving = false;
  if(keyCode == UP_ARROW || keyCode == 32 || keyCode == DOWN_ARROW){
    field.pressMove();
  }else{
    field.leftRightMove();
    clearInterval(move_interval);
    clearTimeout(delay_timeout);
    delay_timeout = setTimeout(setMove, delay_time);
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
