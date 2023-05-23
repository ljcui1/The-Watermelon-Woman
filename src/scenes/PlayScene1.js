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

    }

    create(){
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
        const artifact = map.createLayer('artifact', tileset, 0, 0).setDepth(60);

        const spawn = map.findObject('Spawn', obj => obj.name === 'Spawn');

        this.cheryl = this.physics.add.sprite(360, 470, 'cheryl', 0).setDepth(60);


        //create animation
        this.anims.create({
            key:'runFront',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl',
                start: 1,
                end: 4,
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key:'runFront',
            frames: this.anims.generateFrameNames('cheryl', {
                prefix: 'cheryl_side',
                start: 1,
                end: 4,
            }),
            frameRate: 5,
            repeat: -1
        });



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

    }

    update(){
        this.direction = new Phaser.Math.Vector2(0);

        if (this.cursors.left.isDown){
            this.direction.x = -1;
        } else if (this.cursors.right.isDown){
            this.direction.x = 1;
        }
        if (this.cursors.up.isDown){
            this.direction.y = -1;
        } else if (this.cursors.down.isDown){
            this.direction.y = 1;
        }

        this.direction.normalize()
        this.cheryl.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

    }

    
}