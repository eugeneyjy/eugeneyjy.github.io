// sketch.js
const canvasWidth = 650;
const canvasHeight = 650;
const timer = 600; // millisecond
const movementDelay = 200;
const move_timer = 50;

// block.js
const blockSize = 25; // width and height of each block
const alpha = 100;

// field.js
const width = 10; // field default width
const height = 20;  // field default height
const offset_x = (canvasWidth-(width*blockSize))/2; // offset field in the middle
const offset_y = (canvasHeight-(height*blockSize))/2; // offset field in the middle
const starting_x = 3;
const starting_y = 0;
const nextpiece_x = 12;
const nextpiece_y = 3;
const holdpiece_x = -5;
const holdpiece_y = 3;
const score_x = nextpiece_x;
const score_y = 12;
const line_x = nextpiece_x;
const line_y = 14.5;
const text_size = 20;
const score_size = 14;

// piece.js
// position of each shape
const ishape = [[width,width+1,width+2,width+3],
                [2,width+2,width*2+2,width*3+2],
                [width*2,width*2+1,width*2+2,width*2+3],
                [1,width+1,width*2+1,width*3+1]];
const oshape = [[1,2,width+1, width+2],
                [1,2,width+1, width+2],
                [1,2,width+1, width+2],
                [1,2,width+1, width+2]];
const tshape = [[width,1,width+1,width+2],
                [1,width+1,width+2,width*2+1],
                [width,width+1,width*2+1,width+2],
                [width,1,width+1,width*2+1]];
const sshape = [[width,1,width+1,2],
                [1,width+1,width+2,width*2+2],
                [width*2,width+1,width*2+1,width+2],
                [0,width,width+1,width*2+1]];
const zshape = [[0,1,width+1,width+2],
                [width+1,width*2+1,2,width+2],
                [width,width+1,width*2+1,width*2+2],
                [width,width*2,1,width+1]];
const jshape = [[0,width,width+1,width+2],
                [1,width+1,width*2+1,2],
                [width,width+1,width+2,width*2+2],
                [width*2,1,width+1,width*2+1]];
const lshape = [[width,width+1,width+2,2],
                [1,width+1,width*2+1,width*2+2],
                [width,width*2,width+1,width+2],
                [0,1,width+1,width*2+1]];

// color of each shape
const icolor = {r: 0, g: 255, b: 255};
const ocolor = {r: 255, g: 226, b: 77};
const tcolor = {r: 153, g: 86, b: 213};
const scolor = {r: 114, g: 203, b: 59};
const zcolor = {r: 255, g: 50, b: 19};
const jcolor = {r: 3, g: 65, b: 174};
const lcolor = {r: 255, g: 151, b: 28};

// stroke
const bold = 2.2;
const light = 1.5;
