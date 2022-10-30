const DISPLAY = document.getElementsByClassName('game')[0];
const TEXT = document.getElementsByTagName('h3')[0];
const GAME_STAT_TEXT = document.getElementById('gameStats');

var test = new Board(WIDTH, HEIGHT);
var display = new Display(test, DISPLAY);
var game = display.board;
var keysHeld = {};
var currentShiftDirection = null;
var currentShiftLoop = null;
var currentShiftDelay = null;


document.onkeydown = keydown; 
document.onkeyup = keyup;


function horizontalShiftLoop(direction) {
    currentShiftLoop = setInterval(function() {
                        game.getCurrentPiece().translate(direction);
                        if (keysHeld[softDrop]) {
                            game.getCurrentPiece().dropPiece();
                        }
                        display.updateCurrentPiece();
                        }, arr)
}


var startTime = Date.now();
GAME_STAT_TEXT.innerHTML = `
${ game.totalLinesCleared }
<div class="subtext">lines cleared</div>
`;

// var interval = setInterval(function() {
//     var elapsedTime = Date.now() - startTime;
//     TEXT.innerHTML = (elapsedTime / 1000).toFixed(3);
// }, 10);



function keydown (event) { 
    if (document.activeElement.tagName === "INPUT") {
        console.log('hi')
        return;
    }
    if (!game.gameOver) {
        if (!keysHeld[event.code]) {
            switch (event.code) {
                case moveLeft:
                    currentShiftDirection = event.code;
                    game.getCurrentPiece().translate('LEFT')
                    if (keysHeld[softDrop]) {
                        game.getCurrentPiece().dropPiece();
                    }
                    clearInterval(currentShiftLoop);
                    clearTimeout(currentShiftDelay);
                    currentShiftDelay = setTimeout(horizontalShiftLoop, das, 'LEFT')
                    break;
                case moveRight:
                    currentShiftDirection = event.code;
                    game.getCurrentPiece().translate('RIGHT')
                    if (keysHeld[softDrop]) {
                        game.getCurrentPiece().dropPiece();
                    }
                    clearInterval(currentShiftLoop);
                    clearTimeout(currentShiftDelay);
                    currentShiftDelay = setTimeout(horizontalShiftLoop, das, 'RIGHT')
                    break;
                case softDrop:
                    game.getCurrentPiece().dropPiece();
                    break;
                case hardDrop:
                    game.lockPiece();
                    display.updateDisplayBoard();
                    // let linesRemaining = sprintLength - game.totalLinesCleared
                    GAME_STAT_TEXT.innerHTML = `
                    ${ game.totalLinesCleared }
                    <div class="subtext">lines cleared</div>
                    `;

                    // if ((sprintLength - game.totalLinesCleared) < 1 && interval) {
                    //     var elapsedTime = Date.now() - startTime;
                    //     TEXT.innerHTML = (elapsedTime / 1000).toFixed(3);
                    //     clearInterval(interval);
                    //     interval = null;
                    // }
                    break;
                case rotateLeft:
                    game.getCurrentPiece().rotate(false);
                    break;
                case rotateRight:
                    game.getCurrentPiece().rotate(true);
                    break;
                case rotate180:
                    game.getCurrentPiece().rotate180();
                    break;
                case hold:
                    let updatePreview = false;
                    if (!game.heldPiece) {
                        updatePreview = true;
                    }
                    game.holdPiece();
                    if (updatePreview) {
                        display.updateUpcomingPieces();
                    }
                    display.updateHoldPiece();
                    break;
            }
        }
        display.updateCurrentPiece();
        if (test.gameOver) {
            TEXT.innerHTML = 'Game over'
        }
    }
    keysHeld[event.code] = true
}

function keyup (event) {
    delete keysHeld[event.code];
    if (event.code == 'ArrowLeft') {
        currentShiftDirection = keysHeld['ArrowRight'] ? 'ArrowRight' : null;
        clearInterval(currentShiftLoop);
        clearTimeout(currentShiftDelay);
        if (keysHeld['ArrowRight']) {
            currentShiftDelay = setTimeout(horizontalShiftLoop, das, 'RIGHT')
        }

    } else if (event.code == 'ArrowRight') {
        currentShiftDirection = keysHeld['ArrowLeft'] ? 'ArrowLeft' : null;
        clearInterval(currentShiftLoop);
        clearTimeout(currentShiftDelay);
        if (keysHeld['ArrowLeft']) {
            currentShiftDelay = setTimeout(horizontalShiftLoop, das, 'LEFT')
        }
    }
}

$(window).blur(function(){
    keysHeld = {};
}
);