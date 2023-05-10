class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        this.playConfig = {
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
        this.playText = this.add.text(game.config.width/2, game.config.height/2, ' ', this.playConfig).setOrigin(0.5);

        // reset parameters
        this.noteSpeed = 300;

        // set up the dancer
        this.dancer = this.physics.add.sprite(480, 500, 'paddle').setScale(SCALE);
        
        // set up the music notes
        this.noteGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning notes
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
                    gameOver = false;
                    this.scene.restart();
                    break;
                case 'Backspace':
                    this.scene.start('creditsScene');
                    break;
                default:
                    break;
            }
        });
    }

    // create new music note and add them to existing note group
    addNote() {
        this.note = new Note(this, this.noteSpeed);
        this.noteGroup.add(this.note);
    }

    update() {        
        // while not game over, continue playing
        if(gameOver == false) {
            // check for player input
            if(cursors.left.isDown) {
                this.dancer.body.x = 320;
                this.dancer.body.y = 500;
            } else if(cursors.up.isDown) {
                this.dancer.body.x = 420;
                this.dancer.body.y = 500;
            } else if(cursors.down.isDown) {
                this.dancer.body.x = 520;
                this.dancer.body.y = 500;
            } else if(cursors.right.isDown) {
                this.dancer.body.x = 620;
                this.dancer.body.y = 500;
            }

            // check for collisions
            this.physics.world.collide(this.dancer, this.noteGroup, this.dancerCollision, null, this);
        }
        else if (gameOver == true) {
            this.noteGroup.clear(true, true);
            this.playText.setText('GAMEOVER');
        }
    }

    dancerCollision() {
        this.noteGroup.remove(this.noteGroup.getFirstAlive(true), true, true);
        this.dancer.setVelocity(0);
        this.dancer.body.y = 500;
        highscore++;
        console.log(highscore)
    }
}