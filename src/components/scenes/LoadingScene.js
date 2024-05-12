class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        this.load.image('loader', 'miner.png');
        this.load.image('background', 'background.png');
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const loaderImage = this.add.image(centerX, centerY, 'loader').setDepth(2).setScale(0.5);
        const backImage = this.add.image(width / 2, height / 2, 'background');

        const scaleX = width / backImage.width;
    const scaleY = height / backImage.height;
    const scale = Math.max(scaleX, scaleY);
    backImage.setScale(scale).setScrollFactor(0);

        this.add.text(centerX, centerY + 100, 'Connect Your Wallet!', { font: '20px Arial', fill: '#ffffff' }).setOrigin(0.5);

        this.tweens.add({
            targets: loaderImage,
            angle: 360,
            duration: 2000,
            repeat: -1,
            ease: 'Linear'
        });
    }
}

export default LoadingScene;
