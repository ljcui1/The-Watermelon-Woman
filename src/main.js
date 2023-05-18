'use strict';

//global variables
let cursors;

let config = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ PlayScene1 ]
};

let game = new Phaser.Game(config);