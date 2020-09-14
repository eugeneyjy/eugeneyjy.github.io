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
    for(var i = 0; i < this.height; i++){
      this.grid.push([]);
      for(var j = 0; j < this.width; j++){
        this.grid[i].push(new Block(j,i));
      }
    }
  }

  show() {
    stroke(211);
    strokeWeight(light);
    for(var i = 0; i < this.grid.length; i++){
      for(var j = 0; j < this.grid[i].length; j++){
        this.grid[i][j].show();
      }
    }
    stroke(0);
    strokeWeight(bold);
    noFill();
    rect(offset_x, offset_y, this.width*blockSize, this.height*blockSize);
    this.movingpiece.show();
  }

  update() {
    this.movingpiece.moveDown();
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

  moveTetromino(keyCode) {
    switch(keyCode) {
      case UP_ARROW:
        this.movingpiece.rotate();
        break;
      case LEFT_ARROW:
        this.movingpiece.moveLeft();
        break;
      case RIGHT_ARROW:
        this.movingpiece.moveRight();
        break;
      case DOWN_ARROW:
        this.movingpiece.moveDown();
        break;
    }
  }
}
