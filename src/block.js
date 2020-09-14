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
    rect(this.x*blockSize + offset_x, this.y*blockSize + offset_y, blockSize, blockSize);
  }

  update() {
    this.y++;
  }
}
