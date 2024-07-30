const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const heightRacket = 90;
const widthRacket = 15;

let positionXRacket1 = widthRacket * 1;
let positionYRacket1 = canvas.height / 2 - heightRacket / 2;

let positionXRacket2 = canvas.width - widthRacket * 2;
let positionYRacket2 = canvas.height / 2 - heightRacket / 2;

const sizeBall = 30;
let positionXBall = canvas.width / 2 - sizeBall / 2;
let positionYBall = canvas.height / 2 - sizeBall / 2;

let loopId;

let chooseSide = Math.round(Math.random());
let directionBall;
if (chooseSide == 1) {
    directionBall = -90;
}
if (chooseSide == 0) {
    directionBall = 90;
}

const drawSprites = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(positionXRacket1, positionYRacket1, widthRacket, heightRacket);
    //racket 1

    ctx.fillRect(positionXRacket2, positionYRacket2, widthRacket, heightRacket);
    //racket 2

    ctx.fillRect(positionXBall, //position X
        positionYBall,// position Y
        sizeBall, sizeBall)
    //width   //height
}
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray';

    for (let i = 0; i < canvas.width + 30; i += 30) {//linhas verticais
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 900)
        ctx.stroke()

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(900, i);
        ctx.stroke();
    }
}
const moveBall = () => {
    switch (directionBall) {
        case 90:
            positionXBall += 30;
            break;
        case -90:
            positionXBall -= 30;
            break;
        case 45:
            positionYBall -= 30;
            positionXBall += 30;
            break;
        case -45:
            positionYBall += 30;
            positionXBall -= 30;
            break;
        case 135:
            positionYBall += 30;
            positionXBall += 30;
            break;
        case -135:
            positionYBall -= 30;
            positionXBall -= 30;
            break;
    }
}

let umTercoHeight = heightRacket / 3;

const ballRacket = () => {

    let firstSquareRacket1 = positionYRacket1;//position square up
    let secondSquareRacket1 = positionYRacket1 + umTercoHeight * 1;//position square center
    let thirdSquareRacket1 = positionYRacket1 + umTercoHeight * 2;//position square down

    //racket2
    let firstSquareRacket2 = positionYRacket2;//position square up
    let secondSquareRacket2 = positionYRacket2 + umTercoHeight * 1;//position square center
    let thirdSquareRacket2 = positionYRacket2 + umTercoHeight * 2;//position square down

    if ((positionXRacket1 + widthRacket == positionXBall) && (firstSquareRacket1 == positionYBall)) {
            setDirection(-0.5);
    }
    if ((positionXRacket1 + widthRacket == positionXBall) && (secondSquareRacket1 == positionYBall)) {
            setDirection(-1);
    }
    if ((positionXRacket1 + widthRacket == positionXBall) && (thirdSquareRacket1 == positionYBall)) {
            setDirection(-1.5);
    }
    //racket 2
    if ((positionXRacket2 - 30 == positionXBall) && (firstSquareRacket2 == positionYBall)) {
            setDirection(-0.5);
    }
    if ((positionXRacket2 - 30 == positionXBall) && (secondSquareRacket2 == positionYBall)) {
            setDirection(-1);
    }
    if ((positionXRacket2 - 30 == positionXBall) && (thirdSquareRacket2 == positionYBall)) {
            setDirection(-1.5);
    }
}
const ballWall = () => {
    if(positionXBall == 0 || positionXBall == canvas.width){
        alert("Youu looose!");
        window.localStorage.refresh();
    }
    if(positionYBall == 0 || positionYBall == canvas.height - 30){
            setDirection(3);
    }
}
const setDirection = (angle) => {
    directionBall = directionBall * angle;
}
const game = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSprites();
    ballRacket();
    moveBall();
    ballWall();
    drawGrid();
    loopId = setTimeout(() => {
        game();
    }, 200)
}
game();

document.addEventListener('keydown', function (tecla) {//racket 1
    if (!(positionYRacket1 <= 5)) {//arrow up
        switch (tecla.keyCode) {
            case 87:
                positionYRacket1 -= 30;
                break;
        }
    }
    if (!(positionYRacket1 + heightRacket > canvas.height - 15)) {//arrow down

        switch (tecla.keyCode) {
            case 83:
                positionYRacket1 += 30;
                break;
        }
    }
})
document.addEventListener('keydown', function (tecla) {//racket 2
    if (!(positionYRacket2 <= 5)) {//arrow up
        switch (tecla.keyCode) {
            case 38:
                positionYRacket2 -= 30;
                break;
        }
    }
    if (!(positionYRacket2 + heightRacket > canvas.height - 15)) {//arrow down

        switch (tecla.keyCode) {
            case 40:
                positionYRacket2 += 30;
                break;
        }
    }
})