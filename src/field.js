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
    for(var i = 0; i < this.width; i++){
      this.grid.push([]);
      for(var j = 0; j < this.height; j++){
        this.grid[i].push(new Block(i,j));
      }
    }
  }

  show() {
    for(var i = 0; i < this.grid.length; i++){
      for(var j = 0; j < this.grid[i].length; j++){
        if(this.grid[i][j].state == 0)
          this.grid[i][j].show();
      }
    }
    stroke(0);
    strokeWeight(bold);
    noFill();
    rect(offset_x, offset_y, this.width*blockSize, this.height*blockSize);
    for(var i = 0; i < this.grid.length; i++){
      for(var j = 0; j < this.grid[i].length; j++){
        if(this.grid[i][j].state == 1)
            this.grid[i][j].show();
      }
    }
    this.movingpiece.show();
  }

  placeTetromino() {
    this.movingpiece.blocks.forEach(block => this.grid[block.x][block.y] = block.copyBlock());
  }

  update() {
    if(this.movingpiece.touchGround(this.grid)){
      this.placeTetromino();
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
