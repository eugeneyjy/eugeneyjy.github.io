class Piece {
  constructor(x, y, color = {r: 0, g: 0, b: 0}) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.blocks;
    this.form = 0;
  }

  show() {
    stroke(0);
    strokeWeight(bold);
    for(var i = 0; i < this.blocks.length; i++){
      this.blocks[i].show();
    }
  }

  fillBlocks(shape) {
    var blocks = [];
    for(var i = 0; i < shape.length; i++){
      var x = shape[i] % width;
      var y = Math.floor(shape[i] / width);
      blocks.push(new Block(this.x + x, this.y + y, this.color, 1));
    }
    return blocks;
  }

  nextForm() {
    var next_form = this.form;
    next_form++;
    if(next_form >= 4){
      next_form = 0;
    }
    return next_form;
  }

  moveDown(grid) {
    this.y++;
    this.blocks = this.fillBlocks(this.shapes[this.form]);
  }

  moveRight(grid) {
    this.x++;
    this.blocks = this.fillBlocks(this.shapes[this.form]);
  }

  moveLeft(grid) {
    this.x--;
    this.blocks = this.fillBlocks(this.shapes[this.form]);
  }

  rotate() {
    this.form = this.nextForm();
    // print(this.form);
    this.blocks = this.fillBlocks(this.shapes[this.form]);
  }

  touchGround(grid) {
    if(this.blocks.some(block =>  block.y+1 == height || grid[block.x][block.y+1].state == 1 )){
      return true;
    }
    return false;
  }

  touchLeft(grid) {
    if(this.blocks.some(block =>  block.x == 0 || grid[block.x-1][block.y].state == 1)){
      return true;
    }
    return false;
  }

  touchRight(grid) {
    if(this.blocks.some(block => block.x == 9 || grid[block.x+1][block.y].state == 1)){
      return true;
    }
    return false;
  }

  obstructed(grid) {
    var newform = this.fillBlocks(this.shapes[this.nextForm()]);
    if(newform.some(block => (block.x < 0 || block.x > 9) || (block.y > 19) || grid[block.x][block.y].state == 1)){
      return true;
    }
    return false;
  }
}

class Itetromino extends Piece {
  constructor(x, y, color = icolor) {
    super(x, y, color);
    this.shapes = ishape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}

class Otetromino extends Piece {
  constructor(x, y, color = ocolor) {
    super(x, y, color);
    this.shapes = oshape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}

class Ttetromino extends Piece {
  constructor(x, y, color = tcolor) {
    super(x, y, color);
    this.shapes = tshape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}

class Stetromino extends Piece {
  constructor(x, y, color = scolor) {
    super(x, y, color);
    this.shapes = sshape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}

class Ztetromino extends Piece {
  constructor(x, y, color = zcolor) {
    super(x, y, color);
    this.shapes = zshape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}

class Jtetromino extends Piece {
  constructor(x, y, color = jcolor) {
    super(x, y, color);
    this.shapes = jshape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}

class Ltetromino extends Piece {
  constructor(x, y, color = lcolor) {
    super(x, y, color);
    this.shapes = lshape;
    this.blocks = this.fillBlocks(this.shapes[0]);
  }
}
