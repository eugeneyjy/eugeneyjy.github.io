class Block {
  constructor(x, y, color = {r: 255, g: 255, b: 255}, state = 0) {
      this.x = x;
      this.y = y;
      this.state = state
      this.color = color;
  }

  show() {
    var {r, g, b} = this.color;
    fill(r, g, b);
    if(this.state == 1){
      stroke(0);
      strokeWeight(bold);
    }else if(this.state == 0){
      stroke(211);
      strokeWeight(light);
    }else if(this.state == 2){
      stroke(r,g,b, alpha);
      strokeWeight(bold);
      fill(r, g, b, alpha);
    }
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
