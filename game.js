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

let hasGun = false;
const mapSize = 100;
const mapScale = 0.2;

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

function drawGrass() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < canvas.width; i += 50) {
        for (let j = 0; j < canvas.height; j += 50) {
            ctx.fillRect(i, j, 40, 40);
        }
    }
}

function drawPathEntry() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(canvas.width / 2 - 50, 0, 100, 100); // Path entry at the top center
}

function drawMap() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(canvas.width - mapSize - 10, 10, mapSize, mapSize);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrass();
    drawPathEntry();
    drawBlock();
    drawMap();
    requestAnimationFrame(draw);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
        mouseX > block.x &&
        mouseX < block.x + block.width &&
        mouseY > block.y &&
        mouseY < block.y + block.height
    ) {
        if (hasGun) {
            block.face = 'sad';
        } else {
            alert('You found a friendly block!');
        }
    } else {
        alert('You found a hidden gun!');
        hasGun = true;
    }

    // Draw the interaction on the map
    ctx.fillStyle = hasGun ? 'red' : 'green';
    ctx.fillRect(canvas.width - mapSize - 10 + mouseX * mapScale, 10 + mouseY * mapScale, 2, 2);
});

draw();
