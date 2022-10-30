class Display {
    /**
     * 
     * @param {Board} board 
     * @param {Element} htmlContainer 
     */
    constructor(board, htmlContainer) {
        this.board = board;
        this.htmlContainer = htmlContainer;
        this.boardContainer = htmlContainer.getElementsByClassName('board')[0];
        this.upcomingContainer = htmlContainer.getElementsByClassName('upcoming')[0];
        this.holdContainer = htmlContainer.getElementsByClassName('hold')[0];
        this.currentPieceTiles = [];
        this.currentGhostTiles = [];

        for (let i=0; i < HEIGHT; i++) {
            var row = document.createElement('div');
            if (i < HEIGHT - 20) {
                row.style.display = 'none';
            }
            row.setAttribute('class', 'row');
            this.boardContainer.append(row)
            for (let j=0; j < WIDTH; j++) {
                var square = document.createElement('div');
                square.setAttribute('class', 'square');
                row.append(square);
            }
        }
        this.updateUpcomingPieces();
        this.updateCurrentPiece();
    }

    updateCurrentPiece() {
        for (let tile of this.currentPieceTiles) {
            let x = tile[0];
            let y = tile[1];
            this.boardContainer.getElementsByClassName('row')[y]
            .getElementsByClassName('square')[x].style.backgroundColor = COLORS[this.board.boardArray[y][x]];  
        }
        for (let tile of this.currentGhostTiles) {
            let x = tile[0];
            let y = tile[1];
            this.boardContainer.getElementsByClassName('row')[y]
            .getElementsByClassName('square')[x].style.backgroundColor = COLORS[this.board.boardArray[y][x]];  
        }
        this.currentPieceTiles = this.board.getCurrentPiece().getVisibleTiles();
        this.currentGhostTiles = this.board.getCurrentPiece().getFinalTiles();
        for (let tile of this.currentGhostTiles) {
            let x = tile[0];
            let y = tile[1];
            this.boardContainer.getElementsByClassName('row')[y]
            .getElementsByClassName('square')[x].style.backgroundColor = COLORS.G;
        }
        for (let tile of this.currentPieceTiles) {
            let x = tile[0];
            let y = tile[1];
            this.boardContainer.getElementsByClassName('row')[y]
            .getElementsByClassName('square')[x].style.backgroundColor = this.board.getCurrentPiece().color // +'80';
        }
    }

    updateDisplayBoard() {
        this.board.boardArray.forEach((row, rowIndex) => 
            row.forEach((square, squareIndex) => {
                this.boardContainer.getElementsByClassName('row')[rowIndex]
                .getElementsByClassName('square')[squareIndex].style.backgroundColor = COLORS[square];
            }
            ));
        this.updateUpcomingPieces();
    }
    
    updateUpcomingPieces() {
        this.upcomingContainer.innerHTML = '';
        for(let shape of this.board.shapeGenerator.getUpcomingDisplayPieces()) {
            this.upcomingContainer.append(ICONS[shape].cloneNode(true));
        }
    }

    updateHoldPiece() {
        this.holdContainer.innerHTML = '';
        let heldPiece = this.board.heldPiece;
        this.holdContainer.append(ICONS[heldPiece].cloneNode(true));
    }
}
