// Artifacts prefab
class Artifacts extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, photo){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.looked = false;
    }


    update(sprite){

        if ((sprite.x == this.x) && (sprite.y == (this.y + 16))){
            let info = this.scene.add.text(this.x, this.y - 16, "E to interact", {
                color: "#000000",
                backgroundColor: "#ffffff",
                
            });
            info.alpha = 0.5;
        }else{
            info.alpha = 0;
        }

    }
}