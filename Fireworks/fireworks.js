class Akili extends Phaser.Scene {

    
    create(){
        //create texture manager and particle manager
        const graphic = this.make.graphics({x: 400, y: 300, add:false});
        const sparkList = [];

        //particle variables
        const delayAmount = 4000;
        const particleNumber = 23;


        //create list of colors, can edit later
        const listOfColors = [
            0x00ff00,
            0xff0000,
            0x0000ff,
            0xffff00,
            0x00ffff
        ];
        
        //add textures of colors to texture manager with numbers
        for(const [index,color] of listOfColors.entries()){
            graphic.clear();
            graphic.fillStyle(color, 1);
            graphic.fillCircle(20, 20, 5);
            graphic.generateTexture('spark'+index.toString(), 46, 46);
            console.log('spark'+index.toString());
        }
        
        //particle settings
        const sparkConfig = {
            lifespan: delayAmount,
            speed: {min: 10, max: 100},
            scale: {start: 1, end: 0.5},
            gravityY: 100
        };

        //timeout function that creates new emitter and deletes it later after set time.
        this.input.on('pointerdown', function(pointer) {
            if(sparkList.length == 0){ //if there isn't already an emitter in the manager
                //pick a random number between 0 and length of list
                const chooseColor = Math.floor(Math.random()*listOfColors.length).toString();

                //add emitter to manager
                sparkList.push(this.add.particles(pointer.x, pointer.y, 'spark'+chooseColor, sparkConfig));

                //initiate explotion
                sparkList[0].explode(particleNumber); 

                //start delay to prevent overlap
                const delay = setTimeout(function (){
                    sparkList.length = 0;
                }, delayAmount);
            };

        }, this);
    }


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
2/11/24--
Added different colors, delay, and a system for the explosion to happen one the mouse
*/
