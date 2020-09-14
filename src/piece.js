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

  moveDown() {
    if(!this.blocks.some(block => block.y == height-1)){
      this.y++;
      this.blocks = this.fillBlocks(this.shapes[this.form]);
    }
  }

  moveRight() {
    if(this.blocks[3].x < width-1){
      this.x++;
      this.blocks = this.fillBlocks(this.shapes[this.form]);
    }
  }

  moveLeft() {
    if(this.blocks[0].x > 0){
      this.x--;
      this.blocks = this.fillBlocks(this.shapes[this.form]);
    }
  }

  rotate() {
    this.form++;
    if(this.form >= 4){
      this.form = 0;
    }
    // print(this.form);
    this.blocks = this.fillBlocks(this.shapes[this.form]);
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
