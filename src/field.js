class Field {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.movingpiece ;
    this.fillGrid();
    this.spawnTetromino();
  }

  fillGrid() {
    for(var y = 0; y < this.height; y++){
      this.grid.push([]);
      for(var x = 0; x < this.width; x++){
        this.grid[y].push(new Block(x,y));
      }
    }
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
    this.movingpiece.show();
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

  update() {
    if(this.movingpiece.touchGround(this.grid)){
      this.placeTetromino();
      this.clearLines();
      this.spawnTetromino();
    }else{
      this.movingpiece.moveDown(1);
    }
  }

  spawnTetromino() {
    var random = Math.floor(Math.random()*7);
    var tetromino;
    switch(random) {
      case 0:
        tetromino = new Itetromino(starting_x, starting_y);
        break;
      case 1:
        tetromino = new Otetromino(starting_x, starting_y);
        break;
      case 2:
        tetromino = new Ttetromino(starting_x, starting_y);
        break;
      case 3:
        tetromino = new Stetromino(starting_x, starting_y);
        break;
      case 4:
        tetromino = new Ztetromino(starting_x, starting_y);
        break;
      case 5:
        tetromino = new Jtetromino(starting_x, starting_y);
        break;
      case 6:
        tetromino = new Ltetromino(starting_x, starting_y);
        break;
    }
    this.movingpiece = tetromino;
  }

  pieceDown() {
    if(!this.movingpiece.touchGround(this.grid)){
      clearInterval(update_interval);
      update_interval = setInterval(function(){field.update();}, timer);
    }
    this.update();
  }

  pieceStraightDown() {
    while(!this.movingpiece.touchGround(this.grid)){
      this.movingpiece.moveDown(1);
    }
    this.update();
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
    }
  }
}
