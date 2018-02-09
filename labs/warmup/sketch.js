var w;
var h;

function setup() {
  // put setup code here
  console.log("hello world!");
  createCanvas(displayWidth,displayHeight);

  // ellipse(56, 46, 55, 55);
  // fill(0,50,100);

  // triangle(30, 75, 58, 20, 86, 75)
  // fill(255,0,0);

  // rect(100,100,300,300);
  // fill(100,0,10);
  windowWidth= w;
  windowHeight=h;

  // for (i=0; i<100; i++){
  // 	rect(random(0,displayWidth),random(0,displayHeight),random(0,displayWidth), random(0,displayHeight));
  // 	fill(random(0,255),random(0,255),random(0,255));
  // 	noStroke();
  // }
  //   r=1;
  // 	for (i=0; i<100; i++){
  // 	ellipseMode(CENTER);
  // 	ellipse(random(displayWidth), random(displayHeight)+r,r,r);
  // 	fill(255);
  // 	r++;
  // }

}

function draw() {
  // put drawing code here
  var s = second();

  for (i=0; i<60; i++){
  	rectMode(CENTER);
  	rect(random(width/2,s),random(height/2,s),random(0,s), random(0,s));
  	fill(random(0,255)+s,random(0,255)-s,random(0,1)*s);
  	noStroke();
  }
}