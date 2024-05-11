import React, { useEffect } from 'react';
import Phaser from 'phaser';

const SimpleGame: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: window.innerWidth,
      height: window.innerHeight,
      scene: {
        preload: function(this: Phaser.Scene) {
          this.load.image('sky', 'vite.svg'); // Ensure the path is correct
        },
        create: function(this: Phaser.Scene) {
          const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sky');

          // Make the image interactive (optional, if you want to make it draggable or react to other interactions)
          image.setInteractive();

          // Add a pointer down listener to the image
          this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            image.x = pointer.x;
            image.y = pointer.y;
          });
        }
      }
    };

    const game = new Phaser.Game(config);

    // Function to handle game resize
    const resize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-example" style={{ width: '100vw', height: '100vh' }} />;
};

export default SimpleGame;
