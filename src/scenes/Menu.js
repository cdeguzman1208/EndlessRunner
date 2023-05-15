class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // add bgm
        this.bgm = this.sound.add('intro', { loop: true, volume: 0.25 });
        this.bgm.play();

        // add bg video
        this.video = this.add.video(-200, -100, 'dejavu').setScale(0.75).setOrigin(0);
        this.video.setMute(true);
        this.video.play(true);
        this.video.setPaused(false);
        this.video.tint = 0x0000FF;

        // display menu text
        let menuConfig = {
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
        this.add.text(w/2, h/2, 'E N D L E S S   D A N C E R', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        menuConfig.backgroundColor = '';
        this.add.text(w/2, h/2 + 100, 'Collect all the Music Notes!\n\nPress ASDF to dance, Spacebar to play,\nBackspace for credits, & Escape for main menu', menuConfig).setOrigin(0.5);

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.bgm.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.bgm.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('playScene');
                    break;
                case 'Backspace':
                    this.bgm.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('creditsScene');
                    break;
                default:
                    break;
            }
        });
    }
}