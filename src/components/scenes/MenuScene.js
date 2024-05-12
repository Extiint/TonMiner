import createText from "./util/texts";

export default class MenuScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'MenuScene' });
    }


    create() {
        this.cameras.main.backgroundColor.setTo(53, 52, 51);

       
        const rectWidth = this.cameras.main.width;
        const rectHeight = 50;
        const rectColor = 0x30302F; 
        const rectY = 64;

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY + rectHeight;

        const graphics = this.add.graphics();
        graphics.fillStyle(rectColor, 1);
        const rect = graphics.fillRect(0, rectY, rectWidth, rectHeight);

        const image = this.add.image(47, rectY + 24, 'diamond'); 
        const desiredWidth = this.scale.width * 0.2;
        const desiredWidth2 = this.scale.width * 0.22;
        const scaleFactor = desiredWidth / image.width;
        const scaleFactor2 = desiredWidth2 / image.width;
        // Set the scale of the image
        image.setScale(scaleFactor);
        
       
        createText(this, centerX - 105, rectY + 20, 'TOTAL MINED: 13.5', { fontSize: '12px', color: 'white' });

        const button = this.add.image(this.scale.width * 0.8, rectY + 31, 'b_button').setInteractive();
        button.on('pointerdown', () => {
            console.log('Button clicked');
        });

        button.setScale(scaleFactor2)


        this.balanceText = this.add.text(centerX, centerY - 60, 'Balance:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.minerText = this.add.text(centerX, centerY - 30, 'Miner:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.lastHatchText = this.add.text(centerX, centerY, 'Last Hatch:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.rewardsText = this.add.text(centerX, centerY + 30, 'Rewards:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.refCodeText = this.add.text(centerX, centerY + 60, 'Ref:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
    }
    
    updateData({ balance, miner, lastHatch, rewards, refCode }) {
        if (this.balanceText && this.minerText && this.lastHatchText && this.rewardsText && this.refCodeText){
            this.balanceText.setText(`Balance: ${balance}`);
            this.minerText.setText(`Miner: ${miner}`);
            this.lastHatchText.setText(`Last Hatch: ${lastHatch}`);
            this.rewardsText.setText(`Rewards: ${rewards}`);
            this.refCodeText.setText(`Ref: ${refCode}`);
        } 
    }
}
