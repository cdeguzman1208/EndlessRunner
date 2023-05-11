class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // reset variables
        this.noteSpeed = 300;
        score = 0;
        gameOver = false;

        // add bgm
        this.trackNumber = Math.floor(Math.random() * 5);
        this.track;
        switch (this.trackNumber) {
            case 0:
                this.track = 'techno'
                break;
            case 1:
                this.track = 'blast'
                break;
            case 2:
                this.track = 'disco'
                break;
            case 3:
                this.track = 'pop'
                break;
            case 4:
                this.track = 'summer'
                break;
            default:
                break;
        }
        this.music = this.sound.add(this.track, { loop: true, volume: 0.25 });
        this.musicSpeed = 1;
        this.music.play();

        // set up config for game over text
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
        this.playText = this.add.text(w/2, h/2, ' ', this.playConfig).setOrigin(0.5);

        // set up config for score & highscore text
        this.scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '20px',
            color: 'white',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
            },
            fixedWidth: 0
        }
        this.scoreText = this.add.text(75, 200, score, this.scoreConfig).setOrigin(0.5);
        this.highScoreText = this.add.text(75, 300, highscore, this.scoreConfig).setOrigin(0.5);

        // set up keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

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

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.music.stop();
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.music.stop();
                    this.scene.restart();
                    break;
                case 'Backspace':
                    this.music.stop();
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
            if(Phaser.Input.Keyboard.JustDown(keyA)) {
                this.dancer.body.x = 320;
                this.dancer.body.y = 500;
            } else if(Phaser.Input.Keyboard.JustDown(keyS)) {
                this.dancer.body.x = 420;
                this.dancer.body.y = 500;
            } else if(Phaser.Input.Keyboard.JustDown(keyD)) {
                this.dancer.body.x = 520;
                this.dancer.body.y = 500;
            } else if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.dancer.body.x = 620;
                this.dancer.body.y = 500;
            }

            // check for collisions
            this.physics.world.collide(this.dancer, this.noteGroup, this.dancerCollision, null, this);

            // increase speed/difficulty as score increases
            if(score > 0 && score % 10 == 0) {
                this.noteSpeed++;
                this.musicSpeed += 0.0005;
                this.music.setRate(this.musicSpeed);
                console.log(this.musicSpeed);
            }
        }
        // display game over text
        else if (gameOver == true) {
            this.music.stop();
            this.noteGroup.clear(true, true);
            this.playText.setText('GAMEOVER');
        }
    }

    dancerCollision() {
        // on collision, destroy note
        this.noteGroup.remove(this.noteGroup.getFirstAlive(true), true, true);
        this.dancer.setVelocity(0);
        this.dancer.body.y = 500;

        // add to score / update highscore
        score++;
        if (score > highscore) {
            highscore = score;
        }
        this.scoreText.setText(score);
        this.highScoreText.setText(highscore);
    }
}