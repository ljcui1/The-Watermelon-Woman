// Artifacts prefab
class Artifacts extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, photo){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.seen = false;
        this.setPipeline('TextureTintPipeline');
        

       

    }


    update(){
        



    }
}