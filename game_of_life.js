function make2DArray(cols, rows){
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let rows;
let cols;
let resolution = 10;
let entropy = 0;
let variable = [];

function setup() {
  createCanvas(600, 400);
  cols = width/resolution
  rows = height/resolution
  grid = make2DArray(cols, rows);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = floor(random(2));
      if (grid[i][j] == 1){
        entropy += 1;
      }
    }
  }
  variable.push(entropy)
}

function draw() {
  background(0);

  let next =  make2DArray(cols,rows);

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1){
        fill(255);
        circle(x, y, resolution-1);
      }
    }
  }

  // Compute next based on grid
    
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let state = grid[i][j];

      // // Edge
      // if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1){
      //   next[i][j] = state;
      // }
      // else{

        // Compute live neightbors
        let neightbours = countNeighbors(grid, i, j)
        
        if (state == 0 && neightbours == 3){
          next[i][j] = 1;
          entropy += 1;
          variable.push(entropy);
        }
        else if (state == 1 && (neightbours < 2 || neightbours > 3)){
          next[i][j] = 0;
          entropy -= 1;
          variable.push(entropy);
        }
        else {
          next[i][j] = state;
          entropy += 0;
          variable.push(entropy);
        }
      // if (next[i][j] == 1){
      //   entropy += 1
      //   variable.push(entropy)
      // }
      // else if (next[i][j] == 0){
      //   entropy -= 1
      //   variable.push(entropy)
      // }
      // }
      //console.log(entropy)
    }
  }
  
  grid = next;
  // if (variable[variable.length-1] == variable[variable.length-5000-3]  && variable[variable.length-1] == variable[variable.length-10000-3]){
  //   noLoop()
  //   console.log(variable)
  //}

}

function mouseClicked(){
  noLoop();
  console.log(variable);
}
function countNeighbors(grid, x, y){
  let sum = 0;
  for (let i =-1; i < 2; i++){
    for ( let j = -1; j < 2; j++){
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}