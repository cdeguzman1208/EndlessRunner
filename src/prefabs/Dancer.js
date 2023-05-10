// Dancer prefab
class Dancer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, 120, 132, 'paddle');

        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.dancer.setCollideWorldBounds(true);
        this.dancer.setImmovable();
        this.dancer.setDepth(1);             // ensures that dancer z-depth remains above dancer paddles
        this.dancer.setBlendMode('SCREEN');  // set a webgl blend mode
        this.dancer.missed = false;

    }
}