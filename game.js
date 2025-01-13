const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const block = {
    x: 250,
    y: 150,
    width: 100,
    height: 100,
    color: 'blue',
    face: 'smiling'
};

function drawBlock() {
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, block.width, block.height);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(block.x + 30, block.y + 40, 10, 0, Math.PI * 2);
    ctx.arc(block.x + 70, block.y + 40, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (block.face === 'smiling') {
        ctx.arc(block.x + 50, block.y + 60, 20, 0, Math.PI, false);
    } else if (block.face === 'sad') {
        ctx.arc(block.x + 50, block.y + 80, 20, 0, Math.PI, true);
    }
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock();
    requestAnimationFrame(draw);
}

draw();
