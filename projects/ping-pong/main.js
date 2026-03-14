const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frame = 0
let state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
}


function draw() {
    
}
function update() {

}
function animate() {
    update();
    draw();
    frame++;
    requestAnimationFrame(animate);
}
animate();