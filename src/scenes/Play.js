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
        this.dancer = this.physics.add.sprite(120, game.config.height/2, 'paddle').setScale(SCALE);
        this.dancer.setCollideWorldBounds(true);
        this.dancer.setImmovable();
        this.dancer.setMaxVelocity(0, 600);
        this.dancer.setDragY(200);
        this.dancer.setDepth(1);             // ensures that dancer z-depth remains above dancer paddles
        this.dancer.destroyed = false;       // custom property to track dancer life
        this.dancer.setBlendMode('SCREEN');  // set a WebGL blend mode
        
        // set up the notes
        //this.note = this.physics.add.sprite(220, game.config.height/2, 'cross').setScale(SCALE*5);

        // set up note group
        this.noteGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => { 
            this.addNote(); 
        });

        // set up phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.dancer, this.note);

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
        }
    }
}