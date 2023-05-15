class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // reset variables
        this.noteSpeed = 300;
        score = 0;
        paused = 0;
        gameOver = false;
        this.bgSpeed = 5;

        // add scrolling tile sprite
        this.background = this.add.tileSprite(0, 0, 960, 640, 'background').setOrigin(0, 0);

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
            fontFamily: 'Verdana',
            fontSize: '40px',
            color: 'white',
            backgroundColor: 'black',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8
            },
            fixedWidth: 0
        }
        this.playText = this.add.text(w/2, h/2, '', this.playConfig).setOrigin(0.5);
        this.playText.alpha = 0;

        // set up config for score & highscore text
        this.scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '20px',
            color: 'white',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
            },
            fixedWidth: 0
        }
        this.scoreText = this.add.text(w/2 - 360, 60, 'SCORE:\n' + score, this.scoreConfig).setOrigin(0.5);
        this.highScoreText = this.add.text(w/2 + 360, 60, 'HIGHSCORE:\n' + highscore, this.scoreConfig).setOrigin(0.5);

        // set up config for asdf text
        this.asdfConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            color: 'white',
            backgroundColor: 'black',
            align: 'center',
            padding: {
                top: 16,
                bottom: 16,
                left: 32,
                right: 32
            },
            fixedWidth: 0
        }
        this.asdfText = this.add.text(w/2 - 170, h - 32, 'A', this.asdfConfig).setOrigin(0.5);
        this.asdfText = this.add.text(w/2 - 60, h - 32, 'S', this.asdfConfig).setOrigin(0.5);
        this.asdfText = this.add.text(w/2 + 60, h - 32, 'D', this.asdfConfig).setOrigin(0.5);
        this.asdfText = this.add.text(w/2 + 170, h - 32, 'F', this.asdfConfig).setOrigin(0.5);
        
        // set up keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // set up the dancer
        this.anims.create({
            key: 'dance',
            frameRate: 7,
            frames: this.anims.generateFrameNames('bunny', {
                prefix: 'sprite_',
                start: 0,
                end: 3,
                zeroPad: 1
            }),
            repeat: -1
        });
        this.dancer = this.physics.add.sprite(w/2, 500, 'bunny').setScale(2.5);
        this.dancer.play('dance');
        
        // set up the music notes
        this.noteGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning notes
        this.time.delayedCall(2500, () => { 
            this.addNote(); 
        });

        // set up particle emitter
        let line = new Phaser.Geom.Line(0, 0, w, 0);
        this.lineEmitter = this.add.particles(0, 0, 'swirl', {
            gravityY: 200,
            lifespan: 2000,
            alpha: {
                start: 0.5,
                end: 0.1
            },
            tint: [ Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF ],
            emitZone: { 
                type: 'random', 
                source: line, 
                quantity: 150 
            },
            blendMode: 'ADD',
            scale: 0.5
        });

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.music.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.music.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.restart();
                    break;
                case 'Backspace':
                    this.music.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
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
            // update tile sprite
            this.background.tilePositionY -= this.bgSpeed;

            // check for player input
            if(Phaser.Input.Keyboard.JustDown(keyA)) {
                this.sound.play('synth2', { volume: 0.25 });
                this.dancer.body.x = w/2 - 210;
                this.dancer.body.y = 500;
                this.background.tint = Math.random() * 0xFFFFFF;
            } else if(Phaser.Input.Keyboard.JustDown(keyS)) {
                this.sound.play('synth2', { volume: 0.25 });
                this.dancer.body.x = w/2 - 100;
                this.dancer.body.y = 500;
                this.background.tint = Math.random() * 0xFFFFFF;
            } else if(Phaser.Input.Keyboard.JustDown(keyD)) {
                this.sound.play('synth2', { volume: 0.25 });
                this.dancer.body.x = w/2 + 20;
                this.dancer.body.y = 500;
                this.background.tint = Math.random() * 0xFFFFFF;
            } else if(Phaser.Input.Keyboard.JustDown(keyF)) {
                this.sound.play('synth2', { volume: 0.25 });
                this.dancer.body.x = w/2 + 130;
                this.dancer.body.y = 500;
                this.background.tint = Math.random() * 0xFFFFFF;
            }

            // check for collisions
            this.physics.world.collide(this.dancer, this.noteGroup, this.dancerCollision, null, this);

            // increase speed/difficulty as score increases
            if(score > 0 && score % 10 == 0) {
                this.noteSpeed++;
                this.musicSpeed += 0.0005;
                this.bgSpeed += 0.005;
                this.music.setRate(this.musicSpeed);
            }
        }
        
        // display game over text
        else {
            this.music.stop();
            this.noteGroup.clear(true, true);
            this.playText.alpha = 1;
            this.playText.setText('G A M E O V E R');
            paused++;
            if(paused < 10) {
                this.sound.play('synth0', { volume: 0.25 });
            }
        }
    }

    dancerCollision() {
        // on collision, destroy note & play sfx
        this.noteGroup.remove(this.noteGroup.getFirstAlive(true), true, true);
        this.sound.play('synth1', { volume: 0.25 });
        this.dancer.setVelocity(0);
        this.dancer.body.y = 500;

        // add to score / update highscore
        score++;
        if(score > highscore) {
            highscore = score;
        }
        this.scoreText.setText('SCORE:\n' + score);
        this.highScoreText.setText('HIGHSCORE:\n' + highscore);
    }
}