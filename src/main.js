/*
Name: Cromwell De Guzman
Title: Endless Dancer
Completed: ~24 hours
Tilt:

*/

// tame the javashrek
'use strict';

// main game object
let config  = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Loading, Menu, Play, Pause, Credits ]
}

let game = new Phaser.Game(config);

// global variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;