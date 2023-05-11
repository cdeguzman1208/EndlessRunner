class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add bgm
        this.endingMusic = this.sound.add('street', { loop: true, volume: 0.25 });
        this.endingMusic.play();

        let creditsConfig = {
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
        this.add.text(w/2, h/2, 'CREDITS', creditsConfig).setOrigin(0.5);

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.endingMusic.stop();
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.endingMusic.stop();
                    this.scene.start('playScene');
                    break;
                case 'Backspace':
                    this.endingMusic.stop();
                    this.scene.start('creditsScene');
                    break;
                default:
                    break;
            }
        });
    }

    update() {
        // The Podcast Intro - Music_Unlimited
        // Electro Summer Positive Party - Alex Kizenkov
        // Blast - AlexiAction
        // Disco Groove - QubeSounds
        // Action Techno Beat - ComaStudio
        // Electro Pop - AlexiAction
        // Street Food - FASSounds
    }
}