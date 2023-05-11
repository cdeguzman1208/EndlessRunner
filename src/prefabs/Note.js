// Note prefab
class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call phaser physics sprite constructor
        super(scene, Phaser.Math.Between(3, 6) * 100 + 20, 0, 'fragment');
        
        this.parentScene = scene;               // maintain scene context
        
        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityY(velocity);            // make it go!
        this.setImmovable();                    
        this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newNote = true;                 // custom property to control barrier spawning
        this.destroyed = false;
     }

    update() {
        // add new note when existing note hits center Y
        if(gameOver == false && this.newNote && this.y > centerY) {
            // (recursively) call parent scene method from this context
            this.parentScene.addNote(this.parent, this.velocity);
            this.newNote = false;
        }

        // trigger game over if it reaches the bottom edge of the screen
        if(this.y > h) {
            gameOver = true;
        }
    }
}