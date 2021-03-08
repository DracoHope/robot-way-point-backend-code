var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Size of our Robot object
radius = 10;

// Set the initial position for our Robot
var x = canvas.width/2;
var y = canvas.height/2;

// User enter Waypoint
let newWayX = 0;
let newWayY = 0;

// Current Robot position
let currBallX = 0;
let currBallY = 0;

// Differential increment for Robot to destination
var dx = 0;
var dy = 0;

// Status of Robot position
isBallXDone = false;    // Status indicate Robot position X reach
isBallYDone = false;    // Status indicate Robot position Y reach
isBallXnYDone = false;  // Status indicate Robot position X and Y reach

// Status if New Way Point was submitted
isNewWayPointInsert = false;

// To check is mouse click down
isMouseDown = false;

// To store the New Way Point
let waypointArray = [];
/////let waypoint = 0;


function getWayPoint(){

    // Reset all the Position Status
    isBallXDone = false;
    isBallYDone = false;
    isBallXnYDone = false;

    // ****************************************
    // Get Way Point 1
    let waypointStr = "";
    let strArray = [];
    console.log("In the getWaypoint() function");
    let tempStr =  document.getElementById("inputWaypoint1").value;
    if(tempStr===null || tempStr ===""){
        tempStr = "(0,0)";
        strArray = ["0", "0"];
    } else {
        waypointStr = tempStr.substring(1, tempStr.length-1);
        strArray = waypointStr.split(",");
    }
    console.log(`The input waypoint1 is ${tempStr} `);
    // ******************************************

    let tempNumArray = [];
    console.log(strArray);

    for(var i=0; i<strArray.length; i++) {
        tempNumArray[i] = parseInt(strArray[i], 10); 
    };
    console.log(waypointArray);

    // width="800" height="500"
    if(tempNumArray[0] >= 800){
        tempNumArray[0] = 790;
    }
    if(tempNumArray[0] <= 0){
        tempNumArray[0] = 10;
    }
    
    if(tempNumArray[1] >= 500){
        tempNumArray[1] = 490;
    }
    if(tempNumArray[1] <= 0){
        tempNumArray[1] = 10;
    }
    
    let w = {
        x: tempNumArray[0],
        y: tempNumArray[1],
        };

    console.log(`The w obj X: ${w.x} and Y: ${w.y} `);

    waypointArray.push(w);
    console.log("The waypointArray content is: ");
    console.log(waypointArray);

    // Assign new waypoint to Global Variable
    newWayX = w.x;
    newWayY = w.y

    if(newWayX > currBallX){
        dx = 1;
    } else if(newWayX < currBallX) {
        dx = -1;
    } else {
        dx = 0;
    }

    if(newWayY > currBallY){
        dy = 1;
    } else if(newWayY < currBallY) {
        dy = -1;
    } else {
        dy = 0;
    }

    console.log(`The Current Ball X: ${currBallX} and Current Ball Y: ${currBallX} `);
    console.log(`The DX: ${dx} and DY: ${dy} `);

    if(newWayX === w.x && newWayX === x) {
        // alert(`The newWayX is ${newWayX} and the X is ${x} `);
        console.log(`The newWayX is ${newWayX} and the X is ${x} `);
        isBallXDone = true;
        currBallX = newWayX;
    }

    if(newWayY === w.y && newWayY === y) {
        // alert(`The newWayY is ${newWayY} and the Y is ${y} `);
        console.log(`The newWayY is ${newWayY} and the Y is ${y} `);
        isBallYDone = true;
        currBallY = newWayY;
    }

    if(isBallXDone && isBallYDone){
        isBallXnYDone = true;
    }
    
    if(!isBallXnYDone){
        draw();
    }

    displayCurrentWayPoint();
}
// http://127.0.0.1:5501/move2.html
// **************************************************************************************

// Draw a ball at a initial position
function drawBallInit() {
    ctx.beginPath();
    //ctx.arc(100, 100, 10, 0, Math.PI*2);
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    currBallX = x;
    currBallY = y;

    updateRobotPosition();
}

// **************************************************************************************

// **************************************************************************************
// To Display the Current Position of the Robot
function updateRobotPosition(){
    let tempStr =  document.getElementById("robot position").innerHTML =`Robot Position X: ${x}  Position Y: ${y} `;
    // console.log(`Position X: ${x}  Position Y: ${y} `);
}

function displayCurrentWayPoint(){
    let tempStr =  document.getElementById("cuurentWayPoint").innerHTML =`Current New Way PointX: ${newWayX} New Way PointY: ${newWayY} `;
    console.log(`Current  New Way PointX: ${newWayX} New Way PointY: ${newWayY} `);
}
 // *******************************************
// Just to Draw a ball
function drawNewBall(ballX, ballY) {
    ctx.beginPath();
    //ctx.arc(100, 100, 10, 0, Math.PI*2);
    ctx.arc(ballX, ballY, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// **************************************************************************************

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    updateRobotPosition();
    console.log(`******************************************* The In the drawBall() Method *******************************************`);
    console.log(`In the drawBall() function. The RobotX is: ${x} and the RobotY is: ${y}`);
    currBallX = x;
    currBallY = y;
}

// **************************************************************************************

function draw() {
    console.log("Start Drawing Ball to Destination!!!!")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x += dx;
    y += dy;
    drawBall();
    console.log(`In the draw() the X is ${x} the Y is ${y} `);

    updateRobotPosition();

    //console.log(`The ballX is: ${x} and the ballY is: ${y}`);
    if ((!isBallXDone || !isBallYDone)  && !isBallXnYDone) {
        // console.log("The isBallXDone!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        // This window.requestAnimationFrame() method must be call within it callback function itself as a loop
        // The parameter require is just the callback function itself then just call this "window.requestAnimationFrame()" within the callback function itself
        window.requestAnimationFrame(draw);
            if(x === newWayX){
                    isBallXDone = true;
                    currBallX = x;
                    dx = 0;
                }
            if(y === newWayY){
                    isBallYDone = true;
                    currBallY = y;
                    dy = 0;
                }
            }

        if (isBallYDone && isBallXDone) {
            //alert("Ball Destination Reach");
            console.log("Ball Destination Reach");
            isBallXnYDone = true;
        }
    }
// http://127.0.0.1:5501/move2.html
// **************************************************************************************
// This function will get the X and Y position of mouse position on the Canvas
// Get Mouse Position
function getMousePosition(event) {
// This getBoundingClientRect() function will return the X and Y coordinates 
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
// "canvas.getBoundingClientRect();" will get the boundaries of this "canvas" element
const boundaries = canvas.getBoundingClientRect();
return {
    x: event.clientX - boundaries.left,
    y: event.clientY - boundaries.top,
};
}
// *****************************************************************
// Mouse Down Event
canvas.addEventListener('mousedown', (event) => {
isMouseDown = true;
const currentPosition = getMousePosition(event);
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Mouse Down Event been trigger. Start Seting the Parameter such as Width and Color for the Shapes now!!!")
console.log("In the Mouse Down Event Listerner, the currentPosition is: ");
console.log(currentPosition);
});

// ******************************************************************
// Mouse Move Event
canvas.addEventListener('mousemove', (event) => {
if (isMouseDown) {
    // This getMousePosition(event) function is the one who will get the X and Y position on the Canva
    const currentPosition = getMousePosition(event);
    console.log( `The X coordinate is ${currentPosition.x} and the Y coordinate is ${currentPosition.y} `);
    ctx.lineTo(currentPosition.x, currentPosition.y);
} else {
    
    const currentPosition = getMousePosition(event);
    console.log("In the Mouse Move where Mouse is UP Event not Drawing now");
    console.log( `The X coordinate is ${currentPosition.x} and the Y coordinate is ${currentPosition.y} `);
    
    }
    });

    // ************************************************************************************
    // When the mouseUp event is trigger then need to set "isMouseDown = false;" so that will not draw onto the Canvas
    // Mouse Up
    canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
    console.log("The Mouse have been Up and Uncick!!!");
    });

// ************************************************************************************
// Initialize the Robot object and update the current position
drawBallInit();

// ************************************************************************************
