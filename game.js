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

function drawGrass() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < canvas.width; i += 50) {
        for (let j = 0; j < canvas.height; j += 50) {
            ctx.fillRect(i, j, 40, 40);
        }
    }
}

function drawTerrain() {
    ctx.fillStyle = 'darkgreen';
    for (let i = 0; i < canvas.width; i += 100) {
        for (let j = 0; j < canvas.height; j += 100) {
            ctx.fillRect(i + Math.random() * 50, j + Math.random() * 50, 60, 60);
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
    drawTerrain();
    drawPathEntry();
    drawPlayer();
    drawMap();
    requestAnimationFrame(draw);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
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

draw();
