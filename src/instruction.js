function drawHelper() {
  noFill();
  if(mouseX >= instruction_x-instruction_radius && mouseX <= instruction_x+instruction_radius && mouseY >= instruction_y-instruction_radius && mouseY <= instruction_y+instruction_radius) {
    stroke('black');
    strokeWeight(3);
    circle(instruction_x, instruction_y, instruction_radius*2);
    fill('black');
  } else {
    stroke('grey');
    strokeWeight(3);
    circle(instruction_x, instruction_y, instruction_radius*2);
    fill('grey');
  }
  strokeWeight(1);
  textSize(24);
  textStyle(NORMAL);
  textFont(font);
  textAlign(CENTER);
  text("?", canvasWidth+52, 38);
}

function drawInstruction() {
  var instruction_x = canvasWidth/2;
  var instruction_y = canvasHeight/2;
  var instruction_width = 400;
  var instruction_height = 450;
  var start_x = instruction_x/2;
  var start_y = (canvasHeight-instruction_height)/2;
  var paddingLeft = 20;
  var paddingTop = 50;
  fill('white');
  strokeWeight(borderWeight);
  rectMode(CENTER);
  rect(instruction_x, instruction_y, instruction_width, instruction_height);
  squareWithText(start_x + paddingLeft, start_y + 40, 32, '↑', 'Rotate right', 18);
  squareWithText(start_x + paddingLeft, start_y + 2*(paddingTop), 32, '←', 'Move left', 18);
  squareWithText(start_x + paddingLeft, start_y + 3*(paddingTop) + 10, 32, '→', 'Move right', 18);
  squareWithText(start_x + paddingLeft, start_y + 4*(paddingTop) + 20, 32, '↓', 'Soft drop', 18);
  squareWithText(start_x + paddingLeft, start_y + 5*(paddingTop) + 30, 32, 'P', 'Pause/Unpause', 18);
  squareWithText(start_x + paddingLeft, start_y + 6*(paddingTop) + 40, 32, 'C', 'Hold', 18);
  rectWithText(start_x + 20, start_y + 7*(paddingTop) + 50, 32, 100, 'Space', 'Hard drop', 18);

}

function squareWithText(x, y, size, word, description, text_size) {
  strokeWeight(2);
  rectMode(CENTER);
  fill('white');
  rect(x, y, size, size);
  textSize(text_size);
  textStyle(NORMAL);
  textFont(font);
  textAlign(CENTER, BOTTOM);
  fill('black');
  strokeWeight(1);
  // translate(1, 10);
  text(word, x+1, y+10);
  var textPadding = 70;
  textAlign(LEFT);
  text(description, x+textPadding, y+10);
}

function rectWithText(x, y, width, height, word, description, text_size) {
  strokeWeight(2);
  rectMode(CENTER);
  fill('white');
  rect(x, y, height, width);
  textSize(text_size);
  textStyle(NORMAL);
  textFont(font);
  textAlign(CENTER, BOTTOM);
  fill('black');
  strokeWeight(1);
  // translate(1, 10);
  text(word, x+1, y+10);
  var textPadding = 70;
  textAlign(LEFT);
  text(description, x+textPadding, y+10);
}
