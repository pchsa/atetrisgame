class ShapeGenerator{
    constructor() {
        this.upcomingPieces = [...this.generateBag(), ...this.generateBag()];
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
        
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        
        return array;
    }
    
    generateBag() {
        return this.shuffle(Object.keys(PIECES));
    }

    getNext() {
        if (this.upcomingPieces.length < 7) {
            this.upcomingPieces = [...this.upcomingPieces, ...this.generateBag()];
        }
        return this.upcomingPieces.shift();
    }

    getUpcomingDisplayPieces() {
        return this.upcomingPieces.slice(0, 5);
    }
}


