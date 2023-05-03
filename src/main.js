/*
Name: Cromwell De Guzman
Title: Endless Dancer
Completed: ~24 hours
Tilt:

*/

// tame the javashrek
'use strict';

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config  = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
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
    scene: [ Loading, Menu, Levels, Play, Pause, Credits ]
}

let game = new Phaser.Game(config);