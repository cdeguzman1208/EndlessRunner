/*
Name: Cromwell De Guzman

Title: Endless Dancer

Completed: >30 hours

Structure & Design:
- Use multiple Scene classes (dictated by your game's style) (5)
- Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
- Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
- Have some form of player input/control appropriate to your game design (5)
- Include one or more animated characters that use a texture atlas (5)
- Simulate scrolling with a tileSprite (or equivalent means) (5)
- Implement proper collision detection (via Arcade Physics or a custom routine) (5)
- Have looping background music (5)
- Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
- Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
- Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
- Be theoretically endless (5)
- Be playable for at least 15 seconds for a new player of low to moderate skill (5)
- Run without significant crashes or errors (5)
- Include in-game credits for all roles, assets, music, etc. (5)

Tilt:
- Does your game do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (5)
    Yes, I do think think that my game is technically interesting; as the difficulty/speed increases, the background music also speeds up in parallel.
    I am particularly proud of the particle emmitter that i previously struggled with during the rocket patrol mods assignment.
    I also looked beyond the class examples to learn how to load video assests into Phaser.

- Does your game have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (5)
    Yes, my game does have great visual style; the vibes and colors that my game gives off are stupendously immaculate.
    I am particularly proud of the custom music note and dancing bunny sprites that I made from scratch. I am also proud of the video asset that I put in of me and my friends dancing together.
    Although the scrolling tile sprite still gives off the illusion of forward movement, I guess you could say I am trying something new by changing the verb from 'running' to 'dancing' in the endless runner form.
*/

// tame the javashrek
'use strict';

// main game object
let config  = {
    type: Phaser.WEBGL,
    width: 960,
    height: 640,
    scale: {
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Loading, Menu, Play, Credits ],
    fps: 60
}

let game = new Phaser.Game(config);

// global variables
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let score = 0
let highscore = 0;
let paused = 0;
let gameOver = false;
let keyA, keyS, keyD, keyF;