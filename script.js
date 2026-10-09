
const player = document.getElementById("player");

// Standing still images for each direction
const idleframes = {
    ArrowDown: "assets/maincharacter-front.png",
    ArrowUp: "assets/maincharacter-back.png",
    ArrowLeft: "assets/maincharacter-left.png",
    ArrowRight: "assets/maincharacter-right.png"
};

// Three walking frames for each direction
const animationFrames = {
    ArrowDown: [
        "assets/down-1.png",
        "assets/down-2.png",
        "assets/down3.png"
    ],

    ArrowUp: [
        "assets/up-1.png",
        "assets/up-2.png",
        "assets/up-3.png"
    ],

    ArrowLeft: [
        "assets/left-1.png",
        "assets/left-2.png",
        "assets/left-3.png"
    ],

    ArrowRight: [
        "assets/right-1.png",
        "assets/right-2.png",
        "assets/right-3.png"
    ]
};

// Character direction and animation settings
let currentDirection = "ArrowDown";
let currentFrame = 0;
let animationCounter = 0;

const animationSpeed = 8;

// Character position and movement speed
let x = 680;
let y = 380;

const speed = 4;
const keys = {};

// Detect when an arrow key is pressed
window.addEventListener("keydown", (event) => {
    const allowedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (allowedKeys.includes(event.key)) {
        event.preventDefault();

        keys[event.key] = true;
        currentDirection = event.key;
    }
});

// Detect when an arrow key is released
window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

// Main game loop
function gameLoop() {

    // 1. Move the character
    if (keys["ArrowLeft"]) x -= speed;
    if (keys["ArrowRight"]) x += speed;
    if (keys["ArrowUp"]) y -= speed;
    if (keys["ArrowDown"]) y += speed;

    // 2. Define the room boundaries
    const roomBounds = {
        left: 181.69,
        top: 18.86,
        right: 181.69 + 1077.58,
        bottom: 18.86 + 863.22
    };

    const playerWidth = 64;
    const playerHeight = 100;

    // 3. Keep the character inside the room
    x = Math.max(
        roomBounds.left,
        Math.min(roomBounds.right - playerWidth, x)
    );

    y = Math.max(
        roomBounds.top,
        Math.min(roomBounds.bottom - playerHeight, y)
    );

    // 4. Check whether the character is moving
    const isMoving =
        keys["ArrowUp"] ||
        keys["ArrowDown"] ||
        keys["ArrowLeft"] ||
        keys["ArrowRight"];

    // 5. Play walking animation or show idle sprite
    if (isMoving) {

        animationCounter++;

        if (animationCounter >= animationSpeed) {
            currentFrame = (currentFrame + 1) % 3;
            animationCounter = 0;
        }

        player.src =
            animationFrames[currentDirection][currentFrame];

    } else {

        currentFrame = 0;
        animationCounter = 0;

        player.src = idleframes[currentDirection];
    }

    // 6. Update the character's position on screen
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;

    // 7. Repeat the game loop
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();