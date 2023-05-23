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
            debug: true
        }
    },
    zoom: 2,
    scene: [ PlayScene1 ]
};

let game = new Phaser.Game(config);