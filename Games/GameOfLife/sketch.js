var canvas = document.getElementById("canvas");
var pauseButton = document.getElementById("pause-button");
var resetButton = document.getElementById("reset-button");
var generationText = document.getElementById("generation");
canvas.width  = 800;
canvas.height = 800;
var ctx = canvas.getContext('2d');
var mouseX = 0;
var mouseY = 0;

var DIM = 80;
var resolution = 800 / DIM;

var running = false;

var generation = 0;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 800, 800);

var grid = Make2DArray(DIM, DIM);
for (let i = 0; i < DIM; i++) {
  for (let j = 0; j < DIM; j++) {
    grid[i][j] = 0;
  }
}

var IntervalID = setInterval(runGame, 100);

function runGame()
{

  DrawGrid(grid);
  generationText.textContent = "Generation: " + generation;

  if (running) {

    generation++;

    let newGrid = Make2DArray(DIM, DIM);
    
    for (let i = 0; i < DIM; i++) {
      for (let j = 0; j < DIM; j++) {
        
        let neighbors = CountNeighbors(grid, i, j);
        let state = grid[i][j];
        
        if (state == 1) 
        {
          if (neighbors > 3 || neighbors < 2) 
          {
            newGrid[i][j] = 0;
          }
          else
          {
            newGrid[i][j] = state;
          }
        }
        else
        {
          if (neighbors == 3) 
          {
            newGrid[i][j] = 1;
          }      
          else
          {
            newGrid[i][j] = state;
          }
        }
        
      }
    }
    
    grid = newGrid;
    
  }
    
}

function Make2DArray(cols, rows)
{
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function DrawGrid(arr)
{
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
  
      ctx.fillStyle = "rgb(" + arr[i][j] * 255 + "," + arr[i][j] * 255 + "," + arr[i][j] * 255 + ")";
      ctx.fillRect(i * resolution, j * resolution, resolution, resolution);

      ctx.beginPath();
      ctx.lineWidth = "0.1";
      ctx.strokeStyle = "rgb(150,150,150)";
      ctx.rect(i * resolution, j * resolution, resolution, resolution);
      ctx.stroke();
  
    }
  }
}

function CountNeighbors(grid, x, y)
{
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + DIM) % DIM;
      let row = (y + j + DIM) % DIM;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;

}

pauseButton.addEventListener("click", () =>
{
  if (running) 
  {
    running = false;
    pauseButton.textContent = "Play";
  }
  else
  {
    running = true;
    pauseButton.textContent = "Pause";

  }
})

resetButton.addEventListener("click", () =>
{
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      grid[i][j] = 0;
    }
  }
  running = false;
  pauseButton.textContent = "Play";
  generation = 0;
})
  
canvas.addEventListener("click", () =>
{
  let x = Math.floor(mouseX / resolution);
  let y = Math.floor(mouseY / resolution);

  if(grid[x][y] == 1)
  {
    grid[x][y] = 0;
  }
  else
  {
    grid[x][y] = 1;
  }

})

document.onmousemove = function(event) {
	mouseX = event.pageX;
	mouseY = event.pageY;
}