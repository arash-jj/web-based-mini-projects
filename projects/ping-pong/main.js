const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const p1E = document.getElementById("p1s")
const p2E = document.getElementById("p2s")
let frame = 0

let state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
}
let p1Score = 0 // left player
let p2Score = 0 // right player

// utils
function randomNum(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// classes
class Peddle {
    constructor(x, y, w, h, speed) {
        this.x = x; this.y = y;
        this.w = w; this.h = h;
        this.speed = speed;
        this.dy = 0;
    }
    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    update() {
        this.y += this.dy;
        if(this.y + this.h < 0 ) this.y = canvas.height + this.y 
        if(this.y + this.h > canvas.height + this.h) this.y = canvas.height - this.y
    }
}

class Ball {
    constructor(x, y, r, vx, vy) {
        this.r = r;
        this.x = x; this.y = y;
        this.vx = vx, this.vy = vy;
    }
    draw(ctx) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
    }
    update() {
        let rpx = peddleRight.x+peddleRight.w
        let rpx2 = peddleRight.x-peddleRight.w
        let rpt = peddleRight.y+peddleRight.h
        let rpb = peddleRight.y-peddleRight.h

        let lpx = peddleLeft.x+peddleLeft.w
        let lpx2 = peddleLeft.x-peddleLeft.w
        let lpt = peddleLeft.y+peddleLeft.h
        let lpb = peddleLeft.y-peddleLeft.h

        if (this.x + this.r < rpx && this.x + this.r > rpx2 && this.y > rpb && this.y < rpt) {
            this.vx = -this.vx
        }
        if (this.x - this.r < lpx && this.x - this.r > lpx2 && this.y > lpb && this.y < lpt) {
            this.vx = -this.vx
        }
        if(this.x + this.r > canvas.height || this.x - this.r < 0){
            this.vx = -this.vx
            ctx.fillStyle = "white"
            // Counting players scores
            // Right goal
            if (this.x + this.r > canvas.height) {
                p1Score += 1;
                resetBallPosition();
            }
            // Left goal
            if (this.x - this.r < 0) {
                p2Score += 1;
                resetBallPosition();
            };
        }
        if(this.y + this.r > canvas.width || this.y - this.r < 0){
            this.vy = -this.vy
        }
        this.x += this.vx
        this.y += this.vy
    }
} 

// game objs
const peddleLeft = new Peddle(20, canvas.height/2 - 40, 6, 70, 6);
const peddleRight = new Peddle(canvas.width - 30, canvas.height/2 - 40, 6, 70, 6);
const ball = new Ball(
    randomNum(200, 300),
    randomNum(200, 300), // limit the ball generating to a box in middle of the canvas
    6, 4, 4);

// Keyboard handling
const keyPressed = new Set();

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    keyPressed.add(e.code)
})

window.addEventListener("keyup", (e) => {
    keyPressed.delete(e.code);
})

// Map keys to peddles
function handleInp() {
    switch (state.current) {
        case state.getReady:
            if(keyPressed.has("Space")) state.current = state.game
            break;
        case state.game:
            // p1
            peddleLeft.dy = 0;
            if(keyPressed.has("KeyW")) peddleLeft.dy = peddleLeft.dy - peddleLeft.speed
            if(keyPressed.has("KeyS")) peddleLeft.dy = peddleLeft.dy + peddleLeft.speed
            
            // p2
            peddleRight.dy = 0;
            if(keyPressed.has('ArrowUp')) peddleRight.dy =- peddleRight.speed
            if(keyPressed.has('ArrowDown')) peddleRight.dy =+ peddleRight.speed
            break;
        case state.over:
            
            break;
    }
}

// States UI
function drawGetReadyPage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PRESS SPACE TO START", canvas.width/2, canvas.height/2);
}
// handle scores
function resetBallPosition() {
    ball.x = randomNum(200, 300);
    ball.y = randomNum(200, 300);
    ball.vx = ball.vy = 0;
    setTimeout(() => {
        ball.vx = ball.vy = 4;
    }, 1000);
}

// Game Lifecycle
function update() {
    peddleLeft.update();
    peddleRight.update();
    ball.update();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    peddleLeft.draw(ctx)
    peddleRight.draw(ctx)
    ball.draw(ctx)
}

function animate() {
    switch (state.current) {
        case state.getReady:
            drawGetReadyPage();
            p1Score = p2Score = 0
            break;
        case state.game:
            update();
            draw();
            break;
            case state.over: 
            // game over functionality 
            break;
        }
        p1E.textContent = p1Score;
        p2E.textContent = p2Score;
    handleInp();
    frame++;
    requestAnimationFrame(animate);
}

window.onload = () => {
    animate();
}