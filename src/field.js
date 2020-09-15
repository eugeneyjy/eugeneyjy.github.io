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
      this.movingpiece.moveDown(this.grid);
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
      this.movingpiece.moveDown(this.grid);
    }
  }

  pieceStraightDown() {
    while(!this.movingpiece.touchGround(this.grid)){
      this.movingpiece.moveDown(this.grid);
    }
    this.update();
  }

  pieceToLeft() {
    if(!this.movingpiece.touchLeft(this.grid)){
      this.movingpiece.moveLeft(this.grid);
    }
  }

  pieceToRight() {
    if(!this.movingpiece.touchRight(this.grid)){
      this.movingpiece.moveRight(this.grid);
    }
  }

  rotatePiece() {
    if(!this.movingpiece.obstructed(this.grid)){
      this.movingpiece.rotate(this.grid);
    }
  }

  moveTetromino(keyCode) {
    switch(keyCode) {
      case UP_ARROW:
        this.rotatePiece();
        break;
      case LEFT_ARROW:
        this.pieceToLeft();
        break;
      case RIGHT_ARROW:
        this.pieceToRight();
        break;
      case DOWN_ARROW:
        this.pieceDown();
        break;
      case 32:  // keyCode for space bar
        this.pieceStraightDown();
    }
  }
}
