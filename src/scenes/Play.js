class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        let playConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '40px',
            color: 'cyan',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2, 'PLAY', playConfig).setOrigin(0.5);

        // reset parameters
        this.noteSpeed = -450;
        this.noteSpeedMax = -1000;

        // set up the dancer
        this.dancer = this.physics.add.sprite(120, 132, 'paddle').setScale(SCALE);
        
        // set up the notes
        this.noteGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addNote(); 
        });

        // set up phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.scene.start('playScene');
                    break;
                case 'Backspace':
                    this.scene.start('creditsScene');
                    break;
                default:
                    break;
            }
        });
    }

    // create new note and add them to existing note group
    addNote() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let note = new Note(this, this.noteSpeed - speedVariance);
        this.noteGroup.add(note);
    }

    update() {        
        // make sure dancer is still alive
        if(!this.dancer.destroyed) {
            // check for player input
            if(cursors.up.isDown) {
                this.dancer.body.y = 100;
            } else if(cursors.left.isDown) {
                this.dancer.body.y = 200;
            } else if(cursors.right.isDown) {
                this.dancer.body.y = 300;
            } else if(cursors.down.isDown) {
                this.dancer.body.y = 400;
            }
            // check for collisions
            this.physics.world.collide(this.dancer, this.noteGroup, this.dancerCollision, null, this);
        }
    }

    dancerCollision() {

    }
}