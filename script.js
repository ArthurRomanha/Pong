const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const divEndGame = document.getElementById('endGame');
const textVictory = document.getElementById('textVictory');
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;

const tickSpeed = 40;

const heightRacket = 90;
const widthRacket = 15;

let positionXRacket1 = widthRacket;
let positionYRacket1 = canvas.height / 2 - heightRacket / 2;

let positionXRacket2 = canvas.width - widthRacket * 2;
let positionYRacket2 = canvas.height / 2 - heightRacket / 2;

const sizeBall = 30;
let positionXBall = canvas.width / 2 - sizeBall / 2;
let positionYBall = canvas.height / 2 - sizeBall / 2;

let loopId;

let directionBall;

let chooseDirectionBall = () => {
    let side = Math.round(Math.random());
    if (side == 1) {
        directionBall = -90;
    }
    if (side == 0) {
        directionBall = 90;
    }
}
const drawSprites = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(positionXRacket1, positionYRacket1, widthRacket, heightRacket);
    //racket 1

    ctx.fillRect(positionXRacket2, positionYRacket2, widthRacket, heightRacket);
    //racket 2

    ctx.fillRect(positionXBall, //position X
        positionYBall,// position Y
        sizeBall, sizeBall);
    //width   //height
}
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray';

    for (let i = 0; i < canvas.width + widthRacket*2; i += widthRacket*2) {//linhas verticais
        ctx.beginPath();
        ctx.lineTo(i, 0)
        ctx.lineTo(i, canvas.width)
        ctx.stroke()

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}
const geralSpeed = 30;
const minusSpeed = 15;//to the diagonals
const moveBall = () => {
    switch (directionBall) {
        case 45:
            positionXBall += minusSpeed;//move right up
            positionYBall -= minusSpeed;

            break;
        case 90:
            positionXBall += geralSpeed;//move only right
            break;
        case 135:
            positionXBall += minusSpeed;
            positionYBall += minusSpeed; //move right down
            break;

        case -45:
            positionXBall -= minusSpeed;
            positionYBall -= minusSpeed; //move up left
            break;
        case -90:
            positionXBall -= geralSpeed; //move only left
            break;
        case -135:
            positionXBall -= minusSpeed; // move left down
            positionYBall += minusSpeed;
            break;

    }
}

let oneThirdHeight = heightRacket / 3;

const ballRacket = () => {

    let firstSquareRacket1 = positionYRacket1;//position square up
    let secondSquareRacket1 = positionYRacket1 + oneThirdHeight * 1;//position square center
    let thirdSquareRacket1 = positionYRacket1 + oneThirdHeight * 2;//position square down

    //racket2
    let firstSquareRacket2 = positionYRacket2;//position square up
    let secondSquareRacket2 = positionYRacket2 + oneThirdHeight * 1;//position square center
    let thirdSquareRacket2 = positionYRacket2 + oneThirdHeight * 2;//position square down

    if ((positionXRacket1 + widthRacket == positionXBall) && (firstSquareRacket1 == positionYBall)) {
        directionBall = 45;
    }
    if ((positionXRacket1 + widthRacket == positionXBall) && (secondSquareRacket1 == positionYBall)) {
        directionBall = 90;
    }
    if ((positionXRacket1 + widthRacket == positionXBall) && (thirdSquareRacket1 == positionYBall)) {
        directionBall = 135;
    }
    //racket 2
    if ((positionXRacket2 - widthRacket * 2 == positionXBall) && (firstSquareRacket2 == positionYBall)) {
        directionBall = -45;
    }
    if ((positionXRacket2 - widthRacket * 2 == positionXBall) && (secondSquareRacket2 == positionYBall)) {
        directionBall = -90;
    }
    if ((positionXRacket2 - widthRacket * 2 == positionXBall) && (thirdSquareRacket2 == positionYBall)) {
        directionBall = -135;
    }
}
const resetPositions = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    positionYRacket1 = canvas.height / 2 - heightRacket / 2;
    positionYRacket2 = canvas.height / 2 - heightRacket / 2;
    positionXBall = canvas.width / 2 - sizeBall / 2;
    positionYBall = canvas.height / 2 - sizeBall / 2;
}
const ballWall = () => {
    if (positionXBall == - sizeBall) { // left walls
        directionBall = 90;
        pointsPlayer2++;
        resetPositions();
    }
    if (positionXBall == canvas.width) {// right walls
        directionBall = -90;
        pointsPlayer1++;
        resetPositions();
    }
    if (positionYBall == 0 || positionYBall == canvas.height - sizeBall) { //up and down walls
        if (directionBall == 45 || directionBall == -135) {
            directionBall += 90;

        } else {
            directionBall -= 90;
        }
    }
}
const endGame = () => {
    divEndGame.style.visibility = "visible";
    if(pointsPlayer1==3){
        textVictory.innerText = `O player 1 venceu!`;
    }else{
        textVictory.innerText = `O player 2 venceu!`;
    }
}
const game = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSprites();
    moveBall();
    ballRacket();
    ballWall();
    drawGrid();

    score.innerText= `${pointsPlayer1}  |  ${pointsPlayer2}`;

    loopId = setTimeout(() => {
        
        if(!(pointsPlayer1 == 3 || pointsPlayer2 == 3)){
            game();
        }else{
            endGame();
        }
    }, tickSpeed)
}
const restart = () => {
    window.location.reload();
}
game();
chooseDirectionBall();

document.addEventListener('keydown', function (tecla) {//racket 1
    if (!(positionYRacket1 <= 5)) {//arrow up
        switch (tecla.keyCode) {
            case 87:
                positionYRacket1 -= geralSpeed;
                break;
        }
    }
    if (!(positionYRacket1 + heightRacket > canvas.height - 15)) {//arrow down

        switch (tecla.keyCode) {
            case 83:
                positionYRacket1 += geralSpeed;
                break;
        }
    }
})
document.addEventListener('keydown', function (tecla) {//racket 2
    if (!(positionYRacket2 <= 5)) {//arrow up
        switch (tecla.keyCode) {
            case 38:
                positionYRacket2 -= geralSpeed;
                break;
        }
    }
    if (!(positionYRacket2 + heightRacket > canvas.height - 15)) {//arrow down

        switch (tecla.keyCode) {
            case 40:
                positionYRacket2 += geralSpeed;
                break;
        }
    }
})