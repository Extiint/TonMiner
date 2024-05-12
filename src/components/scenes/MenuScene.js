export default class MenuScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'MenuScene' });
    }
    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
    
        // Create text objects directly in the create method, centered on the screen
        this.balanceText = this.add.text(centerX, centerY - 60, 'Balance:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.minerText = this.add.text(centerX, centerY - 30, 'Miner:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.lastHatchText = this.add.text(centerX, centerY, 'Last Hatch:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
        this.rewardsText = this.add.text(centerX, centerY + 30, 'Rewards:', { fontSize: '16px', fill: '#FFF' }).setOrigin(0.5);
    }
    
  
    updateData({ balance, miner, lastHatch, rewards }) {
        // Update the text objects directly
        console.log(balance,miner,rewards)
        this.balanceText.setText(`Balance: ${balance}`);
        this.minerText.setText(`Miner: ${miner}`);
        this.lastHatchText.setText(`Last Hatch: ${lastHatch}`);
        this.rewardsText.setText(`Rewards: ${rewards}`);
    }
  }
  