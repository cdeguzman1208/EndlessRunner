class Loading extends Phaser.Scene {
    constructor() {
        super('loadingScene');
    }

    preload() {
        // set load path
        this.load.path = 'assets/';

        // take care of all of our asset loading now
        
    }

    create() {
        // ...and pass to the next scene
        this.scene.start('menuScene');
    }
}