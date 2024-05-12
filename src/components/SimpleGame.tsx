import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import LoadingScene from './scenes/LoadingScene';
import MenuScene from './scenes/MenuScene'; // Make sure to import the MenuScene
import { useTonConnect } from '../hooks/useTonConnect';
import { useJettonContract } from '../hooks/useJettonContract';

interface IMenuScene extends Phaser.Scene {
  updateData(data: { balance: number; miner: number; rewards: number , refCode: string | null }): void;
}

const SimpleGame: React.FC = () => {
  const { connected } = useTonConnect();
  const {refCode, balance , miner, lasthatch,rewards, buy,sell} = useJettonContract()
console.log(refCode,"in the toher")
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const maxWidth = 500;
    const maxHeight = 1000;
    const width = Math.min(window.innerWidth, maxWidth);
        const height = Math.min(window.innerHeight, maxHeight);
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: width,
      height: height,
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
    // This function will check if the MenuScene is ready and then update its data
    function updateSceneData() {
        if(gameRef.current){
          const scene = gameRef.current.scene.getScene('MenuScene') as IMenuScene;
          if (scene) {
              scene.updateData({ balance, miner, rewards ,refCode });
          }
      }
    }

    if (gameRef.current) {
        if (connected) {
          gameRef.current.scene.stop('LoadingScene');
            gameRef.current.scene.start('MenuScene');  // Start MenuScene if connected
            updateSceneData();  // Attempt to update data right after starting the scene
        } else {
            gameRef.current.scene.start('LoadingScene');  // Go back to LoadingScene if not connected
        }
    }
}, [connected, balance, miner, lasthatch, rewards]);


  return <div id="phaser-example" style={{ width: '100vw', height: '100vh' }} />;
};

export default SimpleGame;
