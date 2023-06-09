class PlayScene2 extends Phaser.Scene{
    constructor(){
        super({key: 'playScene2'});
        this.photos = 0;
        this.done = false;
        this.counter = 0;

    }

    preload(){
        this.load.spritesheet('background01', './assets/CLITsheet (1).png', {frameWidth: 320, frameHeight: 240});
        this.load.spritesheet('hold', './assets/holdsheet.png', {frameWidth: 320, frameHeight: 240});
        this.load.image('stand', './assets/CLIT_lookaway.png');
        this.load.image('bar', './assets/progbar_color.png');
        this.load.image('prog', './assets/progbar.png');
    
    }

    create(){
        this.background = this.add.sprite(0, 0, 'background01', 0).setOrigin(0,0);
        this.cherylHold = this.add.sprite(0, 0, 'hold', 0).setOrigin(0,0);
        this.cherylHold.setVisible(false);
        this.cherylStand = this.add.sprite(0, 0, 'stand').setOrigin(0,0);
        this.cherylStand.setVisible(true);

        this.bar = this.add.sprite(20, 187, 'bar').setOrigin(0,0);
        this.base = this.bar.scaleX;
        this.prog = this.add.sprite(20, 187, 'prog').setOrigin(0,0);

        //make counter
        let countConfig = {
            fontFamily: 'Courier',
                fontSize: '20px',
                color: '#000000',
                backgroundColor: ' #ffffff',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                alpha: 0.5
                
        }
        

        this.count = this.add.text(20, 10, this.counter + "/4\nphotos", countConfig);
        this.count.alpha = 0.75;

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update(){
        this.background.setFrame(this.photos);

        this.captureImage();
        this.count.setText(this.counter + "/4\nphotos")
    }

    //filming each picture action
    captureImage(){
        if(this.photos < 4){
            if(keySPACE.isDown){
                this.cherylStand.setVisible(false);
                this.cherylHold.setVisible(true);
                this.cherylHold.setFrame(this.photos);
                if(this.photos < 4){
                    this.background.setFrame(this.photos + 1);
                } else {
                    this.background.setFrame(this.photos);
                }
                
                if(this.done == false){
                    
                    this.bar.scaleX += 0.25;
                    this.bar.x -= 0.75;
                    if(this.bar.scaleX == 91){
                        this.done = true;
                    }
                } else if (this.done == true){
                    this.bar.scaleX = this.base;
                    this.bar.setPosition(20, 187);
                    this.photos += 1;
                    this.done = false;
                    this.counter += 1;

                    let celebrateConfig = {
                        fontFamily: 'Courier',
                        fontSize: '40px',
                        color: '#ffffff',
                        align: 'right',
                        padding: {
                            top: 5,
                            bottom: 5,
                        },
                        fixedWidth: 100,
                        font: 'bold'
                    }
                    
                    const yay = this.add.text(game.config.width/2 - 30, 30, "Photo \nFilmed!", celebrateConfig);
                    yay.setVisible(true);
                    this.time.delayedCall(1250, () => {
                        yay.setVisible(false);
                    });
                }
            } else {
                this.cherylHold.setVisible(false);
                this.cherylStand.setVisible(true);
            }
        }
        
    }

}    