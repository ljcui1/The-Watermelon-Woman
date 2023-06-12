class PlayScene2 extends Phaser.Scene{
    constructor(){
        super({key: 'playScene2'});
        this.photos = 0;
        this.done = false;
        this.counter = 0;
        this.gameover = false;

    }

    preload(){
        this.load.spritesheet('background01', './assets/CLITsheet (1).png', {frameWidth: 320, frameHeight: 240});
        this.load.spritesheet('hold', './assets/holdsheet(1).png', {frameWidth: 320, frameHeight: 240});
        this.load.image('stand', './assets/CLIT_lookaway.png');
        this.load.image('alert', './assets/CLIT_warn.png');
        this.load.image('enemy', './assets/CLIT_enemy.png');
        this.load.image('bar', './assets/progbar_color.png');
        this.load.image('prog', './assets/progbar.png');
        this.load.image('lost', './assets/CLIT_lose.png');
        this.load.image('win', './assets/CLIT_win.png');
    
    }

    create(){
        this.background = this.add.sprite(0, 0, 'background01', 0).setOrigin(0,0);
        this.cherylHold = this.add.sprite(0, 0, 'hold', 0).setOrigin(0,0);
        this.cherylHold.setVisible(false);
        this.cherylStand = this.add.sprite(0, 0, 'stand').setOrigin(0,0);
        this.cherylStand.setVisible(true);
        this.warn = this.add.sprite(0, 0, 'alert').setOrigin(0,0);
        this.warn.setVisible(false);
        this.enemy = this.add.sprite(70, 0, 'enemy').setOrigin(0,0);
        

        this.bar = this.add.sprite(20, 187, 'bar').setOrigin(0,0);
        this.base = this.bar.scaleX;
        this.prog = this.add.sprite(20, 187, 'prog').setOrigin(0,0);
        this.lost = this.add.sprite(0, 0, 'lost').setOrigin(0,0).setDepth(100);
        this.lost.setVisible(false);
        this.win = this.add.sprite(0, 0, 'win').setOrigin(0,0).setDepth(100);
        this.win.setVisible(false);

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
        
        //make enemy movement path
        this.enemyMove = this.add.path(405, 120).lineTo(160, 120);

        //this.attack = this.add.follower(this.enemyMove, 405, 120, 'enemy');

        this.attack = this.add.sprite(405, 120, 'enemy');

        this.info = this.add.text(8, 160, 'Press SPACEBAR to film lost photos of Fae Richards!\nBut don\'t get caught by the archivist!', {
            fontSize: 10,
            color: '#000000',
            backgroundColor: '#ffffff',
            alpha: 0.5,
            align: 'center'

        }).setAlpha(0.75);

        
        
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
/*
        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 8000),
            repeat: -1,
            callback: () => {
                console.log('warning');
                this.warning();
                this.attack.startFollow({
                    x: 405,
                    duration: 3000,
                    yoyo: true,
                    ease: 'Quart.easeInOut'
                });
                
            }
        });


        */

        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 8000),
            repeat: -1,
            callback: () => {
                console.log('warning');
                this.warning();
                
                this.tweens.add({
                    delay: 1000,
                    targets: this.attack,
                    x: 160,
                    duration: 1000,
                    yoyo: true,
                    hold: 1000,
                    ease: 'Quart.easeInOut'
                });
            }
        })


    }

    update(){
        this.background.setFrame(this.photos);

        this.captureImage();
        this.count.setText(this.counter + "/4\nphotos")

        //this.warning(this.warn);
        //checking location and keypress
        this.getCaught();
        
        if(this.gameover == true){
            this.lost.setVisible(true);
            if(keyENTER.isDown){
                this.scene.stop();
                this.scene.start('playScene3');
                
            }
        } else if (this.counter == 4){
            found = true;
            this.win.setVisible(true);
            if(keyENTER.isDown){
                this.scene.stop();
                this.scene.start('playScene4');
                
            }

        }
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

    getCaught(){
        if(this.attack.x < 220){
            if(keySPACE.isDown){
                this.gameover = true;
            }
            
        }
    }

    warning(){
        this.time.addEvent({
            delay: 250,
            repeat: 5,
            callback: () => {
                if (this.warn.visible == false){
                    this.warn.setVisible(true);
                } else if (this.warn.visible = true){
                    this.warn.setVisible(false);
                }
            }
        });
    }

}    