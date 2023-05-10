class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
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
        this.add.text(game.config.width/2, game.config.height/2, 'CREDITS', creditsConfig).setOrigin(0.5);

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    gameOver = false;
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    gameOver = false;
                    this.scene.start('playScene');
                    break;
                case 'Backspace':
                    gameOver = false;
                    this.scene.start('creditsScene');
                    break;
                default:
                    break;
            }
        });
    }

    update() {

    }
}