/*
Name: Cromwell De Guzman
Title: Endless Dancer
Completed: ~24 hours
Tilt:

*/

let config  = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyW, keyA, keyS, keyD, keyUP, keyLEFT, keyDOWN, keyRIGHT, keySPACE;

// set UI
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let highscore = 0;