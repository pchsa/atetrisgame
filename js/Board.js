class Board {
    /**
     * Board of a tetris game.
     * 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.boardArray = []
        this.shapeGenerator = new ShapeGenerator();
        this.heldPiece = null;
        this.gameOver = false;
        this.totalLinesCleared = 0;
        for (let i=0; i < this.height; i++) {
            var row = [];
            for (let j=0; j < this.width; j++) {
                row.push('0');
            }
            this.boardArray.push(row);
        }
        this.currentPiece = new Block(this.shapeGenerator.getNext(), this);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setCurrentPiece(piece) {
        this.currentPiece = piece;
        if (!piece.validPosition(piece.xPosition, piece.yPosition, piece.rotationState)) {
            this.gameOver = true;
        }
    }

    getCurrentPiece() {
        return this.currentPiece;
    }

    lockPiece() {
        this.currentPiece.dropPiece();
        let visibleTiles = this.currentPiece.getVisibleTiles()
        let symbol = this.currentPiece.getSymbol();
        for (let tile of visibleTiles) {
            this.boardArray[tile[1]][tile[0]] = symbol;

        }
        let fatalLock = true;
        let linesCleared = this.clearLines();
        for (let [checkX, checkY] of visibleTiles) {
            if (checkY >= this.height - 20) {
                fatalLock = false;
                break;
            }
        }
        if (fatalLock) {
           this.gameOver = true;
        }
        this.setCurrentPiece(new Block(this.shapeGenerator.getNext(), this));
    }

    clearLines() {
        let linesCleared = 0;
        let clearedBoard = this.boardArray.filter(function(row) {
            if (row.every(tile => tile != 0)) {
                linesCleared++;
                return false;
            }
            return true;
        })
        this.boardArray = clearedBoard;
        for (let i=0; i < linesCleared; i++) {
            this.boardArray.unshift(new Array(WIDTH).fill('0'))
        }
        this.totalLinesCleared += linesCleared;
        return linesCleared;
    }

    holdPiece() {
        let pieceToHold = this.getCurrentPiece().getSymbol();
        if (!this.heldPiece) {
            this.heldPiece = pieceToHold;
            this.setCurrentPiece(new Block(this.shapeGenerator.getNext(), this));
        } else {
            this.setCurrentPiece(new Block(this.heldPiece, this));
            this.heldPiece = pieceToHold;
        }    
    }
}
