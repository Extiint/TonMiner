import React, { useState, useEffect, useRef } from 'react';
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Container, Box, Modal } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
import { getTokenPrice } from '../hooks/utils/gecko';
import ProfilePage from './subpages/ProfilePage';
import UpgradePage from './subpages/UpgradePage';
import soundon from '../media/icons/soundon.png'
import soundoff from '../media/icons/soundoff.png';
import { Loading } from './subpages/Loading';
import { loadAllMedia } from '../hooks/utils/media';
import { mediaFiles } from '../hooks/utils/media';
import { fromNano } from 'ton-core';

export function Jetton() {
  const { connected, wallet } = useTonConnect();
  const { canStart ,stats, balance,userbalance ,rewards, hash,roi,level,penalty,upgradewen,refCode,promorewards, sell ,reinvest} = useJettonContract();
  const [open, setOpen] = useState(false);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [character, setCharacter] = useState(0);

  const [timeLeft, setTimeLeft] = useState('NOW');

    useEffect(() => {
      if(!upgradewen){
        return;
      }
        const interval = setInterval(() => {
            const now = new Date();
            const upgradeTime = new Date(upgradewen * 1000);
            const upgradeTimePlus24Hrs = new Date(upgradeTime.getTime() + 60 * 1000);


            const timeDifference = upgradeTimePlus24Hrs - now;

            if (timeDifference > 0) {
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);

                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('NOW');
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [upgradewen]);

  useEffect(() => {
    loadAllMedia().then(() => {
        setMediaLoaded(true);
    }).catch(error => {
        console.error("Error loading media: ", error);
    });
}, []);

  useEffect(() => {
    getTokenPrice()
      .then(data => {
        if(userbalance > 0){
          setTokenPrice(data); 
        }
      });
  }, [userbalance]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpgrade, setopenUpgrade] = useState(false);
  const handleOpenUpgrade = () => setopenUpgrade(true);
  const handleCloseUpgrade = () => setopenUpgrade(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if(!level){return;}
    if (level < 5){
      setCharacter(1)
    }else if (level < 10){
      setCharacter(2)
    } else if (level < 15){
      setCharacter(3)
    } else if (level >= 15){
      setCharacter(4)
    }
  }, [level]);
  

  const imageStyle = {
    outline: 'none', 
    '&:focus': {
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)', 
    }
};

if ((!wallet || !mediaLoaded || !userbalance ) && !skipLoading && !canStart) {
    return <Loading balance={userbalance} wallet={wallet} mediaLoaded={mediaLoaded} onSkip={() => setSkipLoading(true)}/>;
}

  return (
    <Container maxWidth={false} sx={{
      display: 'flex', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100vw', 
      padding: 0, 
      margin: 0,borderWidth:0,borderColor:'none'
    }}>
      
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ flexGrow: 1, height: '100vh' }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', height: '60px' }}>
        <TonConnectButton style={{ marginTop:'8px', width:'200px', fontSize:'10px',marginLeft:'2%' }}/>
        <audio ref={audioRef} src={mediaFiles.soundFile} loop />
     
        <button variant="contained" className='claimbb' style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            width: 'auto', 
            padding: '5px 10px',
            marginRight: '2%' 
        }} disabled={!sell} onClick={() => {sell}}>
            <img src={mediaFiles.ton} alt='ton' style={{ width: '30px',marginLeft:'0px' }} /> 
            <div style={{ width: '30px',marginRight:'-5px',marginLeft:'25px' ,fontSize:'12px', textAlign:'right'}}>{userbalance.toFixed(2)} <br />
            {userbalance > 0 && tokenPrice ? (userbalance * tokenPrice).toFixed(0): 0}$</div>
        </button>

        <img 
            src={isPlaying ? soundoff : soundon} 
            alt={isPlaying ? 'Mute' : 'Play'} 
            className='image-style'
            style={{
              position: 'absolute', 
              width: '40px', 
              height:'40px',
              top: '161px', 
              right: '15px', 
              zIndex: 10,
              cursor: 'pointer'
            }} 
            onClick={togglePlayback} 
          />

      </Box>

              <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', backgroundColor: '#30302F', padding: '1px 0', marginTop:'-7px' }}>
                  <Box component="img" className='idiamonds' src={mediaFiles.diamondIcon} alt="Descriptive Alt Text" sx={{ marginLeft:'7px', width: 70, marginTop:"-10px"}} />
                    <div className='inter4' style={{ flexGrow: 1, textAlign: 'center', fontSize:'12px', }}>
                      PENDING TON: {rewards}
                    </div>
                    <button variant="contained" className='claimb' style={{marginRight:'10px' , fontSize:'12px',marginTop:"10px"}} disabled={!stats} onClick={sell}>
                      CLAIM
                    </button>
              </Box>

              <Box display="flex" alignItems="center" justifyContent="space-around" gap={10} sx={{position:'absolute' ,zIndex:3, top:120,width: '100%', backgroundColor: '#080401', padding: '7px 0' }}>
                  <div variant="body2" className='inter4' sx={{ flexGrow: 1, textAlign: 'left', fontSize:'12px' }}>
                      CONTRACT BALANCE:
                  </div>
                  <div variant="body2" className='inter4' sx={{ flexGrow: 1, textAlign: 'right', fontSize:'12px',right:5 }}>
                      {Number(balance).toFixed(2)} TON
                  </div>
              </Box>
              <Box
                display="flex"
                alignItems="left"
                justifyContent="left"
                sx={{
                  position: 'absolute',
                  zIndex: 3,
                  top: 155,
                  left:5,
                  backgroundColor: 'rgba(17, 18, 18, 0.8)', 
                  padding: '7px 0', 
                  paddingLeft: '10px',
                  paddingRight: '10px', 
                  borderRadius: '8px',
                  border: '1px solid #FFFFFF',
                }}
              >                  
              <div variant="body2" className='inter5' sx={{ textAlign: 'left', fontSize:'9px' }}>
                      LEVEL: {level} <br />
                      YIELD: {roi}% <br />          
                      DEPOSIT: {hash.toFixed(2)}  <br />            
                  </div>
              </Box>

              <Box sx={{ position: 'relative', width: '100%',height:'100%', overflow: 'hidden' , marginTop:'-20px'}}>
                <Box component="img" src={mediaFiles.backgroundImage} alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
                <Box sx={{ position: 'absolute',zIndex:2, height:'14vh', bottom: "13vh", width: '100%', display: 'flex', justifyContent: 'space-around' , backgroundColor: '#1B1B1B', padding: '2vh 0px'}}>
                    <Box sx={{ textAlign: 'center' }}>

                      <img src={mediaFiles.g1} className={timeLeft === 'NOW' && stats ? 'image-styleLum' : 'image-style'} alt="First Image" style={{ width: 'auto' }} disabled={!connected} onClick={handleOpenUpgrade}/>
                      <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>{timeLeft == 'NOW' ? "UPGRADE" : timeLeft}</div>

                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <img src={mediaFiles.fox} className='image-style' alt="Second Image" style={{ width: 'auto', ...imageStyle }} onClick={handleOpen}/>
                      <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>PROFILE</div>
                  </Box>
                  
                    <Box sx={{ textAlign: 'center' }}>
                        <img src={mediaFiles.g2} className='image-style' alt="Third Image" style={{ width: 'auto' }} onClick={reinvest}/>
                        <div className='inter2' style={{ marginTop: '5px', color: 'white' }} >REINVEST</div>
                    </Box>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      sx={{borderWidth:0,borderColor:'none',margin:0}}
                    >
                      <ProfilePage handleClose={handleClose} mycode={refCode} promorewards={promorewards ? fromNano(promorewards) : 0}/>
                  </Modal>
                  <Modal
                      open={openUpgrade}
                      onClose={handleCloseUpgrade}
                      sx={{borderWidth:0,borderColor:'none',margin:0}}
                    >
                      <UpgradePage handleClose={handleCloseUpgrade} level={level} penalty={penalty} upgradewen={timeLeft}/>
                  </Modal>
                </Box>

                <Box sx={{ position: 'absolute', bottom: '31.5vh', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={mediaFiles[`character${character}`]}  alt="First Image" style={{  height:'23.5vh',zIndex:6}}/>
                </Box>

                <Box sx={{ position: 'absolute', bottom: '11.2vh', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={mediaFiles.line}  alt="First Image" style={{ width: '100%' , height:'2.5vh',zIndex:6}}/>
                </Box>
                <Box gap={3} sx={{ position: 'absolute', bottom: 0, width: '100%', height:'5vh', display: 'flex', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '4vh 0px'}}>
                <a href="/TonMiner/dd_wp.pdf" target="_blank" rel="noopener noreferrer">
        <img src={mediaFiles.docs} className='image-style2' alt="First Image" style={{ width: 'auto' }} />
          </a>
          <a href="https://t.me/DiamondDash_TON" target="_blank" rel="noopener noreferrer">
            <img src={mediaFiles.tg} className='image-style2' alt="Second Image" style={{ width: 'auto' }} />
          </a>
          <a href="https://t.me/DiamondDash_TON" target="_blank" rel="noopener noreferrer">
            <img src={mediaFiles.x} className='image-style2' alt="Third Image" style={{ width: 'auto' }} />
          </a>
                </Box>
              </Box>

           

          </Box>
      
    </Container>
  );
  
}
