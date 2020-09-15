class Block {
  constructor(x, y, color = {r: 255, g: 255, b: 255}, state = 0) {
      this.x = x;
      this.y = y;
      this.state = state
      this.color = color;
  }

  show() {
    var {r, g, b} = this.color;
    if(this.state == 1){
      stroke(0);
      strokeWeight(bold);
    }else{
      stroke(211);
      strokeWeight(light);
    }
    fill(r, g, b);
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
