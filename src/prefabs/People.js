// People prefab
class People extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture,){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.seen = false;
        

       

    }


    update(){
        



    }
}