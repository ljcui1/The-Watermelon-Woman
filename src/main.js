/*
Name: Lia Cui
Game Title/Movie Selection: The Watermelon Woman
Approximate Hours: ~50 hours

Grading Criteria Notes:
- The game does not include the ability to restart from within
as there is no scoring system or functional purpose of a restart
option because the game is dependent on the player being given one
chance only to change the publics' knowledge of The Watermelon Woman.

- Phaser's major components used:
    ` Physics system
    ` Cameras
    ` Text objects
    ` Animation manager
    ` Tween manager
    ` Timers
    ` Tilemaps

- While my game did not include any extra or considerably outstanding
polish, creativity, technicaly prowess, and/or originality, I feel that
it should be considered an achievement for me to have managed to draw 
all of the assets in the game. While some may be subpar, it is still 
impressive to at least myself that I was able to produce all assets
(including animations) as well as working on the programming of the game.

*/


'use strict';

//global variables
let cursors;

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    zoom: 2,
    scene: [ Menu, PlayScene1, PlayScene2, PlayScene3, PlayScene4, Credits ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);

let keyE, keyUP, keyDOWN, keyENTER, keySPACE, keyESC;

let found = false;