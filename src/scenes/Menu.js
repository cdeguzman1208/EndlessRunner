class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // add bgm
        this.bgm = this.sound.add('intro', { loop: true, volume: 0.25 });
        this.bgm.play();

        // display menu text
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '40px',
            color: 'cyan',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
            },
            fixedWidth: 0
        }
        this.add.text(w/2, h/2, 'ENDLESS DANCER', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        menuConfig.color = 'white';
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