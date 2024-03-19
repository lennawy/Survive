const apples = [];
const waters = [];
const firstAids = [];
const canvasWidth = 1000;
const canvasHeight = 800; 

function preload() {
    appleIMG = loadImage('images/Apple_2.png');
    waterIMG = loadImage('images/Water_Bottle_1.png');
    firstAidIMG = loadImage('images/first_aid_kit.png');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function spawnObject() {
    if (apples.length < 5) {
        const apple = createObject(20, 20);
        avoidCollisions(apple, apples);
        apples.push(apple);
    }

    if (waters.length < 5) {
        const water = createObject(30, 30);
        avoidCollisions(water, waters);
        waters.push(water);
    }

    if (firstAids.length < 5) {
        const firstAid = createObject(40, 50);
        avoidCollisions(firstAid, firstAids);
        firstAids.push(firstAid);
    }
}

function createObject(width, height) {
    return {
        x: random(width, canvasWidth - width),
        y: random(height, canvasHeight - height),
        width: width,
        height: height,
    };
}

function avoidCollisions(newObject, existingObjects) {
    const safeDistance = 50; // Adjust this value based on your preference

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

function drawApples() {
    apples.forEach(apple => {
        image(appleIMG, apple.x, apple.y, apple.width, apple.height);
    });
}

function drawWater() {
    waters.forEach(water => {
        image(waterIMG, water.x, water.y, water.width, water.height);
    });
}

function drawFirstAid() {
    firstAids.forEach(firstAid => {
        image(firstAidIMG, firstAid.x, firstAid.y, firstAid.width, firstAid.height);
    });
}

function draw() {
    background(200);
    spawnObject();
    drawApples();
    drawWater();
    drawFirstAid();
}


