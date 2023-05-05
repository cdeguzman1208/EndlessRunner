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

        // take care of all of our asset loading now
        this.load.image('paddle', 'paddle.png');
        this.load.image('fragment', 'fragment.png');
        this.load.image('cross', 'white_cross.png');
    }

    create() {
        // ...and pass to the next scene
        this.scene.start('menuScene');
    }
}