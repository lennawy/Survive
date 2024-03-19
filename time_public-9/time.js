// map
let bgmap; 
let blackMask;
let holeSprites = []; 
let holes = [];
//UI
let stage = 0;
let startImages = [];
// const test = require('example')

// player
let player; 

// score 
let appleScore = 5; 
let waterScore = 5; 
let firstAidScore = 5; 

let appleIcon; 
let waterIcon; 
let firstAidIcon;

// time
let sceneTimer; 
let timer; 

// life 
let life = []; 
let heart;

// sprites
let playerSprite;

// Buildings
let buildingsArr = [];
let BuildingsSpriteArr = []; 

//Facilities
let bin01, bin02, bin03;
let car01, car02, car03;
let crash;
let drain01, drain02, drain03;
let hospital;
let park;
let convenience;
let police;
let bd01_1, bd01_2;
let bd02_1, bd02_2, bd02_3, bd02_4;
let bd03;
let bd04_1, bd04_2;
let bd05_1, bd05_2;
let bd06;
let bd07_1, bd07_2;
let bd08_1, bd08_2;
let rubble01, rubble02;
let check_01, check_02;

// scene 
let currentScene = 'normalScene'; 
let isSceneChanging = false;

// canva settings 
let canvasWidth = 1000;
let canvasHeight = 600; 

// ending
let goodorbad; 
let count = Math.floor(Math.random() * (200 - 100 + 1) + 2000);//有調整為2000不然警報很快就響了

let musics = {};

let goodImages = ['images/scene/good1.png', 'images/scene/good2.png', 'images/scene/good3.png', 'images/scene/end.png'];
let badImages = ['images/scene/bad1.png', 'images/scene/bad2.png', 'images/scene/bad3.png', 'images/scene/end.png'];
let currentImageIndex = 0;


function preload() {
    musics.begin = createAudio('/musics/begin.mp3');//如果有做開始畫面的話可以加這個
    musics.background = createAudio('/musics/Background.mp3');
    musics.siren = createAudio('/musics/Siren.mp3');
    musics.bomb = createAudio('/musics/BOMB.mp3');
    musics.good = createAudio('/musics/good.mp3');//好結局音樂放置處
    musics.bad =createAudio('/musics/bad.mp3');//壞結局音樂放置處
    musics.run = ('/musics/run.mp3');
    bgmap = loadImage('/images/bgmap.png');
    playerSprite = createSprite(600, 150, 80, 90);
    playerSprite.scale = 0.1; 
    playerSprite.addImage('playerSprite', loadImage('images/player.png'));
    appleIMG = loadImage('images/Apple_2.png');
    waterIMG = loadImage('images/Water_Bottle_1.png');
    heartIMG = loadImage('images/heart.png');
    firstAidIMG = loadImage('images/first_aid_kit.png');
 
    //UI開始遊玩前的照片
    for (let i = 1; i <= 7; i++) {
        startImages.push(loadImage('images/scene/start' + i + '.png'));
    };

    //彩蛋圖片
    egg_Rubble = loadImage('/images/Egg/egg_Rubble.png');
    egg_Park = loadImage('/images/Egg/egg_Park.png');
    egg_Crash = loadImage('/images/Egg/egg_Crash.png');
    egg_Convenience = loadImage('/images/Egg/egg_Convenience.png');
    egg_Check = loadImage('/images/Egg/egg_Check.png');
    egg_Hospital = loadImage('/images/Egg/egg_Hospital.png');
    egg_Police = loadImage('/images/Egg/egg_Police.png');

    //facilities
    hospital = createSprite(50, 125);
    hospital.addImage('hospital', loadImage('/images/facilities_02/hospital.png'));
    police = createSprite(270, 90);
    police.addImage('police', loadImage('/images/facilities_02/police.png'));
    bd01_1 = createSprite(340, 200);
    bd01_1.addImage('bd01_1', loadImage('/images/facilities_02/bd01-1.png'));
    bd05_1 = createSprite(400, 55);
    bd05_1.addImage('bd05_1', loadImage('/images/facilities_02/bd05-1.png'));
    drain01 = createSprite(440, 130);
    drain01.addImage('drain01', loadImage('/images/facilities_02/drain.png'));
    holeSprites.push(drain01);
    check_01 = createSprite(506, 167);
    check_01.addImage('check_01', loadImage('/images/facilities_02/check.png'));
    check_02 = createSprite(481, 354);
    check_02.addImage('check_02', loadImage('/images/facilities_02/check.png'));
    bd01_2 = createSprite(615, 60);
    bd01_2.addImage('bd01_2', loadImage('/images/facilities_02/bd01-2.png'));
    bin01 = createSprite(650, 60);
    bin01.addImage('bin01', loadImage('/images/facilities_02/bin.png'));
    bd02_1 = createSprite(763, 53);
    bd02_1.addImage('bd02_1', loadImage('/images/facilities_02/bd02-1.png'));
    drain02 = createSprite(846, 85);
    drain02.addImage('drain02', loadImage('/images/facilities_02/drain.png'));
    holeSprites.push(drain02);
    rubble01 = createSprite(915, 70);
    rubble01.addImage('rubble01', loadImage('/images/facilities_02/rubble01.png'));
    bd02_2 = createSprite(570, 208);
    bd02_2.addImage('bd02_2', loadImage('/images/facilities_02/bd02-2.png'));
    bd08_1 = createSprite(660, 185);
    bd08_1.addImage('bd08_1', loadImage('/images/facilities_02/bd08.png'));
    bd08_2 = createSprite(660, 240);
    bd08_2.addImage('bd08_2', loadImage('/images/facilities_02/bd08.png'));
    bd03 = createSprite(785, 220);
    bd03.addImage('bd03', loadImage('/images/facilities_02/bd03.png'));
    bd05_1 = createSprite(930, 225);
    bd05_1.addImage('bd05_1', loadImage('/images/facilities_02/bd05-1.png'));
    rubble02 = createSprite(70, 460);
    rubble02.addImage('rubble02', loadImage('/images/facilities_02/rubble02.png'));
    park = createSprite(300, 463);
    park.addImage('park', loadImage('/images/facilities_02/park.png'));
    bin02 = createSprite(375, 450);
    bin02.addImage('bin03', loadImage('/images/facilities_02/bin.png'));
    drain03 = createSprite(375, 485);
    drain03.addImage('drain03', loadImage('/images/facilities_02/drain.png'));
    holeSprites.push(drain03);
    bd04_1 = createSprite(565, 400);
    bd04_1.addImage('bd04_1', loadImage('/images/facilities_02/bd04-1.png'));
    convenience = createSprite(680, 400);
    convenience.addImage('convenience', loadImage('/images/facilities_02/convenience.png'));
    bd05_2 = createSprite(535, 530);
    bd05_2.addImage('bd05_2', loadImage('/images/facilities_02/bd05-2.png'));
    bd04_2 = createSprite(650, 530);
    bd04_2.addImage('bd04_2', loadImage('/images/facilities_02/bd04-2.png'));
    bin03 = createSprite(615, 460);
    bin03.addImage('bin03', loadImage('/images/facilities_02/bin.png'));
    bd06 = createSprite(900, 390);
    bd06.addImage('bd06', loadImage('/images/facilities_02/bd06.png'));
    bd02_3 = createSprite(850, 484);
    bd02_3.addImage('bd02_3', loadImage('/images/facilities_02/bd02-3.png'));
    bd02_4 = createSprite(960, 484);
    bd02_4.addImage('bd02_4', loadImage('/images/facilities_02/bd02-3.png'));
    bd07_1 = createSprite(840, 535);
    bd07_1.addImage('bd07_1', loadImage('/images/facilities_02/bd07.png'));
    bd07_2 = createSprite(960, 535);
    bd07_2.addImage('bd07_2', loadImage('/images/facilities_02/bd07.png'));
    crash = createSprite(170, 300);
    crash.addImage('crash', loadImage('/images/facilities_02/crash.png'));
    car01 = createSprite(555, 287);
    car01.addImage('car01', loadImage('/images/facilities_02/car01.png'));
    car02 = createSprite(770, 450);
    car02.addImage('car02', loadImage('/images/facilities_02/car02.png'));
    car03 = createSprite(438, 450);
    car03.addImage('car03', loadImage('/images/facilities_02/car03.png'));
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    blackMask = createGraphics(canvasWidth, canvasHeight);
    blackMask.colorMode(HSB, 360, 100, 100, 100);
    
    energy_setup(); 
    musics.background.play();//進入遊戲播放背景音樂
}

//警報聲響起
function alert(){
    if (frameCount === (count - 650 )){
        musics.background.stop();
        musics.siren.play();
    }
}
//爆炸聲響起
function exploreMusic(){
    if (frameCount === (count - 500 )){
        musics.bomb.play();
    }
}

//好結局音效
function goodmusic(){
    musics.siren.stop();
    musics.bomb.stop();
    musics.good.play();
}
//壞結局音效
function badmusic(){
    musics.siren.stop();
    musics.bomb.stop();
    musics.bad.play();
}

function showEndingImage(imagePath) {
    bgmap = loadImage(imagePath);
}

function keyPressed() {
    let moving = false;

    if (keyIsDown(LEFT_ARROW) || keyIsDown('W')) {
        playerSprite.setVelocity(-2, 0);
        moving = true;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        playerSprite.setVelocity(2, 0);
        moving = true;
    }
    else if (keyIsDown(UP_ARROW)) {
        playerSprite.setVelocity(0, -2);
        moving = true;
    }
    else if (keyIsDown(DOWN_ARROW)) {
        playerSprite.setVelocity(0, 2);
        moving = true;
    }

    // if (moving && !musics.run.isPlaying()) {
    //     musics.run.loop(); // 循環播放跑步音效
    // }

    if (key === 'ArrowLeft') {
        if (currentScene === 'GoodScene' || currentScene === 'explosionScene') {
            currentImageIndex++;
            if (currentImageIndex < goodImages.length) {
                showEndingImage(currentScene === 'GoodScene' ? goodImages[currentImageIndex] : badImages[currentImageIndex]);
            } else {
                // 當所有圖片都已顯示，重新整理視窗以重置遊戲
                window.location.reload();
            }
        }
    }
}

function keyReleased() {
    musics.run.stop(); // 停止播放跑步音效
}

// mousePressed 函數
// function mousePressed() {
//     if (currentScene === 'GoodScene' || currentScene === 'explosionScene') {
//         currentImageIndex++;
//         if (currentImageIndex < goodImages.length) {
//             showEndingImage(currentScene === 'GoodScene' ? goodImages[currentImageIndex] : badImages[currentImageIndex]);
//         } else {
//             // 當所有圖片都已顯示，重新整理視窗以重置遊戲
//             window.location.reload();
//         }
//     }
// }


function createObject(width, height) {
    return {
        x: random(width, canvasWidth - width),
        y: random(height, canvasHeight - height),
        width: width,
        height: height,
    };
}

function avoidCollisions(newObject, existingObjects) {
    const safeDistance = 50;

    for (const existingObject of existingObjects) {
        const distance = dist(newObject.x, newObject.y, existingObject.x, existingObject.y);
        if (distance < safeDistance) {
            newObject.x = random(newObject.width, canvasWidth - newObject.width);
            newObject.y = random(newObject.height, canvasHeight - newObject.height);
            avoidCollisions(newObject, existingObjects);
            break; 
        }
    }
}   

// // new holes
// function drawHoles(){
//     image(hole, 100, 200, 100, 100); 
// }

function keyReleased() {
    playerSprite.setSpeed(0, 0);
}

// 隨機秒數後觸發切換場景
function checkSceneChange() {
    console.log("frameCount:" + frameCount + "count: " + count); 
    if (frameCount === count) {
        changeScene();
    }
}

// 切換場景
function changeScene(){
    isSceneChanging = true; 
    goodorbad = false;
    for(let i=0; i<holeSprites.length; i++){
        if(playerSprite.overlap(holeSprites[i])){
            console.log("玩家與防空洞重疊");
            goodorbad = true;
            // break;
        }
        holeSprites[i].remove(); 
    } 
    for(let i=0; i<BuildingsSpriteArr.length; i++){
        BuildingsSpriteArr[i].remove(); 
    }
    playerSprite.remove(); 

    console.log("changeScene called, goodorbad:", goodorbad);
   
    // 偵測人＆防空洞 collision 
    if (goodorbad) {
        currentScene = 'GoodScene';
        currentImageIndex = 0;
        showEndingImage(goodImages[currentImageIndex]);
        goodmusic();
    } else {
        currentScene = 'explosionScene';
        currentImageIndex = 0;
        showEndingImage(badImages[currentImageIndex]);
        badmusic();
    }
}

// 觸發彩蛋
function checkOsternEgg() {
    if (playerSprite.overlap(hospital)) {
        image(egg_Hospital, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('hospital');
    }
    else if (playerSprite.overlap(rubble01) || playerSprite.overlap(rubble02)) {
        image(egg_Rubble, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('rubble');
    }
    else if (playerSprite.overlap(park)) {
        image(egg_Park, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('park');
    }
    else if (playerSprite.overlap(crash)) {
        image(egg_Crash, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('crash');
    }
    else if (playerSprite.overlap(convenience)) {
        image(egg_Convenience, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('convenience');
    }
    else if (playerSprite.overlap(check_01) || playerSprite.overlap(check_02)) {
        image(egg_Check, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('check');
    }
    else if (playerSprite.overlap(police)) {
        image(egg_Police, width/2 - 500/2, height/2 - 300/2, 500, 300);
        console.log('police');
    }
  }

  function displayStartImage(stage) {
    background(startImages[stage]);
} 

function draw() {
    if (stage >= 0 && stage <= 6) {
        displayStartImage(stage);
    }

    if (stage == 7) { //按到stage7 call game
        game(); 
    }
    if (mouseIsPressed && !mouseWasPressed) {
        stage++;
        mouseWasPressed = true;
    }

    if (!mouseIsPressed) {
        mouseWasPressed = false;
    }

    //這以後都亂寫的只供參考

    // if (currentScene === "GoodScene" && isSceneChanging) {
    //      theGame =1;
    //     }
    // if(theGame === 1){
    //     background(goodImgs[0]);
    // }
    // if (mouseIsPressed && !mouseWasPressed) {
    //     theGame++;
    //     mouseWasPressed = true;
    // }

    // if (!mouseIsPressed) {
    //     mouseWasPressed = false;
    // }

}

function game() {
    clear();
    background(bgmap);
    blackMask.background(0, 0, 0, 100);
    
    if(currentScene === 'normalScene' && !(isSceneChanging)){
        blackMask.erase();
        const diameter = max(playerSprite.width * 4, playerSprite.height * 2);
        blackMask.ellipse(playerSprite.position.x, playerSprite.position.y, diameter, diameter);
        blackMask.noErase();

        playerSprite.position.x = constrain(playerSprite.position.x, 0 + playerSprite.width / 2, canvasWidth - playerSprite.width / 2);
        playerSprite.position.y = constrain(playerSprite.position.y, 0 + playerSprite.height / 2, canvasHeight - playerSprite.height / 2);
        playerSprite.display();
        drawSprites();
        image(blackMask, 0, 0);
        checkOsternEgg();
        energy_draw();
    }
    exploreMusic();
    alert();
    checkSceneChange(); 
}

// //防空洞的偵測
// function checkCollision(spriteA, spriteB) {
//     if(playerSprite.overlap(spriteA)){
//         console.log("alive");
//         return true;
//     }
//     else {
//         console.log("die"); 
//         return false; 
//     }
//   }
