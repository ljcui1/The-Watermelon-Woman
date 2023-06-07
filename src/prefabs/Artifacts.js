// Artifacts prefab
class Artifacts extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, photo){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.seen = false;
        
        this.photo = photo;
        this.photo.setVisible(false);

        this.info = this.scene.add.text(this.x, this.y - 16, "E to interact", {
            color: "#000000",
            backgroundColor: "#ffffff",
            alpha: 0.5,
            fontSize: 10,
            
        }).setOrigin(0.5, 0);
        this.info.setDepth(100);
        this.info.alpha = 0.5;
        this.info.setVisible(false);
        

        this.body.setSize(32, 40, true);

        this.setOrigin(0.5, 0);
       

    }


    update(sprite){
        /*if (this.scene.physics.overlap(this, sprite)){
            this.info.setVisible(true);
        } else {
            this.info.setVisible(false);
        }*/

        
        



    }
}