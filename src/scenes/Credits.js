class Credits extends Phaser.Scene{
    constructor(){
        super('creditScene');
    }

    preload(){
        this.load.image('page', './assets/credits1.png');
    }

    create(){
        this.page = this.add.tileSprite(0, 0, 320, 240, 'page').setOrigin(0, 0);

        this.leave = this.add.text(5, 5, 'ESC \nto \nleave', {
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