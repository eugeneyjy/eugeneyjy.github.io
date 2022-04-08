// sketch.js
const canvasWidth = 600;
const canvasHeight = 600;
const helperWidth = 100;
const borderWeight = 5;
const framesPerSec = 60.0988;
const dasDelay = 12;  // Initial delay frames
const dasMove = 3;  // Frames of movement after inital delay
const putdelay = 16;
const linedelay = 20;
var gravity = 48; // Gravity frames
var timer = (gravity/framesPerSec)*1000;
const putsleep = (putdelay/framesPerSec)*1000;
const linesleep = (linedelay/framesPerSec)*1000;
const movementDelay = (dasDelay/framesPerSec)*1000;
const move_timer = (dasMove/framesPerSec)*1000;
const pause_x = 5.1;
const pause_y = 10;
const pause_size = 38;

// block.js
const blockSize = 24; // width and height of each block
const alpha = 100;

// field.js
const width = 10; // field default width
const height = 20;  // field default height
const offset_x = ((canvasWidth-(width*blockSize))/2) + borderWeight; // offset field in the middle
const offset_y = ((canvasHeight-(height*blockSize))/2) + borderWeight; // offset field in the middle
const starting_x = 3;
const starting_y = 0;
const nextpiece_x = 12;
const nextpiece_y = 3;
const holdpiece_x = -5;
const holdpiece_y = 3;
const score_x = 13.5;
const score_y = 12;
const line_x = score_x;
const line_y = 14.5;
const level_x = score_x;
const level_y = 17;
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

// instruction coordinate
const instruction_x = canvasWidth+50;
const instruction_y = 25;
const instruction_radius = 21;
