class PlayScene1 extends Phaser.Scene{
    constructor(){
        super({key: 'playScene1'})

        this.VEL = 100;

    }

    preload(){
        this.load.path = './assets/';
        this.load.image('tilesetImage', 'tileset1.png');
        this.load.image('tilesetImage2', 'tileset1.2.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'tileset1.json');

    }

    create(){

    }

    update(){

    }

    
}