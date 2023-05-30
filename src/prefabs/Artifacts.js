// Artifacts prefab
class Artifacts extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, photo,){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.seen = false;
        

       

    }


    update(sprite){
        



    }
}