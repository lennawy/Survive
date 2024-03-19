// let player;
let objects = [];
let heartIMG;
let hearts = [];
let bloodCount = 8;
let lastTime = 0;

// const canvasWidth = 1000;
// const canvasHeight = 600;

// function preload() {
//     player = createSprite(200, 200);
//     player.addImage('player', loadImage('../assets/player.png'));

//     heartIMG = loadImage('../assets/heart.png');
// }

function energy_setup() {
    // createCanvas(canvasWidth, canvasHeight);
    // background('lightyellow');

    for (let i = 0; i < bloodCount; i++) {
        hearts.push({ x: 20 + i * (heartIMG.width + 2), y: 20, img: heartIMG });
    }

    generateObjects(5, '/images/Apple_2.png', 0.1);
    generateObjects(5, '/images/Water_Bottle_1.png', 0.2);
    generateObjects(5, '/images/first_aid_kit.png', 0.02);

    lastTime = millis();
}

function generateObjects(count, imagePath, scaleValue) {
    for (let i = 0; i < count; i++) {
        let obj = createSprite(random(1000), random(600));
        obj.addImage('obj', loadImage(imagePath));
        obj.scale = scaleValue;
        obj.increaseCount = 1; // 每個物件碰撞時增加的血量
        objects.push(obj);
    }
}

// function KeyPressed() {
//     if (keyIsDown(LEFT_ARROW)) {
//         player.setVelocity(-2, 0);
//     } else if (keyIsDown(RIGHT_ARROW)) {
//         player.setVelocity(2, 0);
//     } else if (keyIsDown(UP_ARROW)) {
//         player.setVelocity(0, -2);
//     } else if (keyIsDown(DOWN_ARROW)) {
//         player.setVelocity(0, 2);
//     } else {
//         player.setVelocity(0, 0);
//     }
// }

function addBlood() {
    for (let i = 0; i < objects.length; i++) {
        let obj = objects[i];
        if (playerSprite.overlap(obj) && bloodCount < 10 && obj.increaseCount > 0) {
            bloodCount++;
            hearts.push({ x: 20 + bloodCount * (heartIMG.width + 2), y: 20, img: heartIMG });
            obj.increaseCount--; // 減少增加計數
            obj.remove();
            break; // 碰撞到一個物件後只增加一次血，跳出迴圈
        }
    }
}

function minusBlood() {
    let currentTime = millis();
    if (currentTime - lastTime >= 3000 && bloodCount > 0) {
        bloodCount--;
        hearts.pop();
        lastTime = currentTime;
    }

    // 檢查是否死亡
    if (bloodCount === 0) {
        playerSprite.setVelocity(0,0);
        // gameOver(); // 呼叫一個處理遊戲結束的函數
    }
}

function gameOver() {
    // 在這裡處理遊戲結束的邏輯，例如顯示遊戲結束畫面、停止遊戲等
    console.log("Game Over");
    currentScene = 'explosionScene';
    currentImageIndex = 0;
    showEndingImage(badImages[currentImageIndex]);
    badmusic();
}

function displayHearts() {
    for (let i = 0; i < hearts.length; i++) {
        image(hearts[i].img, 20 + i * (heartIMG.width/15 + 2), 20, heartIMG.width/15, heartIMG.height/15);
    }
}


function energy_draw() {
    // background('lightyellow');

    // drawSprites();
    // player.display();
    // KeyPressed();
    displayHearts();
    minusBlood();
    addBlood();
}
