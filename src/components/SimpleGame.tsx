import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import LoadingScene from './scenes/LoadingScene';
import MenuScene from './scenes/MenuScene'; // Make sure to import the MenuScene
import { useTonConnect } from '../hooks/useTonConnect';

const SimpleGame: React.FC = () => {
  const { connected } = useTonConnect();
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [LoadingScene, MenuScene]  // Include the MenuScene in the game's scene list
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  useEffect(() => {
    if (gameRef.current) {
      if (connected) {
        gameRef.current.scene.start('MenuScene'); // Start MenuScene if connected
      } else {
        gameRef.current.scene.start('LoadingScene'); // Go back to LoadingScene if not connected
      }
    }
  }, [connected]);

  return <div id="phaser-example" style={{ width: '100vw', height: '100vh' }} />;
};

export default SimpleGame;
