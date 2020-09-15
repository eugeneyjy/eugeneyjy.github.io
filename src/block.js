class Block {
  constructor(x, y, color = {r: 255, g: 255, b: 255}, state = 0) {
      this.x = x;
      this.y = y;
      this.state = state
      this.color = color;
  }

  show() {
    var {r, g, b} = this.color;
    var strokesize;
    fill(r, g, b);
    if(this.state == 1){
      strokesize = bold;
      stroke(0);
      strokeWeight(strokesize);
    }else if(this.state == 0){
      strokesize = light;
      stroke(211);
      strokeWeight(strokesize);
    }else if(this.state == 2){
      strokesize = bold;
      stroke(r,g,b, alpha);
      strokeWeight(strokesize);
      fill(r, g, b, alpha);
    }
    // rect(this.x*blockSize + offset_x, this.y*blockSize + offset_y, blockSize-strokesize/2, blockSize-strokesize/2);
    rect(this.x*blockSize + offset_x, this.y*blockSize + offset_y, blockSize, blockSize);

  }

  update() {
    this.y++;
  }

  copyBlock() {
    var newBlock = new Block(this.x, this.y, this.color, this.state);
    return newBlock;
  }
}
