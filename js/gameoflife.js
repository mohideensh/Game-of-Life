/**
* Game of life simulation
* @version v1
* @author Mohideen
* @link http://www.mohideen-sh.com/
*/

var Grid = function(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;

    this.canvas = document.createElement('CANVAS');
    this.canvas.style.border = "1px solid black";
    this.canvas.width = width * cellSize;
    this.canvas.height = height * cellSize;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
	
	this.canvas2 = document.createElement('CANVAS');
	this.canvas2.style.border = "1px solid black";
	this.canvas2.width = width * cellSize;
	this.canvas2.height = height * cellSize;
	this.ctx2 = this.canvas2.getContext('2d');
};

Grid.prototype = {
    setPoint: function(x, y) {
		var colors = ["#ffba00","#59E11F","#F70DD4","#F87A05", "#0515F8", "#ECF805"];
		var color = colors[( Math.floor(Math.random() * 5) + 0)];
		this.ctx2.fillStyle = color;
        this.ctx2.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    },

    unsetPoint: function(x, y) {
        this.ctx2.fillStyle = "#FFFFFF";
        this.ctx2.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    },
	
	paint: function() {
		this.ctx.drawImage(this.canvas2,0,0);
	},
	
	clear: function() {
		this.ctx.clearRect(0,0,this.canvas2.width, this.canvas2.height);
		this.ctx2.clearRect(0,0,this.canvas2.width, this.canvas2.height);
	}
};


(function(){
	
	function playGame(world, grid) {
		debugger
		function neighborsAlive(n) {
			return n[0] + n[1] + n[2] + n[3] + n[4] + n[5] + n[6] + n[7]; 
		}

		function findNeighbors(x,y) {
			return [
				world[x-1] && world[x-1][y-1] || 0, 
				world[x-1] && world[x-1][y] || 0, 
				world[x-1] && world[x-1][y+1] || 0, 
				world[x][y-1] || 0, 
				world[x][y+1] || 0, 
				world[x+1] && world[x+1][y-1] || 0, 
				world[x+1] && world[x+1][y] || 0, 
				world[x+1] && world[x+1][y+1] || 0
			]
		}
				
		function existsRow(world, row) {
			return !!world[row];
		}
				
		function willBeAlive (neigbors, cell) {
			if (neigbors > 1 && neigbors < 4 && !!cell) {
				return 1;
			}else if(neigbors === 3 && !cell) {
				return 1;
			}

			return 0;
		}
				
		function lifeCycle(){
			return world.map(function(row, i){
				return row.map(function(cell, j){
					return willBeAlive(neighborsAlive(findNeighbors(i,j)), cell);
				});
			});
		}
		
		function paintCycle(newWorld) {
			return newWorld.map(function(row, i){
				return row.map(function(cell, j){
					if(!!cell) {
						grid.setPoint(i,j);
					}
				});
			});
		}
		
		function cycle() {
			grid.clear();
			world = lifeCycle();
			paintCycle(world);
			grid.paint();
			requestAnimationFrame(cycle);
		}
				
		requestAnimationFrame(cycle);
	}
		
	function createGameOfLife(width, heigth) {
		playGame(createMatrix(width, heigth), new Grid(width/4, heigth/4, 4));
	}
	
	function createMatrix(width, height) {
		var matrix = [];
		
		for(var i=0; i<width; i++) {
			matrix[i] = [];
			for(var j=0; j<height; j++) {
				matrix[i][j] = ( ( Math.floor(Math.random() * 401) + 0) < 30) ? 1 : 0;
			}
		}
		return matrix;
	}
	
	createGameOfLife(800,400);
})();