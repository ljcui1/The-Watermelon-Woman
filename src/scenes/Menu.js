class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        //load images
        this.load.image('background', './assets/menu.png');
        this.load.spritesheet('play', './assets/playsheet.png', {frameWidth: 65, frameHeight: 26});
        this.load.spritesheet('credits', './assets/creditssheet.png', {frameWidth: 121, frameHeight: 30});
    }

    create(){
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.play = this.add.sprite(210, 35, 'play', 0).setOrigin(0.5, 0.5);
        this.credits = this.add.sprite(210, 80, 'credits', 0).setOrigin(0.5, 0.5);

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update(){
        let select = 0;
        if(select == 0){
            this.play.setFrame(1);
            this.credits.setFrame(0);
            if(keyDOWN.isDown){
                select = 1;
                this.credits.setFrame(1);
                this.play.setFrame(0);
                console.log(select);
            }else if (keyENTER.isDown){
                this.scene.start('playScene1');
            }
        }else if (select == 1){
            this.credits.setFrame(1);
            this.play.setFrame(0);
            if(keyUP.isDown){
                select = 0;
                this.play.setFrame(1);
                this.credits.setFrame(0);
                console.log(select);
            }
        }

    }
}