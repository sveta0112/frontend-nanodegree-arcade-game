// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 40;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set the speed
    this.speed = Math.random() * 100 + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 450) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
        this.x += this.speed * dt;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 83;
    this.sprite = 'images/char-boy.png';
};

//updates x and y of player
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
};

//resets player positions for x(200) and y(400)
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if(this.x >= 101) this.x -= 101;
            break;
        case 'up':
            if(this.y >= 0) this.y -= 83;
            break;
        case 'right':
            if(this.x <= 303) this.x += 101;
            break;
        case 'down':
            if(this.y <= 322) this.y += 83;
            break;
    }
};


/*-----------------collision------------------------*/
//checks for all collisions of enemies with player
let checkCollisions = function(targets) {
    let target;
    let isCollided = false;
    //check allEnemies if its array
    if (Array.isArray(targets)){
        //loop through it
        for (var i = 0; i < targets.length; i++) {
            //individual enemy
            target = targets[i];
            //in case satisfy below condition, set isColiided to true
            if (player.x < target.x + target.width && player.x + player.width  > target.x && player.y < target.y + target.height && player.y + player.height > target.y){
                console.log ("collision!!");
                isCollided = true;
            }
        }
    }
    //return either true or false
    return isCollided;
};


/*-----------------Collision code for player class--------------------*/
Player.prototype.checkCollisions = function (targets) {
    //invoking checkCollisions function
    let collision = checkCollisions(allEnemies);
    //in case both conditions below are true, proceed
    if (collision === true && this.y > 0 ) {
        //start over game
        this.reset();
    } else {
        //no collisons, and than if the player reaches water, player wins the game, start over game
        if (this.y <= 0) {
            this.y = -15;
            alert( 'You have won!!!');
            this.reset();
        }
    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy (0, 63), new Enemy(0, 146), new Enemy(0, 229)];

// Place the player object in a variable called player
let player = new Player(202, 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


