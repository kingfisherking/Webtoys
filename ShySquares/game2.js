class A extends Phaser.Scene {

    //acceleration controls the resistance of the squares
    acceleration = 25;

    create(){
        //creating texture for squares
        const graphic = this.make.graphics({x: 0, y: 0, add: false});
        graphic.fillStyle(0xaaaaaa,1);
        graphic.fillRoundedRect(0, 0, 50, 50, 5);
        graphic.fillStyle(0xffffff,1);
        graphic.fillRoundedRect(5, 5, 40, 40, 5);
        graphic.generateTexture('icon', 50, 50);

        //adding new physics bodies with square texture
        this.squares = this.physics.add.group({
            key: 'icon',
            repeat: 35
        });

        //aligning squares to grid
        Phaser.Actions.GridAlign(this.squares.getChildren(), {
            width: 6,
            height: 6,
            cellWidth: 75,
            cellHeight: 75,
            x: 100,
            y: 100
        })

        //making squares interactive
        this.squares.children.iterate( child => {
            child.setPushable(true);
            child.baseXY = [child.x, child.y];
            //child.x = 100;
            //child.y = 100;
        });
        
        //couldn't figure out how to give pointer physics, so I made a sprite/body to follow mouse
        this.testFollow = this.add.ellipse(600, 600, 50, 50, 0xffffff, 0.23);
        this.physics.add.existing(this.testFollow, false);
        
        //physics manager for sprite/square interaction
        this.physics.add.collider(this.testFollow, this.squares);
        

    }
    
    update(){
        // this.squares.children.iterate(child => {
        //     child.x += (child.baseXY[0] - child.x)/child.x*this.acceleration;
        //     child.y += (child.baseXY[1] - child.y)/child.y*this.acceleration;
        // })

        //thanks samme, still trying to figure out the physics destructing
        const { fps } = this.physics.world;
        this.squares.children.iterate( child => {
            const dx = (child.baseXY[0] - child.x) / child.x * this.acceleration;
            const dy = (child.baseXY[1] - child.y) / child.y * this.acceleration;
        
            child.body.velocity.set(fps * dx, fps * dy);
        })
        
        //this.physics.arcade.moveToPointer(this.testFollow, 100);
        // this.testFollow.x += (this.input.activePointer.x-this.testFollow.x);
        // this.testFollow.y += (this.input.activePointer.y-this.testFollow.y);

        //physics manager making the following more seemless
        this.physics.moveToObject(this.testFollow, this.input.activePointer, 100, 100);
        
    }
    
}

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    scene: A,
    physics: {
        default: 'arcade'
    }
};

const game = new Phaser.Game(config);
