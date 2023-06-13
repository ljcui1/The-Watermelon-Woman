class Credits extends Phaser.Scene{
    constructor(){
        super('creditScene');
    }

    preload(){
        this.load.image('page', './assets/credits2.png');
    }

    create(){
        this.page = this.add.tileSprite(0, 0, 320, 240, 'page').setOrigin(0, 0);

        this.leave = this.add.text(20, 10, 'ESC to leave', {
            fontSize: 15,
            color: '#ffffff',
            align: 'center',
        })
    
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            
            
            
    }

    update(){
        if(keyESC.isDown){
            console.log("back");
            this.scene.resume('menuScene');
            this.scene.stop();
        }
    }

}    