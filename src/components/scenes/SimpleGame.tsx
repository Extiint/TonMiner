import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import LoadingScene from './LoadingScene';
import MenuScene from './MenuScene'; // Make sure to import the MenuScene
import { useTonConnect } from '../../hooks/useTonConnect';
import { useJettonContract } from '../../hooks/useJettonContract';

interface IMenuScene extends Phaser.Scene {
  updateData(data: { balance: number; miner: number; rewards: number , refCode: string | null }): void;
}

const SimpleGame: React.FC = () => {
  const { connected } = useTonConnect();
  const {refCode, balance , miner, lasthatch,rewards, buy,sell} = useJettonContract()
  console.log(lasthatch,"in the toher")
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: 375,  // Original game width
      height: 812, // Original game height
      scale: {
        mode: Phaser.Scale.FIT, // Disable Phaser's built-in scaling
        autoCenter: Phaser.Scale.CENTER_BOTH ,
        width:'100%',
        height:'100%'
      },
      scene: [new LoadingScene(connected), MenuScene]
    };
  
    gameRef.current = new Phaser.Game(config);
  
  
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, [connected]);

  useEffect(() => {
    if (gameRef.current) {
          gameRef.current.scene.start('LoadingScene');  
    }
}, []);

useEffect(() => {
  function updateSceneData() {
    if(gameRef.current){
      const scene = gameRef.current.scene.getScene('MenuScene') as IMenuScene;
      if (scene) { 
        scene.updateData({ balance, miner, rewards, refCode });
      }
  }
}
  if (connected && gameRef.current && gameRef.current.scene.getScene('MenuScene')) {
        updateSceneData();
  }
}, [connected, balance, miner, lasthatch, rewards]);


  return <div id="phaser-example" style={{ maxWidth:'500px' }} />;
};

export default SimpleGame;
