class PlayScene2 extends Phaser.Scene{
    constructor(){
        super({key: 'playScene2'});
        this.photos = 4;

    }

    preload(){
        this.load.spritesheet('background', './assets/CLITsheet.png', {frameWidth: 320, frameHeight: 240});
        this.load.spritesheet('cheryl', './assets/holdsheet.png', {frameWidth: 320, frameHeight: 240});
        this.load.image('stand', './assets/CLIT_lookaway.png');
    
    }

    create(){
        this.background = this.add.sprite(0, 0, 'background', 0).setOrigin(0,0);
        this.cherylHold = this.add.sprite(0, 0, 'cheryl', 0).setOrigin(0,0);
        this.cherylHold.setVisible(false);
        this.cherylStand = this.add.sprite(0, 0, 'stand').setOrigin(0,0);
        this.cherylStand.setVisible(true);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update(){

    }

}    