// var pieces = [new Itetromino(1,1), new Otetromino(6,1), new Ttetromino(9,1), new Stetromino(1,5), new Ztetromino(5,5), new Jtetromino(9,5), new Ltetromino(1,8)];
// var piece2 = new Ltetromino(3,18);
var field = new Field(width, height);

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  // block = new Block(300, 0);
  // setInterval(function(){pieces.forEach((piece) => {piece.update()});}, timer);
  // setInterval(function(){piece.moveDown();}, timer);
  setInterval(function(){field.update();}, timer);
}

function draw() {
  background("white");

  // pieces.forEach((piece) => {piece.show()});
  field.show();
  // piece2.show();
}

function keyPressed() {
  field.moveTetromino(keyCode);
}
