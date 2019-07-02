var blockWidth = 100;
var blockHeight = 85;


// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set the speed
    var pxlpermsec = 200;
    this.speed = Math.floor(Math.random()*pxlpermsec + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy = new Enemy(0, 0);

// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy (0, 200), new Enemy(100, 400), new Enemy(200, 300)];



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    //assign player's movement
    this.moveLeft = function(){
        this.x -= blockWidth;
    };
    this.moveRight = function(){
        this.x += blockWidth; };
    this.moveUp = function(){ this.y -= blockHeight; };
    this.moveDown = function(){ this.y -= blockHeight; };
};


player.prototype.update = function(dt){
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 405) {
        this.x = 405;
    } else if (this.y === 0) {
        this.y = 405;
    } else if (this.y < 0) {
        this.y = 450;
    } else if (this.y > 550) {
        this.y = 505;
    }
};

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
player.prototype.handleInput = function(key){
    switch (key) {
        case 'left': 
            this.moveLeft();
            break;
        case 'up':
            this.moveUp();
            break;
        case 'right':
            this.moveRight();
            break;
        case 'down':
            this.moveDown();
            break;
    }

 };

// Place the player object in a variable called player
var player = new player(252,606);



document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


