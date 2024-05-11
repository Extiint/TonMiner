// src/scenes/MenuScene.tsx
import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Add menu UI elements here
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Welcome to the Menu', { font: '32px Arial', fill: '#ffffff' }).setOrigin(0.5);
    // Add more interactive elements as needed
    this.scene.launch()
  }
}
