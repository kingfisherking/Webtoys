class Node extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);
        this.x = x;
        this.y = y;

        const graphic = scene.make.graphics({x: 0, y: 0, add: false});
        graphic.fillStyle(0xaaaaaa,1);
        graphic.fillRoundedRect(0, 0, 50, 50, 5);
        graphic.fillStyle(0xffffff,1);
        graphic.fillRoundedRect(5, 5, 40, 40, 5);
        graphic.generateTexture('icon', 50, 50);
        
        const radius = 100;
        this.field = new Phaser.Geom.Circle(0, 0, 100)
        this.sprite = scene.add.image(this.x, this.y, 'icon');

        this.setInteractive(
            this.field,
            Phaser.Geom.Circle.Contains
        );
        this.on('pointermove', (pointer) => {
            this.sprite.setTint(0xffff00);
            this.sprite.x += 10;
        });
        this.on('pointerout', () => {
            this.sprite.clearTint();
        })

        
    }
}

class John extends Phaser.Scene{
    
    squareGraphic;
    image;
    
    //circleGraphic;

    
    create(){
        this.newTest = new Node(this, 200, 200);
        this.new1 = new Node(this, 200, 300);
        this.new2 = new Node(this, 200, 400);

        

    }
    update(){
        //this.newTest.sprite.x <= this.newTest.x ? this.newTest.sprite.x++ : this.newTest.sprite.x--; 
        this.newTest.sprite.x += (this.newTest.x - this.newTest.sprite.x)/(this.newTest.x*0.05);
        this.newTest.sprite.y += (this.newTest.y - this.newTest.sprite.y)/(this.newTest.y*0.3);
    }

}


const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    scene: John,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);
