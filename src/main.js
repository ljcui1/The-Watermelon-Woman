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
    scene: [ Menu, PlayScene1, PlayScene2 ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);

let keyE, keyUP, keyDOWN, keyENTER, keySPACE, keyESC;