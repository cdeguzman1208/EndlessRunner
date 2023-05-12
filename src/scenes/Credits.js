class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add bgm
        this.creditsMusic = this.sound.add('street', { loop: true, volume: 0.25 });
        this.creditsMusic.play();

        let creditsConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            color: 'white',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
            },
            fixedWidth: 0
        }
        this.creditsText1 = this.add.text(w/2, h, 'CREDITS', creditsConfig).setOrigin(0.5);
        creditsConfig.fontSize = '20px';
        this.creditsText2 = this.add.text(w/2, h + 250, 'Design & Development:\nCromwell De Guzman\n\nArt:\nCromwell De Guzmann\n\nMusic:\nThe Podcast Intro - Music_Unlimited\nElectro Summer Positive Party - Alex Kizenkov\nBlast - AlexiAction\nDisco Groove - QubeSounds\nAction Techno Beat - ComaStudio\nElectro Pop - AlexiAction\nStreet Food - FASSounds\n\nSFX:\nJsfxr - Chris McCormick', creditsConfig).setOrigin(0.5);

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.creditsMusic.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.creditsMusic.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('playScene');
                    break;
                case 'Backspace':
                    this.creditsMusic.stop();
                    this.sound.play('laserShoot', { volume: 0.25 });
                    this.scene.start('creditsScene');
                    break;
                default:
                    break;
            }
        });
    }

    update() {
        if(this.creditsText2.y > 0 - 250) {
            this.creditsText1.y--;
            this.creditsText2.y--;
        }
        else {
            this.creditsText1.y = h;
            this.creditsText2.y = h + 250;
        }
    }
}