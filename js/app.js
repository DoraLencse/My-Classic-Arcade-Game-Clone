//Global part of the game
let sprite = ['images/char-cat-girl.png'];
let collision = 0;
let level = 0;
let levelCount = document.querySelector('div.level');
let collect = 0;
let save;
let modalDisplay1 = document.getElementById('myModal');
let modalDisplay2 = document.getElementById('myModal2');
let leftMobileNav = document.getElementById('left');
let rightMobileNav = document.getElementById('right');
let upMobileNav = document.getElementById('up');
let downMobileNav = document.getElementById('down');

// Enemies our player must avoid
var Enemy = function(x, y, move) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.move = move;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.move = 100 + Math.floor(Math.random() * 200);
    }

    // Check for collision between player and enemies + collision counter
     	 
	 if (player.x < this.x + 50 &&
        player.x + 25 > this.x &&
        player.y < this.y + 25 &&
        25 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
		collision ++;
    }
	
	// An extra function for Life counter
	
	function life () {
	let heartFirst = document.getElementById('first-heart');
	let heartSecond = document.getElementById('second-heart');
	let heartThird = document.getElementById('third-heart');	
		
	if (collision === 1 ) {
	heartFirst.style.visibility='hidden';
	}
	
	if (collision === 2 ) {
	heartSecond.style.visibility='hidden';
	}
	
	if (collision === 3 ) {
	heartThird.style.visibility='hidden';
	endGame();
	}	
	}
	life();	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y, move) {
    this.x = x;
    this.y = y;
    this.move = move;
	
	this.sprite = sprite;
};

Player.prototype.update = function() {
    // Player should move within the canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check if player is reach top of the canvas and count this as a next level
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
		level++;
    }
	
	levelCount.innerHTML = '<div class="level">Level: '+level+'</div>';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
	
    switch (keyPress) {
        case 'left':
            this.x -= this.move + 50;
            break;
        case 'up':
            this.y -= this.move + 30;
            break;
        case 'right':
            this.x += this.move + 50;
            break;
        case 'down':
            this.y += this.move + 30;
            break;
    }
};

var Princess = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-princess-girl.png';
};

Princess.prototype.update = function() {
	// Check for collision between player and princess
     	 
	 if (player.x < this.x + 50 &&
        player.x + 75 > this.x &&
        player.y < this.y + 75 &&
        75 + player.y > this.y)  {
        this.x = 0;
        this.y = 0;
		save = true;
		console.log(save);
    }
};

Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};	

var Gem = function(x, y){
	this.x = x;
	this.y = y;
	this.sprite = 'images/Gem Orange2.png';
};

Gem.prototype.update = function() {
	// Check for collision between player and gems
     	 
	 if (player.x < this.x + 50 &&
        player.x + 50 > this.x &&
        player.y < this.y + 50 &&
        50 + player.y > this.y)  {
        this.x = -100;
        this.y = 0;
		collect ++;
    }
	
	function collectDiamonds () {
	  let diamondFirst = document.getElementById('first-diamond');
	  let diamondSecond = document.getElementById('second-diamond');
	  let diamondThird = document.getElementById('third-diamond');	
		
	  if (collect === 1 ) {
	  diamondFirst.style.color='DarkOrange';
	  }
	
	  if (collect === 2 ) {
	  diamondSecond.style.color='DarkOrange';
	  }
	
	  if (collect === 3 ) {
	  diamondThird.style.color='DarkOrange';
	  }	
		
	}
	collectDiamonds();
	endGame();

};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};	

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position "y" where the enemies/objects will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 150 + Math.floor(Math.random() * 700));
    allEnemies.push(enemy);
});

let randomx = [25, 125, 225, 325, 425];

var princess;
var allPrincess = [];
var princessPosition = [150];

princessPosition.forEach(function(posY) {
    princess = new Princess(randomx[Math.floor(Math.random() * randomx.length)], posY);
    allPrincess.push(princess);
});

let gem;
let allGems = [];
let gemsPosition = [80, 200, 280];


gemsPosition.forEach(function(posY) {
    gem = new Gem(randomx[Math.floor(Math.random() * randomx.length)], posY);
    allGems.push(gem);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Extra Function: Choose a Player

function pickPlayer() {
	
let pickPlayer1 = document.getElementById('player1');
let pickPlayer2 = document.getElementById('player2');
let pickPlayer3 = document.getElementById('player3');

pickPlayer1.onclick = function () {
pickPlayer1.setAttribute('class', 'select');
pickPlayer2.removeAttribute('class', 'select');
pickPlayer3.removeAttribute('class', 'select');
sprite.pop();
sprite.push('images/char-boy.png');
}

pickPlayer2.onclick = function () {
pickPlayer2.setAttribute('class', 'select');
pickPlayer1.removeAttribute('class', 'select');
pickPlayer3.removeAttribute('class', 'select');
sprite.pop();
sprite.push('images/char-cat-girl.png');
}

pickPlayer3.onclick = function () {
pickPlayer3.setAttribute('class', 'select');
pickPlayer1.removeAttribute('class', 'select');
pickPlayer2.removeAttribute('class', 'select');
sprite.pop();
sprite.push('images/char-horn-girl.png');
}

}

// Extra function: add mobile navigation for tablet / iPad users
function mobileNav() {
	leftMobileNav.onclick = function (){
		player.x -= player.move + 50;
}

rightMobileNav.onclick = function (){
		player.x += player.move + 50;
}

upMobileNav.onclick = function (){
		player.y -= player.move + 30;
}

downMobileNav.onclick = function (){
		player.y += player.move + 30;
}
}

mobileNav();
pickPlayer();

//The game is over, when all of the players life is gone, or when the mission is completed.
function endGame() {
		if(collision === 3){
		gameOverMessage();
		}
		
		if(collision < 3 && collect === 3 && save === true) {
		winMessage();	
		}
}

//Modal 

function gameOverMessage() {
 	modalDisplay1.style.display = 'block';	
}

function winMessage() {
 	modalDisplay2.style.display = 'block';
}

function closeModal() {
 	restartGame();
}

function restartGame() {
	location.reload(true);
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.querySelector('.again').addEventListener('click',restartGame);

document.getElementById('modalClose2').addEventListener('click', closeModal);
document.querySelector('.again2').addEventListener('click',restartGame);










