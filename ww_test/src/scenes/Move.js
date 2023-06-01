class MoveScene extends Phaser.Scene{
    constructor(){
        super({key: 'moveScene'})

        this.VEL = 100;
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.atlas('cheryl', 'cherylsheet.png', 'cheryl.json');
    }

    create(){
        this.cheryl = this.physics.add.sprite(360, 470, 'cheryl', 0);

         //create animation
         this.anims.create({
            key:'runFront',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl',
                start: 1,
                end: 4,
            }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key:'runSide',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl_side',
                start: 1,
                end: 4,
            }),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl',
                start: 1,
                end: 1,
            }),
            frameRate: 5,
            repeat: -1
        });

        this.cheryl.body.setCollideWorldBounds(true);
        /*
         //cameras
         this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
         this.cameras.main.startFollow(this.cheryl, true, 0.25, 0.25);*/

        //input
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        this.direction = new Phaser.Math.Vector2(0);

        this.cheryl.anims.play('stand');
        

        if (this.cursors.left.isDown){
            this.direction.x = -1;
            this.cheryl.setFlipX(false);
            this.cheryl.anims.play('runSide', true);
        } else if (this.cursors.right.isDown){
            this.direction.x = 1;
            this.cheryl.setFlipX(true);
            this.cheryl.anims.play('runSide', true);
        }
        if (this.cursors.up.isDown){
            this.direction.y = -1;
            this.cheryl.anims.play('runFront', true);
        } else if (this.cursors.down.isDown){
            this.direction.y = 1;
            this.cheryl.anims.play('runFront', true);
        }

        
        this.direction.normalize();
        this.cheryl.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

    }
}