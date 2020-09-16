class Field {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.movingpiece;
    this.nextpiece;
    this.hint;
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
    stroke(0);
    strokeWeight(bold);
    noFill();
    rect(offset_x + (nextpiece_x-1)*blockSize, offset_y + (nextpiece_y-1.5)*blockSize, 5*blockSize, 5*blockSize);
    this.nextpiece.show();
  }

  show() {
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
    for(var y = 0; y < this.grid.length; y++){
      var linefull = true;
      for(var x = 0; x < this.grid[y].length; x++){
        if(this.grid[y][x].state == 0){
          linefull = false;
        }
      }
      if(linefull){
        this.clearLine(y);
      }
    }
  }

  spawnNext() {
    this.movingpiece = this.nextpiece.clonePiece();
    this.movingpiece.toLocation(starting_x, starting_y);
    this.nextpiece = this.spawnTetromino(nextpiece_x, nextpiece_y);
    if(this.nextpiece instanceof Itetromino){
      this.nextpiece.toLocation(this.nextpiece.x-0.5, this.nextpiece.y-0.5);
    }else if(this.nextpiece instanceof Otetromino){
      this.nextpiece.toLocation(this.nextpiece.x-0.5, this.nextpiece.y);
    }
  }

  update() {
    if(this.movingpiece.touchGround(this.grid)){
      this.placeTetromino();
      this.clearLines();
      this.spawnNext();
    }else{
      this.movingpiece.moveDown(1);
    }
  }

  spawnTetromino(x, y) {
    var random1 = Math.floor(Math.random()*7);
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
      this.update();
    }
  }
}
