class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
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

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2, 'ENDLESS DANCER', menuConfig).setOrigin(0.5);
        }

    update() {

    }
}