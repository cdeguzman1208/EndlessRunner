class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // display meny text
        let menuConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        menuConfig.color = 'white';
        this.add.text(game.config.width/2, game.config.height/2 + 75, 'press space to play, backpace for credits, esc for main menu', menuConfig).setOrigin(0.5);
        
        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    this.scene.start('menuScene');
                    break;
                case ' ':
                    this.scene.start('playScene');
                    break;
                case 'Backspace':
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