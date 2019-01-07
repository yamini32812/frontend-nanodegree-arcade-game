// Enemies our player must avoid
var Enemy = function (x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;
  // If the enemy bug cross the boundary, the xposition is set
  // to negative and speed is reset randomly.
	if (this.x > 400) {
		this.x = -100;
		this.speed = 200 + Math.floor(Math.random() * 200);
	}

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player class with its own properties.

var Player = function (x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/char-boy.png';
};
// Player class update() method.
Player.prototype.update = function () {
	// Prevent player from moving beyond canvas wall boundaries.
	if (this.x < 0) {
		this.x = 0;
	}

	if (this.y > 360) {
		this.y = 360;
	}

	if (this.x > 400) {
		this.x = 400;
	}

  // Check for player reaching top of canvas and winning the game
	if (this.y < 0) {
		window.alert('CONGRATS!!!');
		this.x = 200;
		this.y = 360;
	}

	// Check for collisions with enemies.
	for (let bug of allEnemies) {
		if (this.y == bug.y && (bug.x + 30 > this.x && bug.x < this.x + 15)) {
			this.x = 200;
			this.y = 360;
		}
	}
};

  // Player class render() method that draws the player on board.
Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

  // Player class handleInput() method that lets the player move on board
  // using keyboard strokes.
Player.prototype.handleInput = function (keyPress) {
	switch (keyPress) {
		case 'left':
			this.x -= this.speed + 50;
			break;
		case 'up':
			this.y -= this.speed + 30;
			break;
		case 'right':
			this.x += this.speed + 50;
			break;
		case 'down':
			this.y += this.speed + 30;
			break;
	}
};


// Instantiate your objects.
let allEnemies = [];
// Placing the player object in a variable called player.
let player = new Player(200, 360, 30);
// Creating three Enemy object instances.
let enemyOne = new Enemy(-100, 60, 200);
let enemyTwo = new Enemy(-100, 120, 250);
let enemyThree = new Enemy(-100, 180, 300);
// Placing all enemy objects in an array called allEnemies.
allEnemies.push(enemyOne, enemyTwo, enemyThree);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
