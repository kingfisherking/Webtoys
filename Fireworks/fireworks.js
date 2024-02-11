class Akili extends Phaser.Scene {
    preload(){}

    shoot(pointer){
        console.log(pointer.x, pointer.y);
    }
    
    create(){
        const graphic = this.make.graphics({x: 400, y: 300, add:false});
        graphic.fillStyle(0xffffff, 1);
        graphic.fillCircle(20, 20, 5);
        graphic.generateTexture('spark', 46, 46);

        this.emitter = this.add.particles(400, 400, 'spark', {
            lifespan: 4000,
            speed: {min: 150, max: 250},
            scale: {start: 1, end: 0.5},
            gravityY: 100
        })

        this.input.on('pointerdown', function(pointer) {
            this.emitter.explode(16);
            this.shoot(pointer);
        }, this);
    }

    update(){}

}



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Akili,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);

/*
okay, so what I want to d o right now is to create something that allows me to drop a sprite or game object or graphic whereever I click
2/9/24--
Okay, finally got around to doing something about this. creating a function that I can change may help me implement later designs
Also note to self, the game crashes if I define a class without putting anything into it (spent like an hour on this)
*/