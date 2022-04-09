var field = new Field(width, height);
var delay_time = movementDelay;
var delay_timeout;
var update_interval;
var move_interval;
var down_interval;
var speed_moving = false;
var pause = false;
var instruct_clicked = false;

function preload() {
  font = loadFont('./assets/font/PressStart2P-Regular.ttf');
}

function setup() {
  var canvas = createCanvas(canvasWidth + helperWidth, canvasHeight + borderWeight*2);
  canvas.style('padding-left', helperWidth + 'px');
  update_interval = setInterval(function(){field.update();}, timer);
  down_interval = setInterval(function(){field.downMove();}, move_timer);
}

function reset() {
  field = new Field(width, height);

  // from const.js
  gravity = 48; // Gravity frames
  timer = (gravity/framesPerSec)*1000;

  speed_moving = false;
  pause = false;
  instruct_clicked = false;

  clearInterval(move_interval);
  clearTimeout(delay_timeout);

  setup();
  loop();
}

function draw() {
  if(field.isLose()) {
    background(255,255,255,200);
    pause_field();
    field.showWords('Game Over', gameOver_x, gameOver_y-1, gameOver_size);
    field.showWords('Play Again', gameOver_x, gameOver_y+1, gameOver_size-20);
  } else {
    if(!pause && !instruct_clicked){
      field.placeHint();
      field.show();
      drawHelper();
    }else if(pause && !instruct_clicked){
      background(255,255,255,200);
      field.showWords('PAUSE', pause_x, pause_y, pause_size);
    }else if(instruct_clicked) {
      background(255,255,255,200);
      drawInstruction();
    }
  }
}

function keyPressed() {
  speed_moving = false;
  if(!pause){
    if(keyCode == 80 || keyCode == 27){
      pause_field();
    }else if(keyCode == UP_ARROW || keyCode == 32 || keyCode == DOWN_ARROW || keyCode == 67){
      field.pressMove();
    }else{
      field.leftRightMove();
      clearInterval(move_interval);
      clearTimeout(delay_timeout);
      delay_timeout = setTimeout(setMove, delay_time);
    }
  }else if(pause){
    if(!instruct_clicked) {
      if(keyCode == 80 || keyCode == 27){
        unpause_field();
      }
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

function mouseMoved() {
  // console.log("Perhaps");
  if(field.isLose()) {
    var x = offset_x + gameOver_x*blockSize;
    var y = offset_y + (gameOver_y+1)*blockSize;
    if(mouseX >= x - 30 && mouseX <= x + 130 && mouseY >= y -20 && mouseY <= y + 0) {
      console.log("YES");
      fill('#38bdf8');
      text('Play Again', x, y);
    } else {
      field.showWords('Play Again', gameOver_x, gameOver_y+1, gameOver_size-20);
    }
  }
}

function mouseClicked() {
  if(field.isLose()) {
    var x = offset_x + gameOver_x*blockSize;
    var y = offset_y + (gameOver_y+1)*blockSize;
    if(mouseX >= x - 30 && mouseX <= x + 130 && mouseY >= y -20 && mouseY <= y + 0) {
      reset();
    }
  } else {
    if(mouseX >= instruction_x-instruction_radius && mouseX <= instruction_x+instruction_radius && mouseY >= instruction_y-instruction_radius && mouseY <= instruction_y+instruction_radius) {
      pause_field();
      instruct_clicked = true;
    } else {
      unpause_field();
      instruct_clicked = false;
    }
  }
}

function pause_field() {
  clearInterval(update_interval);
  clearInterval(move_interval);
  clearInterval(down_interval);
  pause = true;
  noLoop();
}

function unpause_field() {
  if(!field.isLose()) {
    clearInterval(update_interval);
    clearInterval(move_interval);
    clearInterval(down_interval);
    update_interval = setInterval(function(){field.update();}, timer);
    down_interval = setInterval(function(){field.downMove();}, move_timer);
    pause = false;
    loop();
  }
}
