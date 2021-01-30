const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Used for scaled games like those that use pixel art
const width = 84;
const height = 48;

ctx.imageSmoothingEnabled = false;

// Also used for scaled pixel art games
const scale = 5;
ctx.scale(scale, scale);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function playAudio (sound) {
    let audio = new Audio(sound);
    audio.addEventListener('canplaythrough', function () {
        audio.play();
    });
    console.log(audio);
}

// Clock and timers
const clock = {
    now: Date.now(),
    deltaTime: 0,
    timers: [],
    FPS: 15,

    // Called at end of every frame
    tick: function () {
        if (Date.now() - this.now < (1 / this.FPS) * 1000) {
            sleep((1 / this.FPS * 1000) - (Date.now() - this.now));
        }

        this.deltaTime = Date.now() - this.now;
        this.now = Date.now();

        for (let obj in this.timers) {
            if (this.now > this.timers[obj].start + this.timers[obj].interval) {
                this.timers[obj].start = this.now;
                this.timers[obj].callback();
            }
        }
    },

    // Callback executed at the end of a frame after one interval passes (looping)
    setTimer: function (interval, callback) {
        let obj = {};
        obj.start = this.now;
        obj.interval = interval;
        obj.callback = callback;

        this.timers.push(obj);
    },

    // Remove timer by index
    removeTimer : function (index) {
        this.timers.splice(index, 1);
    }
}

function Entity (x, y, w, h, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
}

Entity.prototype.draw = function () {
    const x = this.x;
    const y = this.y;

    const image = new Image();
    image.src = this.sprite;
    image.onload = function () {
        ctx.drawImage(image, x, y);
    }
};

Entity.prototype.update = function () {
    this.draw();
};

Entity.prototype.checkCollision = function (entity) {
    for (let i = 0; i < 2; ++i) {
        const x = entity.x + ((entity.w - 1) * i);
        const y1 = entity.y;
        const y2 = entity.y + entity.h - 1;

        if ((x >= this.x && x <= this.x + this.w - 1) && (y1 >= this.y && y1 <= this.y + this.h - 1)) {
            return true;
        }
        if ((x >= this.x && x <= this.x + this.w - 1) && (y2 >= this.y && y2 <= this.y + this.h - 1)) {
            return true;
        }
    }
    return false;
};

function clear () {
    const image = new Image();
    image.src = 'bkgrnd.png';
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
    }
}

function animate () {
    window.requestAnimationFrame(animate);

    // Clear canvas with background
    clear();

    // Draw sprite

    clock.tick();
}

document.onkeydown = function(e) {
    switch(e.which) {
        case 37: // left
        break;

        case 38: // up
        break;

        case 39: // right
        break;

        case 40: // down
        break;

        case 32: // space
        break;

        default: 
        console.log(e.which);
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

animate()
