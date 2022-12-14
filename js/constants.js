const WIDTH = 10;
const HEIGHT = 24;
const COLORS = {
    T:'#c594c5',
    I:'#5fb3b3',
    J:'#6699cc',
    L:'#f99157',
    S:'#99c794',
    Z:'#ec5f67',
    O:'#fac863',
    0:'rgb(255, 255, 255, 0.02)',
    G:'rgb(255, 255, 255, 0.1)'};
const NEW_PIECE_POSITION = {
    xPosition: 3,
    yPosition: HEIGHT - 21
}

const DIRECTIONS = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0]
}

const TPIECE = {
    0: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]],
    1: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]],
    2: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]],
    3: [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]]
}

const IPIECE = {
    0:[
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],
    1:[
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]],
    2:[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]],
    3:[
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]]
}

const JPIECE = {
    0: [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]],
    1: [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]],
    2: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]],
    3: [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]]
}

const LPIECE = {
    0: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]],
    1: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]],
    2: [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
    3: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]]
}

const SPIECE = {
    0: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
    1: [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
    2: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]],
    3: [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]]
}

const ZPIECE = {
    0: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
    1: [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]],
    2: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]],
    3: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]]
}

const OPIECE = {
    0:[
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]],
    1:[
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]],
    2:[
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]],
    3:[
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]]
}

const PIECES = {
    T:TPIECE,
    I:IPIECE,
    J:JPIECE,
    L:LPIECE,
    S:SPIECE,
    Z:ZPIECE,
    O:OPIECE
}

const ICONS = {}

for (let [key, array] of Object.entries(PIECES)) {
    let icon = document.createElement('div');
    icon.className = 'icon';
    for (let row of array[0]) {
        let rowElement = document.createElement('div');
        rowElement.className = 'row'
        for (let tile of row) {
            let tileElement = document.createElement('div');
            tileElement.className = 'square'
            if (tile) {
                tileElement.style.backgroundColor = COLORS[key];
            } else {
                tileElement.style.visibility = 'hidden';
            }
            rowElement.append(tileElement);
        }
        icon.append(rowElement);
    }
    ICONS[key] = icon;
}

const STANDARD_KICK_TABLE = {
    '01':[[ 0, 0], [-1, 0], [-1,+1], [ 0,-2], [-1,-2]],
    '10':[[ 0, 0], [+1, 0], [+1,-1], [ 0,+2], [+1,+2]],
    '12':[[ 0, 0], [+1, 0], [+1,-1], [ 0,+2], [+1,+2]],
    '21':[[ 0, 0], [-1, 0], [-1,+1], [ 0,-2], [-1,-2]],
    '23':[[ 0, 0], [+1, 0], [+1,+1], [ 0,-2], [+1,-2]],
    '32':[[ 0, 0], [-1, 0], [-1,-1], [ 0,+2], [-1,+2]],
    '30':[[ 0, 0], [-1, 0], [-1,-1], [ 0,+2], [-1,+2]],
    '03':[[ 0, 0], [+1, 0], [+1,+1], [ 0,-2], [+1,-2]],    
}

const I_KICK_TABLE = {
    '01':[[ 0, 0], [-2, 0], [+1, 0], [-2,-1], [+1,+2]],
    '10':[[ 0, 0], [+2, 0], [-1, 0], [+2,+1], [-1,-2]],
    '12':[[ 0, 0], [-1, 0], [+2, 0], [-1,+2], [+2,-1]],
    '21':[[ 0, 0], [+1, 0], [-2, 0], [+1,-2], [-2,+1]],
    '23':[[ 0, 0], [+2, 0], [-1, 0], [+2,+1], [-1,-2]],
    '32':[[ 0, 0], [-2, 0], [+1, 0], [-2,-1], [+1,+2]],
    '30':[[ 0, 0], [+1, 0], [-2, 0], [+1,-2], [-2,+1]],
    '03':[[ 0, 0], [-1, 0], [+2, 0], [-1,+2], [+2,-1]],
}

const ROTATE_180_KICK_TABLE = {
    '02':[[ 0, 0],[ 0, 1]],
    '20':[[ 0, 0],[ 0,-1]],
    '13':[[ 0, 0],[ 1, 0]],
    '31':[[ 0, 0],[-1, 0]],
}
