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
        this.add.text(w/2, h/2, 'ENDLESS DANCER', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '20px';
        menuConfig.color = 'white';
        this.add.text(w/2, h/2 + 100, 'Collect all the Music Notes!\n\nPress Arrow Keys to dance, Spacebar to play,\nBackspace for credits, & Escape for main menu', menuConfig).setOrigin(0.5);
        
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