class Block {
    /**
     * A block with a piece configuration and assigned board.
     * 
     * @param {Array} piece configuration of block
     * @param {Board} board board to be placed on
     */
    constructor(piece, board) {
        this.board = board;
        this.symbol = piece;
        this.pieceStates = PIECES[piece];
        this.rotationState = 0;
        this.piece = this.pieceStates[this.rotationState];
        this.color = COLORS[piece];
        this.xPosition = NEW_PIECE_POSITION.xPosition;
        this.yPosition = NEW_PIECE_POSITION.yPosition;
        if (!this.validPosition(this.xPosition,this.yPosition,this.rotationState)) {
            this.yPosition -=1;
        }
        
    }

    getSymbol() {
        return this.symbol;
    }

    tileInBounds(x, y) {
        return (x >= 0 &&
                x< this.board.getWidth() &&
                y >= 0 &&
                y < this.board.getHeight());
    }
    
    validPosition(x, y, state) {
        for (let j = 0; j < this.pieceStates[state].length; j++) {
            let row = this.pieceStates[state][j];
            for (let i = 0; i < row.length; i++) {
                let tile = row[i];
                if (tile) {
                    let tilePosition = {
                        x: x + i,
                        y: y + j
                    }
                    if (!this.tileInBounds(tilePosition.x, tilePosition.y) ||
                        this.board.boardArray[tilePosition.y][tilePosition.x] != 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    
    /**
     * Moves piece to desired coordinate.
     * @param {number} x new x position of block
     * @param {number} y new y position of block
     */
    move(x, y) {
        if (this.validPosition(x, y, this.rotationState)) {
            this.xPosition = x;
            this.yPosition = y;
        } else {
            ;
        }
    }

    
    translate(direction) {
        let translateX = DIRECTIONS[direction][0];
        let translateY = DIRECTIONS[direction][1];
        this.move(this.xPosition + translateX, this.yPosition + translateY);
    }

    getVisibleTiles() {
        let visibleTiles = [];
        for (let j = 0; j < this.piece.length; j++) {
            let row = this.piece[j];
            for (let i = 0; i < row.length; i++) {
                let tile = row[i];
                if (tile &&
                    0 <= this.xPosition + i && this.xPosition + i <= this.board.getWidth() &&
                    0 <= this.yPosition + j && this.yPosition + j <= this.board.getHeight()) {
                    visibleTiles.push([this.xPosition + i,
                                       this.yPosition + j]);    
                }
            }
        }
        return visibleTiles;
    }

    rotate(clockwise) {
        if (this.symbol == 'O') {
            return;
        }
        let testState = (((this.rotationState + (clockwise ? 1 : -1)) % 4) + 4) % 4;
        let kickTable = this.symbol == 'I' ? I_KICK_TABLE : STANDARD_KICK_TABLE;
        let transitionKey = this.rotationState.toString() + testState.toString();
        for (let [xKick, yKick] of kickTable[transitionKey]) {
            if (this.validPosition(this.xPosition + xKick, this.yPosition - yKick, testState)) {
                this.rotationState = testState;
                this.piece = this.pieceStates[this.rotationState];
                this.move(this.xPosition + xKick, this.yPosition - yKick)
                break;
            }
        }
    }

    rotate180() {
        if (this.symbol == 'O') {
            return;
        }
        let testState = (((this.rotationState + 2) % 4) + 4) % 4;
        let kickTable = ROTATE_180_KICK_TABLE;
        let transitionKey = this.rotationState.toString() + testState.toString();
        // console.log(transitionKey)
        // console.log(kickTable[transitionKey])
        for (let [xKick, yKick] of kickTable[transitionKey]) {
            if (this.validPosition(this.xPosition + xKick, this.yPosition - yKick, testState)) {
                this.rotationState = testState;
                this.piece = this.pieceStates[this.rotationState];
                this.move(this.xPosition + xKick, this.yPosition - yKick)
                break;
            }
        }
    }

    getFinalYPosition() {
        let testY = this.yPosition;
        while (this.validPosition(this.xPosition, testY+1, this.rotationState)) {
            testY += 1;
        }
        return testY;
    }

    getFinalTiles() {
        let finalTiles = [];
        let finalY = this.getFinalYPosition();
        for (let j = 0; j < this.piece.length; j++) {
            let row = this.piece[j];
            for (let i = 0; i < row.length; i++) {
                let tile = row[i];
                if (tile &&
                    0 <= this.xPosition + i && this.xPosition + i <= this.board.getWidth() &&
                    0 <= finalY + j && finalY + j <= this.board.getHeight()) {
                    finalTiles.push([this.xPosition + i,
                                       finalY + j]);    
                }
            }
        }
        return finalTiles;
    }

    dropPiece() {
        this.yPosition = this.getFinalYPosition();
    }
}
