//-------------------------------------------------------

//VARIABLES

//-------------------------------------------------------

var player1;
var barriers = [];
var speedy = 5;
var brick;
var tempArray = [];
var points = 0;
var serial;
var sensorValue = 0;

var score = 0;
//-------------------------------------------------------

//SETUP FUNCTION  

//-------------------------------------------------------


function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort(); // make a new instance of  serialport library
  //serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  //serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
  //serial.write("X");

  player1 = new Player(300, 500, 1, 1);



  for (i = 0; i < 10; i++) {


    var r = new Barrier(random(width), random(-500, -1), 5, 5); // generate a circle;
    barriers.push(r); //add it to the array.


  }






}

function draw() {
  background(255, 255, 240);



  player1.display();


  for (var b = 0; b < barriers.length; b++) {
    if (player1.collideRectPlayer(barriers[b])) {

      player1.changeColor();
      break;
    }

  }

  if (keyIsDown(LEFT_ARROW))
    player1.x -= 5;

  if (keyIsDown(RIGHT_ARROW))
    player1.x += 5;


  for (var i = 0; i < barriers.length; i++) {
    barriers[i].display();
    score += barriers[i].move(); // adds score for each brick ( 0 if still on the screen)
    //println(barriers);
  }




  fill(0, 0, 0);
  rect(0, 0, width, 40);

  fill(255, 255, 255);
  text('Score: ' + score.toString(), 5, 15);
  // text(Points, 50, 15);


  // get the list of ports:
  function printList(portList) {
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      println(i + " " + portList[i]);
    }
  }


}



//-------------------------------------------------------

//FUNCTIONS & OBJECTS

//-------------------------------------------------------


//Player Object
var Player = function(_x, _y, _xdir, _ydir) {
    this.x = _x;
    this.y = _y;
    this.xdir = _xdir;
    this.ydir = _ydir;
    this.col = color(255);
    this.diam1 = 40
    this.diam2 = 20

    this.changeColor = function() {
        this.col = color(255, 0, 0)

      } // End of change color function


    this.display = function() {

      //Player Base
      stroke(20);
      fill(this.col);
      ellipse(this.x, this.y, this.diam1, this.diam1);

      //Player Top
      stroke(20);
      fill(20, 20, 20);
      ellipse(this.x, this.y, this.diam2, this.diam2);


    }; // End of display function

    // this.collideRectCircle = function (rx, ry, rw, rh, cx, cy, diameter) {
    this.collideRectPlayer = function(barrier) {
      //2d
      // temporary variables to set edges for testing
      var testX = this.x;
      var testY = this.y;

      // which edge is closest?
      if (this.x < barrier.x) {
        testX = barrier.x // left edge
      } else if (this.x > barrier.x + barrier.w) {
        testX = barrier.x + barrier.w
      } // right edge

      if (this.y < barrier.y) {
        testY = barrier.y // top edge
      } else if (this.y > barrier.y + barrier.h) {
        testY = barrier.y + barrier.h
      } // bottom edge

      // // get distance from closest edges
      var distance = dist(this.x, this.y, testX, testY)

      // if the distance is less than the radius, collision!
      if (distance <= this.diam1 / 2) {
        return true;
      }
      return false;
    };

    //Intersection Function
    this.intersects = function(barrier) {
      // var d1 = dist(this.x, this.y, barrier.x, barrier.y);
      // var d2 = dist(this.x, this.y, (barrier.x + barrier.w), barrier.y);
      // var d3 = dist(this.x, this.y, barrier.x, (barrier.y + barrier.h));
      // var d4 = dist(this.x, this.y, (barrier.x + barrier.w), (barrier.y + barrier.h));

      // if ((d1 >= (this.diam1 / 2) + (barrier.x)) && (d2 <= (this.diam1 / 2) + (barrier.x + barrier.w)) && (d3 >= (this.diam1 / 2) + (barrier.y)) && (d4 <= (this.diam1 / 2) + (barrier.y + barrier.h))) {

      var d = dist(this.x, this.y, barrier.x + barrier.w, barrier.y + barrier.h);

      if (d < this.diam1 / 2 + barrier.w / 2) {

        return true;


        // textAlign(CENTER);
        // textSize(20);
        // text(fs,width-30,28);
        // fill(0);
        // text("SCORE",width-85,28);

      } else {

        return false;
      }

    }; // End of Intersection Contructor

  } //End of Player Object Function



//Wall Object
function Barrier(_x, _y, _w, _h) {

  this.x = _x;
  this.y = _y;
  this.w = random(20, 50);
  this.h = random(20, 50);

  this.speedx = 0; // speed in the x direction
  this.speedy = 5; // speed in the y direction
  this.col = color(random(0, 255), random(0, 255), random(0, 255)); //unique color  
  //this.diam = random(5, 15);


  rectMode(CORNER);
  this.display = function(_r, _g, _b) {
    noStroke();
    fill(color(_r, _g, _b));
    rect(this.x, this.y, this.w, this.h);

    // noFill();
    // stroke(0);
    // ellipse(this.x + this.w/2,this.y + this.h/2, this.w, this.w);

  }


  this.move = function() {
      this.y = this.y + this.speedy;
      
      var points = 0;
      if (this.y > height) {

        this.y = random(-600, -1);
        this.x = random(0, width);
        points = 1;
      }
      
      return points;
    } // end of move
    
    this.addScore = function(){
      var points = 10;
      
      return points;
    }

} //End of Barrier Constructor


//Points Function
// function Points() {
//   var points = 0;

//   if (Barriers > length) {

//     Points = +10

  // }
// }


//Serial Events Function
function serialEvent() {
  // if (serial.available())
    var inString = serial.read();
    // var tmp = Number(inString);
    // if(tmp > 200) {
      
    // }
    sensorValue = Number(inString);
    println(sensorValue);
    //if ( inString == "2" ) player1.x += 5;
    if ( sensorValue < 0.5 || sensorValue > 200  ) player1.x -= 7;
     if ( sensorValue > 1.5 && sensorValue < 100 ) player1.x += 7;
     
     serial.write("x");


  }
  
  // function printList(){
  // println('happy');
    
  // }

// End of Serial Events Function