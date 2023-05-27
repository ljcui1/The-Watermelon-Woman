class PlayScene1 extends Phaser.Scene{
    constructor(){
        super({key: 'playScene1'})

        this.VEL = 100;

    }

    preload(){
        this.load.path = './assets/';
        this.load.atlas('cheryl', 'cherylsheet.png', 'cheryl.json');
        this.load.image('tilesetImage', 'tileset1_3.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'tileset1.json');
        this.load.image('artifact1', 'artifact1.png');
        this.load.image('artifact2', 'artifact2.png');
        this.load.image('artifact3', 'artifact3.png');
        this.load.image('photo1', 'photo1.png');

    }

    create(){
        let counter = 0;
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset1_3', 
        'tilesetImage');
        

        //add layer
        const street = map.createLayer('street', tileset, 0, 0);
        const sidewalk = map.createLayer('sidewalk', tileset, 0, 0);
        const buildings = map.createLayer('buildings', tileset, 0, 0).setDepth(40);
        const buildingbase = map.createLayer('buildingbase', tileset, 0, 0).setDepth(1);
        const deco = map.createLayer('deco', tileset, 0, 0).setDepth(50);
        
        
        const trees3 = map.createLayer('trees', tileset, 0, 0).setDepth(50);
        const trees2 = map.createLayer('trees2', tileset, 0, 0).setDepth(50);
        const trees = map.createLayer('trees3', tileset, 0, 0).setDepth(50);

        const spawn = map.findObject('Spawn', obj => obj.name === 'Spawn');

        this.cheryl = this.physics.add.sprite(360, 470, 'cheryl', 0).setDepth(60);
        this.photo1 = this.add.sprite(game.config.width/2, game.config.height/2, 'photo1').setDepth(110);
        this.photo1.alpha = 0;
        this.artifact1 = new Artifacts(this, 144, 304, 'artifact1', this.photo1).setDepth(100);

        let countConfig = {
            fontFamily: 'Courier',
                fontSize: '20px',
                color: '#000000',
                backgroundColor: ' #ffffff',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                }
        }

        this.count = this.add.text(this.cameras.x/2, this.cameras.y/2, counter + "/8", countConfig);
        


        //create animation
        this.anims.create({
            key:'runFront',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl',
                start: 1,
                end: 4,
            }),
            frameRate: 6.5,
            repeat: -1
        });

        this.anims.create({
            key:'runSide',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl_side',
                start: 1,
                end: 4,
            }),
            frameRate: 6.5,
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

        this.cheryl.anims.play('stand', true);



        this.cheryl.body.setCollideWorldBounds(true);

        //enable collision
        buildingbase.setCollisionByProperty({collides: true});
        buildings.setCollisionByProperty({collides: true});
        trees3.setCollisionByProperty({collides: true});
        trees2.setCollisionByProperty({collides: true});
        trees.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.cheryl, buildingbase);
        this.physics.add.collider(this.cheryl, trees);
        this.physics.add.collider(this.cheryl, trees3);
        this.physics.add.collider(this.cheryl, trees2);
        this.physics.add.collider(this.cheryl, buildings);

        

        //cameras
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.cheryl, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        //input
        this.cursors = this.input.keyboard.createCursorKeys();

        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    }

    update(){
        this.direction = new Phaser.Math.Vector2(0);
        

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
/*
        if (this.cursors.left.onUp){
            this.cheryl.anims.play('stand', true);
        } else if (this.cursors.right.onUp){
            this.cheryl.anims.play('stand', true);
        }
        if (this.cursors.up.onUp){
            this.cheryl.anims.play('stand', true);
        } else if (this.cursors.down.onUp){
            this.cheryl.anims.play('stand', true);
        }
*/
        this.direction.normalize()
        this.cheryl.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

        this.artifact1.update(this.cheryl);
        this.countCheck(this.cheryl, this.artifact1);
        

    }

    countCheck(cheryl, artifact){
        if((cheryl.x == artifact.x) && (cheryl.y == (artifact.y + 16))){
            if(keyE.isDown){
                artifact.photo.alpha = 1;
                if(artifact.seen == false){
                    artifact.seen = true;
                    this.counter += 1;
                }
                
            }
        }
    }

    
}