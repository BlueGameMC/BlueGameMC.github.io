const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;
const width = 400;
const height = 400;
const ctx = canvas.getContext("2d");
const speedSlider = document.getElementById("speedSlider");
const genText = document.getElementById("genText");

var speed = 1;

var birdCount = 850;

var gen = 1;

var loopCount = 1;

var birds = new Array(birdCount);
var birdBrains = new Array(birdCount);
var pipes = [new Pipe(0), new Pipe(250)];

for (let i = 0; i < birdCount; i++) {
  birds[i] = new Bird();
  birdBrains[i] = new NeuralNetwork(4, 20, 1);
}

var intervalID = setInterval(runGame, 1);

function clearScreen()
{
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
}

function runGame()
{

  loopCount = speedSlider.value;
  genText.textContent = "Generation: " + gen;

  for (let k = 0; k < loopCount; k++) 
  {
    clearScreen();
    for (let i = 0; i < birds.length; i++) {
      
      let pipe;
      
      if (pipes[0].x < pipes[1].x) 
      {
        pipe = pipes[0];
      }
      else
      {
        pipe = pipes[1];
      }
      
      let input_array = [(400 - birds[i].y) / 400, birds[i].vel, pipe.x / 400, pipe.y]
      
      if (birds[i].alive == true) {
        
        if (birdBrains[i].feedForward(input_array) >= 0.5) 
        {
          birds[i].flap();
        }
      }
        
      birds[i].show();
      birds[i].update();
      birds[i].checkCollision();
      
    }
    
    for (let i = 0; i < pipes.length; i++) {
      pipes[i].show();
      pipes[i].update();
      pipes[i].checkEdge();
      
    }
    
    if (birdCount <= 0)
    {
      birdCount = 850;
      let bird;
      let birdBrain;
      
      let fitnessCheck = 0;
      let bestBirdI;
      for (let i = 0; i < birdCount; i++) 
      {
        if (birds[i].fitness > fitnessCheck) {
          fitnessCheck = birds[i].fitness;
          bestBirdI = i;
        }
      }
      bird = birds[bestBirdI];
      birdBrain = birdBrains[bestBirdI];
      
      for (let i = 0; i < birdCount; i++) {
        birds[i] = new Bird();
        birdBrains[i] = birdBrain.mutate();
      }
      
      birds[birdCount - 1] = new Bird();
      birdBrains[birdCount - 1] = birdBrain.copy();

      birds[birdCount - 2] = new Bird();
      birdBrains[birdCount - 2] = new NeuralNetwork(4, 20, 1);
      
      pipes = [new Pipe(0), new Pipe(250)];
      gen++;
    }
    
  }
       
}
  