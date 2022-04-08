class Field {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.movingpiece;
    this.nextpiece;
    this.holdpiece = null;
    this.held = false;
    this.hint;
    this.lose = false;
    this.score = 0;
    this.lines = 0;
    this.level_need = 10;
    this.level = 0;
    this.last_random = -1;
    this.fillGrid();
    this.nextpiece = this.spawnTetromino(nextpiece_x,nextpiece_y);
    this.spawnNext();
  }

  fillGrid() {
    for(var y = 0; y < this.height; y++){
      this.grid.push([]);
      for(var x = 0; x < this.width; x++){
        this.grid[y].push(new Block(x,y));
      }
    }
  }

  showNextPiece() {
    var x = offset_x + (nextpiece_x-1)*blockSize;
    var y =  offset_y + (nextpiece_y-1.5)*blockSize;
    var side = 5*blockSize;
    fill(0);
    noStroke();
    textSize(text_size);
    textStyle(NORMAL);
    textFont(font);
    textAlign(CENTER);
    text('NEXT',x+side/2, y-0.5*blockSize);
    stroke(0);
    strokeWeight(bold);
    fill(255);
    rect(x, y, side, side);
    this.nextpiece.show();
  }

  showHoldingPiece() {
    var x = offset_x + (holdpiece_x-1)*blockSize;
    var y =  offset_y + (holdpiece_y-1.5)*blockSize;
    var side = 5*blockSize;
    fill(0);
    noStroke();
    textSize(text_size);
    textStyle(NORMAL);
    textFont(font);
    textAlign(CENTER);
    text('HOLD',x+side/2, y-0.5*blockSize);
    stroke(0);
    strokeWeight(bold);
    fill(255);
    rect(x, y, side, side);
    if(this.holdpiece)
      this.holdpiece.show();
  }

  showWords(words, x, y, font_size) {
    var x = offset_x + x*blockSize;
    var y = offset_y + y*blockSize;
    var side = 5*blockSize;
    fill(0);
    noStroke();
    textSize(font_size);
    textStyle(NORMAL);
    textFont(font);
    textAlign(CENTER);
    text(words, x, y);
  }

  showScoreBoard() {
    // this.showScore();
    // this.showLineCleared();
    var x = offset_x + (line_x-2.5)*blockSize;
    var y = offset_y + (score_y-1)*blockSize;
    var width = 5*blockSize;
    var height = 7.5*blockSize;
    stroke(0);
    strokeWeight(bold);
    fill(255);
    rect(x, y, width, height);
    this.showWords("SCORE", score_x, score_y, score_size);
    this.showWords(this.score, score_x, score_y+1, score_size);
    this.showWords("LINES", line_x, line_y, score_size);
    this.showWords(this.lines, line_x, line_y+1, score_size);
    this.showWords("LEVEL", level_x, level_y, score_size);
    this.showWords(this.level, level_x, level_y+1, score_size);
  }

  show() {
    rectMode(CORNER);
    stroke(0);
    strokeWeight(borderWeight);
    fill(238, 238, 238);
    rect(borderWeight, borderWeight, canvasWidth, canvasHeight);
    for(var y = 0; y < this.grid.length; y++){
      for(var x = 0; x < this.grid[y].length; x++){
        if(this.grid[y][x].state == 0)
          this.grid[y][x].show();
      }
    }
    stroke(0);
    strokeWeight(bold);
    noFill();
    rect(offset_x, offset_y, this.width*blockSize, this.height*blockSize);
    for(var y = 0; y < this.grid.length; y++){
      for(var x = 0; x < this.grid[y].length; x++){
        if(this.grid[y][x].state == 1)
            this.grid[y][x].show();
      }
    }
    if(this.hint)
      this.hint.show();
    this.movingpiece.show();
    this.showNextPiece();
    this.showHoldingPiece();
    this.showScoreBoard();
  }

  placeTetromino() {
    this.movingpiece.blocks.forEach(block => this.grid[block.y][block.x] = block.copyBlock());
  }

  clearLine(line) {
    for(var y = line; y > 0; y--){
      for(var x = 0; x < this.grid[y].length; x++){
        this.grid[y][x] = this.grid[y-1][x].copyBlock();
        this.grid[y][x].y++;
      }
    }
  }

  clearLines() {
    var linecleared = 0;
    for(var y = 0; y < this.grid.length; y++){
      var linefull = true;
      for(var x = 0; x < this.grid[y].length; x++){
        if(this.grid[y][x].state == 0){
          linefull = false;
        }
      }
      if(linefull){
        this.clearLine(y);
        linecleared++;
      }
    }
    // if(linecleared > 0){
    //   sleep(linesleep);
    // }
    return linecleared;
  }

  addScore(linecleared) {
    if(linecleared == 1)
      this.score += 40;
    else if(linecleared == 2)
      this.score += 100;
    else if(linecleared == 3)
      this.score += 300;
    else if(linecleared == 4)
      this.score += 1200;
    this.lines += linecleared;
  }

  isLose() {
    var losing = false;
    for(var x = 0; x < this.grid[0].length; x++){
      if(this.grid[0][x].state == 1){
        losing = true;
      }
    }
    return losing;
  }

  offsetPiece(piece) {
    if(piece instanceof Itetromino){
      piece.toLocation(piece.x-0.5, piece.y-0.5);
    }else if(piece instanceof Otetromino){
      piece.toLocation(piece.x-0.5, piece.y);
    }
    while(piece.form != 0){
      piece.rotate();
    }
  }

  spawnNext() {
    this.movingpiece = this.nextpiece.clonePiece();
    this.movingpiece.toLocation(starting_x, starting_y);
    this.nextpiece = this.spawnTetromino(nextpiece_x, nextpiece_y);
    this.offsetPiece(this.nextpiece);
  }

  adjustLevel() {
    if(this.lines >= this.level_need){
      this.level++;
      this.level_need += 10;
      this.adjustGravity();
    }
  }

  adjustGravity() {
    if(this.level >= 0 && this.level <= 8){
      gravity -= 5;
    }else if(this.level == 9){
      gravity -= 2;
    }else if(this.level == 10 || this.level == 13 || this.level == 16 || this.level == 19 || this.level == 29){
      gravity -= 1;
    }
    timer = (gravity/framesPerSec)*1000;
    clearInterval(update_interval);
    update_interval = setInterval(function(){field.update();}, timer);
  }

  update(type) {
    if(!this.lose){
      if(this.movingpiece.touchGround(this.grid)){
        var linecleared;
        this.placeTetromino();
        if(type != 0)
          sleep(putsleep);
        linecleared = this.clearLines();
        this.addScore(linecleared);
        this.lose = this.isLose();
        if(!this.lose)
          this.spawnNext();
        this.held = false;
        this.adjustLevel();
      }else{
        this.movingpiece.moveDown(1);
      }
    }
  }

  spawnTetromino(x, y) {
    var random1 = Math.floor(Math.random()*7);
    if(random1 == this.last_random){
      random1 = Math.floor(Math.random()*7);
    }
    this.last_random = random1;
    var tetromino;
    switch(random1) {
      case 0:
        tetromino = new Itetromino(x, y);
        break;
      case 1:
        tetromino = new Otetromino(x, y);
        break;
      case 2:
        tetromino = new Ttetromino(x, y);
        break;
      case 3:
        tetromino = new Stetromino(x, y);
        break;
      case 4:
        tetromino = new Ztetromino(x, y);
        break;
      case 5:
        tetromino = new Jtetromino(x, y);
        break;
      case 6:
        tetromino = new Ltetromino(x, y);
        break;
    }
    return tetromino;
  }

  swapPiece(piece1, piece2) {
    var temp, piece2_x = piece2.x, piece2_y = piece2.y;
    temp = piece1.clonePiece();
    piece1 = piece2.clonePiece();
    piece1.toLocation(temp.x, temp.y);
    piece2 = temp.clonePiece();
    piece2.toLocation(piece2_x, piece2_y);
    return [piece1, piece2];
  }

  hold() {
    if(this.holdpiece == null){
      this.holdpiece = this.movingpiece.clonePiece();
      this.holdpiece.toLocation(holdpiece_x, holdpiece_y);
      this.offsetPiece(this.holdpiece);
      this.spawnNext();
    }else{
      [this.holdpiece, this.movingpiece] = this.swapPiece(this.holdpiece, this.movingpiece);
      this.movingpiece.toLocation(starting_x, starting_y);
      this.holdpiece.toLocation(holdpiece_x, holdpiece_y);
      this.offsetPiece(this.holdpiece);
    }
    this.held = true;
  }

  placeHint() {
    this.hint = this.movingpiece.clonePiece();
    this.hint.changeState(2);
    while(!this.hint.touchGround(this.grid)){
      this.hint.moveDown(1);
    }
  }

  pieceDown() {
    if(!this.movingpiece.touchGround(this.grid)){
      this.movingpiece.moveDown(1);
      clearInterval(update_interval);
      update_interval = setInterval(function(){field.update();}, timer);
    }
  }

  pieceStraightDown() {
    while(!this.movingpiece.touchGround(this.grid)){
      this.movingpiece.moveDown(1);
    }
  }

  pieceToLeft(steps) {
    if(!this.movingpiece.touchLeft(this.grid)){
      this.movingpiece.moveLeft(steps);
    }
  }

  pieceToRight(steps) {
    if(!this.movingpiece.touchRight(this.grid)){
      this.movingpiece.moveRight(steps);
    }
  }

  rotatePiece() {
    if(!this.movingpiece.obstructed(this.grid)){
      this.movingpiece.rotate();
    }
  }

  leftRightMove() {
    if(keyIsDown(LEFT_ARROW)){
      if(keyIsDown(RIGHT_ARROW) == false || keyCode != RIGHT_ARROW)
        this.pieceToLeft(1);
    }
    if(keyIsDown(RIGHT_ARROW)){
      if(keyIsDown(LEFT_ARROW) == false || keyCode != LEFT_ARROW)
        this.pieceToRight(1);
    }
  }

  downMove() {
    if(keyIsDown(DOWN_ARROW)){
      delay_time = 0;
      this.pieceDown();
    }else{
      delay_time = movementDelay;
    }
  }

  pressMove() {
    if(keyCode == UP_ARROW){
      this.rotatePiece();
    }else if(keyCode == 32){
      this.pieceStraightDown();
      this.update(0);
    }else if(keyCode == 67){
      if(this.held == false)
        this.hold();
    }
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
