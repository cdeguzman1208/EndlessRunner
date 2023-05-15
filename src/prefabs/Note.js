// Note prefab
class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call phaser physics sprite constructor
        let randomPosition = Math.floor(Phaser.Math.Between(1, 4));
        let musicNoteX;
        switch (randomPosition) {
            case 1:
                musicNoteX = w/2 - 170;
                break;
            case 2:
                musicNoteX = w/2 - 60;
                break;
            case 3:
                musicNoteX = w/2 + 60;
                break;
            case 4:
                musicNoteX = w/2 + 170;
                break;
            default:
                break;
        }
        super(scene, musicNoteX, 0, 'note');
        
        this.parentScene = scene;                       // maintain scene context
        
        // set up physics sprite
        this.parentScene.add.existing(this);            // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityY(velocity);                    // make it go!
        this.setImmovable();
        this.newNote = true;                            // custom property to control barrier spawning
        this.setScale(1);
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