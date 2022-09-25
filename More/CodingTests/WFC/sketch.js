
var tiles = [];

var tileImages = [];

var TileSize;
var CanvasSize = 500;

var grid = [];
var DIM = 50;

var oldGrids = [];

var allOptions = [0,1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49];

var collapsedTiles = 0;

function preload()
{
  tileImages[0] = loadImage("Tiles/Tile0.png");
  tileImages[1] = loadImage("Tiles/Tile1.png");
  tileImages[2] = loadImage("Tiles/Tile2.png");
  tileImages[3] = loadImage("Tiles/Tile3.png");
  tileImages[4] = loadImage("Tiles/Tile4.png");
  tileImages[5] = loadImage("Tiles/Tile5.png");
  tileImages[6] = loadImage("Tiles/Tile6.png");
  tileImages[7] = loadImage("Tiles/Tile7.png");
  tileImages[8] = loadImage("Tiles/Tile8.png");
  tileImages[9] = loadImage("Tiles/Tile9.png");
  tileImages[10] = loadImage("Tiles/Tile10.png");
  tileImages[11] = loadImage("Tiles/Tile11.png");
  tileImages[12] = loadImage("Tiles/Tile12.png");
  tileImages[13] = loadImage("Tiles/Tile13.png");
}

function setup() 
{
  var canvas = createCanvas(CanvasSize, CanvasSize);

  TileSize = CanvasSize / DIM;
  // Initialize the grid
  for (var i = 0; i < DIM * DIM; i++)
  {
    grid[i] = {
      collapsed: false,
      options: allOptions
    };
  }

  // A == Dark Gray
  // B == Dark Green
  // C == Light Gray
  // D == Light Green

  // Load the un-rotated tiles
  tiles[0] = new Tile(tileImages[0], ["AAA","AAA","AAA","AAA"]);
  tiles[1] = new Tile(tileImages[1], ["BBB","BBB","BBB","BBB"]);
  // Load tile 2
  tiles[2] = new Tile(tileImages[2], ["BBB","BCB","BBB","BCB"]);
  tiles[3] = tiles[2].rotateImg(1);
  tiles[4] = tiles[2].rotateImg(2);
  tiles[5] = tiles[2].rotateImg(3);
  // Load tile 3
  tiles[6] = new Tile(tileImages[3], ["BDB","BBB","BDB","BBB"]);
  tiles[7] = tiles[6].rotateImg(1);
  tiles[8] = tiles[6].rotateImg(2);
  tiles[9] = tiles[6].rotateImg(3);
  // Load tile 4
  tiles[10] = new Tile(tileImages[4], ["BDB","BCB","BDB","BCB"]);
  tiles[11] = tiles[10].rotateImg(1);
  tiles[12] = tiles[10].rotateImg(2);
  tiles[13] = tiles[10].rotateImg(3);
  // Load tile 5
  tiles[14] = new Tile(tileImages[5], ["BDB","BDB","BBB","BBB"]);
  tiles[15] = tiles[14].rotateImg(1);
  tiles[16] = tiles[14].rotateImg(2);
  tiles[17] = tiles[14].rotateImg(3);
  // Load tile 6
  tiles[18] = new Tile(tileImages[6], ["BBB","BDB","BDB","BDB"]);
  tiles[19] = tiles[18].rotateImg(1);
  tiles[20] = tiles[18].rotateImg(2);
  tiles[21] = tiles[18].rotateImg(3);
  // Load tile 7
  tiles[22] = new Tile(tileImages[7], ["BDB","BBB","BBB","BBB"]);
  tiles[23] = tiles[22].rotateImg(1);
  tiles[24] = tiles[22].rotateImg(2);
  tiles[25] = tiles[22].rotateImg(3);
  // Load tile 8
  tiles[26] = new Tile(tileImages[8], ["BBB","BDB","BBB","BDB"]);
  tiles[27] = tiles[26].rotateImg(1);
  tiles[28] = tiles[26].rotateImg(2);
  tiles[29] = tiles[26].rotateImg(3);
  // Load tile 9
  tiles[30] = new Tile(tileImages[9], ["BCB","BBB","BDB","BBB"]);
  tiles[31] = tiles[30].rotateImg(1);
  tiles[32] = tiles[30].rotateImg(2);
  tiles[33] = tiles[30].rotateImg(3);
  // Load tile 10
  tiles[34] = new Tile(tileImages[10], ["BDB","BDB","BBB","BBB"]);
  tiles[35] = tiles[34].rotateImg(1);
  tiles[36] = tiles[34].rotateImg(2);
  tiles[37] = tiles[34].rotateImg(3);
  // Load tile 11
  tiles[38] = new Tile(tileImages[11], ["BDB","BDB","BDB","BDB"]);
  tiles[39] = tiles[38].rotateImg(1);
  tiles[40] = tiles[38].rotateImg(2);
  tiles[41] = tiles[38].rotateImg(3);
  // Load tile 12
  tiles[42] = new Tile(tileImages[12], ["BBB","BBB","BBA","ABB"]);
  tiles[43] = tiles[42].rotateImg(1);
  tiles[44] = tiles[42].rotateImg(2);
  tiles[45] = tiles[42].rotateImg(3);
  // Load tile 13
  tiles[46] = new Tile(tileImages[13], ["BDB","BBA","AAA","ABB"]);
  tiles[47] = tiles[46].rotateImg(1);
  tiles[48] = tiles[46].rotateImg(2);
  tiles[49] = tiles[46].rotateImg(3);

  background(0);

}
  
function ReverseString(string)
{
  let stringArray = string.toString().split("");
  stringArray.reverse();
  return stringArray.join("");
}

function checkValid(direction, collaspedRules)
{
  let validOptions = [];
  for(let i = 0; i < tiles.length; i++)
  {
    if(tiles[i].edges[direction] == ReverseString(collaspedRules))
    {
      validOptions.push(i);
    }
  }
  return validOptions;
  
}

function draw() 
{
  
  collapsedTiles = 0;

  makeTiles();makeTiles();makeTiles();makeTiles();makeTiles();
  makeTiles();makeTiles();makeTiles();makeTiles();makeTiles();
  makeTiles();makeTiles();makeTiles();makeTiles();makeTiles();
  makeTiles();makeTiles();makeTiles();makeTiles();makeTiles();

  
  for (var x = 0; x < DIM; x++){
    for (var y = 0; y < DIM; y++){
      // Check if a tile is collapsed
      let tileIndex = x + y * DIM;
      let cell = grid[tileIndex];

      if (cell.collapsed)
      {
        collapsedTiles++;
      }

    }
  }

  console.log(collapsedTiles / (DIM * DIM) * 100);

   // Go through every tile and check if it is collapsed
   for (var x = 0; x < DIM; x++){
    for (var y = 0; y < DIM; y++){
      // Check if a tile is collapsed
      let tileIndex = x + y * DIM;
      let cell = grid[tileIndex];

      if (cell.collapsed)
      {
        // Draw the tile
        var index = cell.options[0];
        if(index == undefined || cell.options.length == 0)
        {
          grid = oldGrids[Math.floor(random(5,20))];
          //console.log("Backtracking! (From Draw)" + tileIndex);
        }
        else
        {
          image(tiles[index].img, x * TileSize, y * TileSize, TileSize, TileSize);
        }
      }
      else
      {
        // Draw a blank tile
        fill(0);
        rect(x * TileSize, y * TileSize, TileSize, TileSize);
      }

      fill(255,100,255);
      textSize(7);
      //text(tileIndex, x * TileSize + 3, y * TileSize + 3);

    }
  }


  if(collapsedTiles == DIM * DIM)
  {

    // Go through every tile and check if it is collapsed
    for (var x = 0; x < DIM; x++){
      for (var y = 0; y < DIM; y++){
        // Check if a tile is collapsed
        let tileIndex = x + y * DIM;
        let cell = grid[tileIndex];

        if (cell.collapsed)
        {
          // Draw the tile
          var index = cell.options[0];
          if(index == undefined || cell.options.length == 0)
          {
            grid = oldGrids[Math.floor(random(5,20))];
            //console.log("Backtracking! (From Draw)" + tileIndex);
          }
          else
          {
            image(tiles[index].img, x * TileSize, y * TileSize, TileSize, TileSize);
          }
        }
        else
        {
          // Draw a blank tile
          fill(0);
          rect(x * TileSize, y * TileSize, TileSize, TileSize);
        }

        fill(255,100,255);
        textSize(7);
        //text(tileIndex, x * TileSize + 3, y * TileSize + 3);

      }
    }


    let canvasImg = createGraphics(CanvasSize, CanvasSize);
    canvasImg.copy(get(), 0,0,CanvasSize,CanvasSize, 0,0,CanvasSize,CanvasSize);

    /*
    background(0);

    copy(canvasImg, 0,0,CanvasSize,CanvasSize, 0,0,CanvasSize/2,CanvasSize/2);
    copy(canvasImg, 0,0,CanvasSize,CanvasSize, CanvasSize/2,0,CanvasSize/2,CanvasSize/2);
    copy(canvasImg, 0,0,CanvasSize,CanvasSize, 0,CanvasSize/2,CanvasSize/2,CanvasSize/2);
    copy(canvasImg, 0,0,CanvasSize,CanvasSize, CanvasSize/2,CanvasSize/2,CanvasSize/2,CanvasSize/2);
    */

    noLoop();
  }

}

function makeTiles()
{
  // Find the cell with the least options
  var gridCopy = grid.slice();

  gridCopy.sort((a, b) => 
  {
    return a.options.length - b.options.length;
  }); 

  // Make an array with only the cells with the least options
  gridCopy = gridCopy.filter(i => i.options.length <= gridCopy[0].options.length);

  // Pick a random cell from the array and collapse it
  let cell = random(gridCopy);
  cell.collapsed = true;
  let pick = random(cell.options);
  if(pick == undefined || cell.options.length == 0)
  {
    grid = oldGrids[Math.floor(random(5,20))];
    //console.log("Backtracking! (From makeTiles)");
    return;
  }
  cell.options = [pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick, pick,pick, pick, pick, pick, pick, pick, pick, pick, pick];
  

  var nextGrid = [];
  for(let x = 0; x < DIM; x++)
  {
    for(let y = 0; y < DIM; y++)
    {

      let index = x + y * DIM;

      if(grid[index].collapsed)
      {
        nextGrid[index] = grid[index];
      }
      else
      {

        let validOptionsUp = [];
        let validOptionsRight = [];
        let validOptionsDown = [];
        let validOptionsLeft = [];

        let validOptions = [];

        // Look up down left and right and check if they are collapsed

        // Look up
        if(y > 0)
        {
          let up = grid[x + (y - 1) * DIM];
          if(up.collapsed)
          {
            let downValue = tiles[up.options[0]].edges[2];
            validOptionsUp = checkValid(0, downValue);
            //console.log(validOptionsUp);
          }
          else{
            validOptionsUp = allOptions;
          }
        }
        else
        {
          let up = grid[x + (DIM - 1) * DIM];
          if(up.collapsed)
          {
            let downValue = tiles[up.options[0]].edges[2];
            validOptionsUp = checkValid(0, downValue);
            //console.log(validOptionsUp);
          }
          else{
            validOptionsUp = allOptions;
          }
        }
        // Look right
        if(x < DIM - 1)
        {
          let right = grid[x + 1 + y * DIM];
          if(right.collapsed)
          {
            let leftValue = tiles[right.options[0]].edges[3];
            validOptionsRight = checkValid(1, leftValue);
          }
          else{
            validOptionsRight = allOptions;
          }
        }
        else
        {
          // Wrap around grid
          let right = grid[0 + y * DIM];
          if(right.collapsed)
          {
            let leftValue = tiles[right.options[0]].edges[3];
            validOptionsRight = checkValid(1, leftValue);
          }
          else{
            validOptionsRight = allOptions;
          }
        }
        // Look down
        if(y < DIM - 1)
        {
          let down = grid[x + (y + 1) * DIM];
          if(down.collapsed)
          {
            let upValue = tiles[down.options[0]].edges[0];
            validOptionsDown = checkValid(2, upValue);
            //console.log(validOptionsDown);
          }
          else{
            validOptionsDown = allOptions;
          }
        }
        else
        {
          // Wrap around grid
          let down = grid[x + (0) * DIM];
          if(down.collapsed)
          {
            let upValue = tiles[down.options[0]].edges[0];
            validOptionsDown = checkValid(2, upValue);
            //console.log(validOptionsDown);
          }
          else{
            validOptionsDown = allOptions;
          }
        }
        // Look left
        if(x > 0)
        {
          let left = grid[x - 1 + y * DIM];
          if(left.collapsed)
          {
            let rightValue = tiles[left.options[0]].edges[1];
            validOptionsLeft = checkValid(3, rightValue);
            //console.log(validOptionsLeft);
          }
          else{
          validOptionsLeft = allOptions;
          }
        }
        else
        {
          // Wrap around grid
          let left = grid[DIM - 1 + y * DIM];
          if(left.collapsed)
          {
            let rightValue = tiles[left.options[0]].edges[1];
            validOptionsLeft = checkValid(3, rightValue);
            //console.log(validOptionsLeft);
          }
          else{
          validOptionsLeft = allOptions;
          }
        }

        // Go through every spot in the up array and check if it is in all the other arrays
        for(let i = 0; i < validOptionsUp.length; i++)
        {
          if(validOptionsRight.includes(validOptionsUp[i]) && validOptionsDown.includes(validOptionsUp[i]) && validOptionsLeft.includes(validOptionsUp[i]))
          {
            // If it is, add it to the final array
            validOptions.push(validOptionsUp[i]);
          }
          
        }

        nextGrid[index] = {
          options:validOptions,
          collapsed: false,
        };
        //console.log(index + '  ' + validOptions);

      }

    }
  }

  grid = nextGrid;
  oldGrids.unshift(nextGrid);

  if(oldGrids.length > 100)
  {
    oldGrids.length = 100;
  }

}