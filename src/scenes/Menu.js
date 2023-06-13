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

        this.select = 0;
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.play = this.add.sprite(210, 25, 'play', 0).setOrigin(0.5, 0.5);
        this.credits = this.add.sprite(210, 60, 'credits', 0).setOrigin(0.5, 0.5);
        this.instruct = this.add.text(80, 80, '        Use UP and DOWN arrowkeys\n       to select an option. Press \n     ENTER to proceed.', {
            fontSize: 10,
            color: '#ffffff',

        });
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update(){
        
        if(this.select == 0){
            this.play.setFrame(1);
            this.credits.setFrame(0);
            if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
                this.select = 1;
                this.credits.setFrame(1);
                this.play.setFrame(0);
                console.log(this.select);
            }else if (Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.scene.start('playScene1');
            }
        }else if (this.select == 1){
            this.credits.setFrame(1);
            this.play.setFrame(0);
            if(Phaser.Input.Keyboard.JustDown(keyUP)){
                this.select = 0;
                this.play.setFrame(1);
                this.credits.setFrame(0);
                console.log(this.select);
            }else if (Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.scene.launch('creditScene');
                this.scene.pause();
            }
        }

    }
}