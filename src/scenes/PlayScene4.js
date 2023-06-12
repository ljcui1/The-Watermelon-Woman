class PlayScene4 extends Phaser.Scene{
    constructor(){
        super({key: 'playScene4'})

        this.VEL = 100;
        this.photo1Seen = false;
        this.photo2Seen = false;
        this.photo3Seen = false;
        this.photo4Seen = false;
        this.npc1Seen = false;
        this.npc2Seen = false;
        this.npc3Seen = false;
        this.npc4Seen = false;


    }

    preload(){
        this.load.path = './assets/';
        this.load.atlas('cheryl', 'cherylsheet.png', 'cheryl.json');
        this.load.image('tilesetImage', 'tileset1_3.png');
        this.load.tilemapTiledJSON('tilemapJSON', 'tileset1.json');
        this.load.image('artifact1', 'artifact1.png');
        this.load.image('artifact2', 'artifact2.png');
        this.load.image('artifact3', 'artifact3.png');
        this.load.image('artifact4', 'artifact4.png');
        this.load.image('npc1', 'npc1.png');
        this.load.image('npc2', 'npc2.png');
        this.load.image('npc3', 'npc3.png');
        this.load.image('npc4', 'npc4.png');
        this.load.image('photo1', 'photo_win1.png');
        this.load.image('photo2', 'photo_win2.png');
        this.load.image('photo3', 'photo_win3.png');
        this.load.image('photo4', 'photo_win4.png');

    }

    create(){

        //this.scene.start('playScene2');

        this.counter = 0;
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset1_3', 
        'tilesetImage');
        

        //add layer
        const street = map.createLayer('street', tileset, 0, 0);

        const sidewalk = map.createLayer('sidewalk', tileset, 0, 0);

        this.instruct = this.add.text(360, 432, 'Find information\nabout the\nWatermelon Woman', {
            fontSize: 15,
            color: '#ffffff',
            align: 'center',


        }).setOrigin(0.5, 0.5);

        const buildings = map.createLayer('buildings', tileset, 0, 0).setDepth(50);
        const buildingbase = map.createLayer('buildingbase', tileset, 0, 0).setDepth(1);
        const deco = map.createLayer('deco', tileset, 0, 0).setDepth(50);
        
        
        const trees3 = map.createLayer('trees', tileset, 0, 0).setDepth(50);
        const trees2 = map.createLayer('trees2', tileset, 0, 0).setDepth(50);
        const trees = map.createLayer('trees3', tileset, 0, 0).setDepth(50);

        const spawn = map.findObject('Spawn', obj => obj.name === 'Spawn');

        this.cheryl = this.physics.add.sprite(360, 470, 'cheryl', 0).setDepth(40);
        this.photo1 = this.add.sprite(game.config.width/2, game.config.height/2, 'photo1').setScrollFactor(0).setDepth(110);
        
        this.photo2 = this.add.sprite(game.config.width/2, game.config.height/2, 'photo2').setScrollFactor(0).setDepth(110);
        
        this.photo3 = this.add.sprite(game.config.width/2, game.config.height/2, 'photo3').setScrollFactor(0).setDepth(110);
        
        this.photo4 = this.add.sprite(game.config.width/2, game.config.height/2, 'photo4').setScrollFactor(0).setDepth(110);
        
        /*this.artifact1 = this.physics.add.sprite(144, 300, 'artifact1').setDepth(100);
        this.artifact2 = this.physics.add.sprite(112, 16, 'artifact2').setDepth(100);
        this.artifact3 = this.physics.add.sprite(592, 304, 'artifact3').setDepth(100);
        this.artifact4 = this.physics.add.sprite(352, 16, 'artifact4').setDepth(100);
        this.npc1 = this.physics.add.sprite(432, 80, 'npc1').setDepth(100);
        this.npc2 = this.physics.add.sprite(112, 208, 'npc2').setDepth(100);
        this.npc3 = this.physics.add.sprite(112, 176, 'npc3').setDepth(100);
        this.npc4 = this.physics.add.sprite(432, 320, 'npc4').setDepth(100);*/

        this.peopleGroup = this.add.group({runChildUpdate: true});
        this.npc1 = new People(this, 432, 80, 'npc1', "Oh yeah! \nFae Richards?").setDepth(100);
        this.npc2 = new People(this, 112, 208, 'npc2', "That mammy actress?\nI love her!").setDepth(100);
        this.npc3 = new People(this, 112, 176, 'npc3', "She was an \namazing singer!").setDepth(100);
        this.npc4 = new People(this, 432, 320, 'npc4', "Did you know \nthat she was a \nsapphic sister?").setDepth(100);
        this.peopleGroup.addMultiple([this.npc1, this.npc2, this.npc3, this.npc4]);

        this.artifactGroup = this.add.group({runChildUpdate: true});
        this.artifact1 = new Artifacts(this, 144, 305, 'artifact1', this.photo1).setDepth(100);
        this.artifact2 = new Artifacts(this, 112, 16, 'artifact2', this.photo2).setDepth(100);
        this.artifact3 = new Artifacts(this, 600, 304, 'artifact3', this.photo3).setDepth(100);
        this.artifact4 = new Artifacts(this, 352, 16, 'artifact4', this.photo4).setDepth(100);
       
        this.artifactGroup.addMultiple([this.artifact1, this.artifact2, this.artifact3, this.artifact4]);
        console.log(this.artifactGroup);

        this.artifact4.setVisible(false);
        this.artifact4.disableBody(true);

        this.npc1.setBodySize(32, 32, true).setOrigin(0, 0);
        this.npc2.setBodySize(32, 32, true).setOrigin(0, 0);
        this.npc3.setBodySize(32, 32, true).setOrigin(0, 0);
        this.npc4.setBodySize(32, 32, true).setOrigin(0, 0);

        this.information = this.add.text(20, 20, 'Use ARROWKEYS \nto move', {
            fontSize: 10,
            color: '#ffffff',
            align: 'center'

        }).setScrollFactor(0).setDepth(500);

        
        

        let countConfig = {
            fontFamily: 'Courier',
                fontSize: '20px',
                color: '#000000',
                backgroundColor: ' #ffffff',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                alpha: 0.75
        }

        this.count = this.add.text(270, 10, this.counter + "/8", countConfig).setScrollFactor(0).setDepth(200);
        


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

        //this.cheryl.anims.play('stand', true);



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
        this.cameras.main.startFollow(this.cheryl, false, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true, true, true, true);

        //input
        this.cursors = this.input.keyboard.createCursorKeys();

        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //this.physics.add.overlap(this.cheryl, this.artifact1.body, this.countCheck(this.artifact1));

        //this.artifact1.info.setVisible(false);
        this.physics.add.overlap(this.cheryl, this.artifactGroup, (cheryl, artifact) => {
            artifact.popUp(this);
            console.log(artifact.seen);
            if (artifact.seen == false){
                artifact.seen = true;
                console.log(artifact.seen);
                this.counter += 1;
                console.log(this.counter)
            }
            //artifact.info.setVisible(true);
        }, null, this);

        this.physics.add.overlap(this.cheryl, this.peopleGroup, (cheryl, person) => {
            person.popUp(this);
            console.log(person.seen);
            if (person.seen == false){
                person.seen = true;
                console.log(person.seen);
                this.counter += 1;
                console.log(this.counter)
            }
            //artifact.info.setVisible(true);
        }, null, this);
        

    }

    update(){
        this.direction = new Phaser.Math.Vector2(0);

        //this.artifact1.info.setVisible(false);
        

        if (this.cursors.left.isDown){
            this.direction.x = -1;
            this.cheryl.setFlipX(false);
            this.cheryl.anims.play('runSide', true);
        } else if (this.cursors.right.isDown){
            this.direction.x = 1;
            this.cheryl.setFlipX(true);
            this.cheryl.anims.play('runSide', true);
        } else if (this.cursors.up.isDown){
            this.direction.y = -1;
            this.cheryl.anims.play('runFront', true);
        } else if (this.cursors.down.isDown){
            this.direction.y = 1;
            this.cheryl.anims.play('runFront', true);
        } else {
            this.cheryl.anims.play('stand');
        }

        this.direction.normalize()
        this.cheryl.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);

        //this.artifactPopUp(this.artifact1);      

        //.artifact1.update(this.cheryl);
        //this.countCheck(this.cheryl, this.artifact1);

        this.count.setText(this.counter + "/8");

        if(this.counter == 7){
            this.artifact4.setVisible(true);
            this.artifact4.enableBody(true);
            this.artifact4.setPosition(352, 16);
        }

        if(this.counter == 8){
            this.physics.world.setBounds(0, 0, 624, 464, true, true, false, true);
            if (this.cheryl.y < 0){
                this.scene.start('playScene2');
            }
            this.proceed = this.add.text(game.config.width/2, 15, '↑\nproceed', {
                fontSize: 15,
                color: '#ffffff',
                align: 'center',


            }).setOrigin(0.5, 0.5).setDepth(500);
        }
        

    }

    

 
/*
    countCheck(thing){
        if (this.thing.seen == false){
            this.thing.seen = true;
            this.counter += 1;
        }
        
    }*/

    
}