class Loading extends Phaser.Scene {
    constructor() {
        super('loadingScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // set load path
        this.load.path = './assets/';

        // load art (self-drawn)
        this.load.atlas('bunny', 'art/bunny.png', 'art/sprites.json');
        this.load.image('note', 'art/note.png');
        this.load.image('background', 'art/erbg.png');
        this.load.image('swirl', 'art/swirl.png')

        // load music (from pixabay)
        this.load.audio('techno', 'music/action-techno-beat-121310.mp3');
        this.load.audio('blast', 'music/blast-138451.mp3');
        this.load.audio('disco', 'music/disco-groove-122074.mp3');
        this.load.audio('pop', 'music/electro-pop-124340.mp3');
        this.load.audio('summer', 'music/electro-summer-positive-party-141081.mp3');
        this.load.audio('street', 'music/street-food-112193.mp3');
        this.load.audio('intro', 'music/the-podcast-intro-111863.mp3');

        // load sfx (randomly generated)
        this.load.audio('synth0', 'sfx/synth.wav');
        this.load.audio('synth1', 'sfx/synth (1).wav');
        this.load.audio('synth2', 'sfx/synth (2).wav');
        this.load.audio('laserShoot', 'sfx/laserShoot.wav');

        // load video (of me and my friends dancing)
        this.load.video('dejavu', 'video/DejaVuJamesCut.mp4');
    }

    create() {
        // ...and pass to the next scene
        this.scene.start('menuScene');
    }
}