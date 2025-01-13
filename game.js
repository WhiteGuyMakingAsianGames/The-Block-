const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player model
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    color: 'red'
};

const block = {
    x: canvas.width / 2 - 50,
    y: canvas.height / 2 - 50,
    width: 100,
    height: 100,
    color: 'blue',
    face: 'smiling'
};

let hasGun = false;
let storyStep = 0;
const mapSize = 100;
const mapScale = 0.2;

const storyMessages = [
    "You found a friendly block! But something feels off...",
    "There are whispers about another block, a sibling perhaps?",
    "You found a clue! Block 2 might be hiding somewhere nearby...",
    "The mystery deepens. What happened to Block 2?"
];

// Load 8-bit like font
const font = new FontFace('PressStart2P', 'url(https://fonts.gstatic.com/s/pressstart2p/v11/e3t4euO8T2rTkwuOwZSKM3Z2lC7nOQ-xsNqO47m55DA.woff2)');
font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    ctx.font = '16px PressStart2P';
});

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

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

function drawBushes() {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(200, 200, 80, 80);
    ctx.fillRect(400, 400, 80, 80);
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
    drawBushes();
    drawPathEntry();
    drawBlock();
    drawPlayer();
    drawMap();
    requestAnimationFrame(draw);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the player clicked on a bush
    if (
        (mouseX > 200 && mouseX < 280 && mouseY > 200 && mouseY < 280) ||
        (mouseX > 400 && mouseX < 480 && mouseY > 400 && mouseY < 480)
    ) {
        alert("You entered the bush world!");
        // Load bush world
        loadBushWorld();
    } else if (
        mouseX > player.x &&
        mouseX < player.x + player.width &&
        mouseY > player.y &&
        mouseY < player.y + player.height
    ) {
        if (hasGun) {
            alert("You shot the friendly block! The mystery remains unsolved...");
        } else {
            alert(storyMessages[storyStep]);
            storyStep = (storyStep + 1) % storyMessages.length;
        }
    } else {
        alert('You found a hidden gun!');
        hasGun = true;
    }

    // Draw the interaction on the map
    ctx.fillStyle = hasGun ? 'red' : 'green';
    ctx.fillRect(canvas.width - mapSize - 10 + mouseX * mapScale, 10 + mouseY * mapScale, 2, 2);
});

// Movement keys
document.addEventListener('keydown', (event) => {
    const speed = 5;
    switch (event.key) {
        case 'ArrowUp':
            player.y -= speed;
            break;
        case 'ArrowDown':
            player.y += speed;
            break;
        case 'ArrowLeft':
            player.x -= speed;
            break;
        case 'ArrowRight':
            player.x += speed;
            break;
    }
});

function loadBushWorld() {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '20px PressStart2P';
    ctx.fillText('Welcome to the Bush World!', 50, 50);
    ctx.fillText('A land of mystery...', 50, 80);
    // Add more features of the bush world here
}

draw();
