var compressedImage;
var canvas;

var AIBrain;

var nn;


var guess0;
var guess1;
var guess2;
var guess3;
var guess4;
var guess5;
var guess6;
var guess7;
var guess8;
var guess9;

var clearButton;

function preload()
{
  AIBrain = loadJSON("brain.json");
}

function setup() {
  canvas = createCanvas(448 * 2, 448);
  background(0);
  noStroke();
  compressedImage = createGraphics(28, 28);

  clearButton = createButton("Clear");
  clearButton.mousePressed(clearCanvas);
  noSmooth();
  nn = NeuralNetwork.deserialize(AIBrain);

  guess0 = document.getElementById("Guess0");
  guess1 = document.getElementById("Guess1");
  guess2 = document.getElementById("Guess2");
  guess3 = document.getElementById("Guess3");
  guess4 = document.getElementById("Guess4");
  guess5 = document.getElementById("Guess5");
  guess6 = document.getElementById("Guess6");
  guess7 = document.getElementById("Guess7");
  guess8 = document.getElementById("Guess8");
  guess9 = document.getElementById("Guess9");

}

function clearCanvas()
{
  noStroke();
  background(0);
}

function draw() {
  if(mouseIsPressed === true)
  {
    if(mouseX < width / 2 && pmouseX < width / 2 && mouseY <= 448)
    {
      stroke(255);
      strokeWeight(32);
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }

  compressedImage.copy(canvas, 0, 0, width / 2, height,  0, 0, 28, 28);
  copy(compressedImage, 0, 0, 28, 28, width / 2, 0, width / 2 , height);

  stroke(255);
  strokeWeight(1);
  line(width / 2 + 0.5, 0, width / 2 + 0.5, height);


  let imageArray = [];
  loadPixels();
  // Turn the canvas into an array
  for (let y = 0; y < 28; y++) {
    for (let x = 0; x < 28; x++) {
      imageArray.push(sigmoid(get(x * 16, y * 16 )[0]));
    }
  }
  let outputArray = nn.feedForward(imageArray);
  let outputAdded = 0;
  for (let i = 0; i < outputArray.length; i++) {
    outputAdded += outputArray[i];
  }
  for (let i = 0; i < outputArray.length; i++) {
    outputArray[i] /= outputAdded;
    outputArray[i] *= 100;
    outputArray[i] = Math.round(outputArray[i]);
  }
  
  guess0.textContent = "0:  " + outputArray[0] + "%";
  guess1.textContent = "1:  " + outputArray[1] + "%";
  guess2.textContent = "2:  " + outputArray[2] + "%";
  guess3.textContent = "3:  " + outputArray[3] + "%";
  guess4.textContent = "4:  " + outputArray[4] + "%";
  guess5.textContent = "5:  " + outputArray[5] + "%";
  guess6.textContent = "6:  " + outputArray[6] + "%";
  guess7.textContent = "7:  " + outputArray[7] + "%";
  guess8.textContent = "8:  " + outputArray[8] + "%";
  guess9.textContent = "9:  " + outputArray[9] + "%";

}

function keyPressed()
{
  if(keyCode === 67) 
  {
    noStroke();
    background(0);
  }
}
