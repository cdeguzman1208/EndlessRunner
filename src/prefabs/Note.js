// Note prefab
class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call phaser physics sprite constructor
        super(scene, game.config.width + dancerWidth, Phaser.Math.Between(1, 4) * 100 + 30, 'cross');
        
        this.parentScene = scene;               // maintain scene context
        
        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();                    
        this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newNote = true;                 // custom property to control barrier spawning
     }

    update() {
        // add new note when existing note hits center X
        if(this.newNote && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addNote(this.parent, this.velocity);
            this.newNote = false;
        }

        // destroy note if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}