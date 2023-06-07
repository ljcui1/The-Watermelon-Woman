// People prefab
class People extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, convo){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.seen = false;
        
        this.convo = convo;

        this.info = scene.add.text(this.x, this.y - 16, this.convo, {
            color: "#000000",
            backgroundColor: "#ffffff",
            //alpha: 0.5,
            fontSize: 12,
            
        }).setOrigin(0.5, 0);
        this.info.setDepth(100);
        this.info.alpha = 0.5;
        this.info.setVisible(false);
        

        this.body.setSize(32, 32, true);

        this.setOrigin(0, 0);

       

    }



    popUp(scene){
        this.info.setVisible(true);
        //this.seen = true;
   
    }



    update(sprite){
        /*if (this.scene.physics.overlap(this, sprite)){
            this.info.setVisible(true);
        } else {
            this.info.setVisible(false);
        }*/

        this.info.setVisible(false);
        

        
        



    }
}