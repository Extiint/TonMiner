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

export function Jetton() {
  const { connected, wallet } = useTonConnect();
  const { balance,userbalance , miner, lasthatch, rewards, buy, sell } = useJettonContract();
  const [open, setOpen] = useState(false);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);

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

  const [isPlaying, setIsPlaying] = useState(false);  // State to manage playback
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
  

  const imageStyle = {
    outline: 'none', 
    '&:focus': {
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)', 
    }
};

if (!wallet || !mediaLoaded || !userbalance) {
  return <Loading balance={userbalance} wallet={wallet}/>;
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
                    PENDING TON: 0.152 
                  </div>
                  <button variant="contained" className='claimb' style={{marginRight:'10px' , fontSize:'12px',marginTop:"10px"}} disabled={!sell} onClick={() => {sell}}>
                    CLAIM
                  </button>
              </Box>

              <Box display="flex" alignItems="center" justifyContent="space-around" gap={10} sx={{position:'absolute' ,zIndex:3, top:120,width: '100%', backgroundColor: '#080401', padding: '7px 0' }}>
                  <div variant="body2" className='inter4' sx={{ flexGrow: 1, textAlign: 'left', fontSize:'12px' }}>
                      CONTRACT BALANCE:
                  </div>
                  <div variant="body2" className='inter4' sx={{ flexGrow: 1, textAlign: 'right', fontSize:'12px',right:5 }}>
                      0 TON
                  </div>
              </Box>

              <Box sx={{ position: 'relative', width: '100%',height:'100%', overflow: 'hidden' , marginTop:'-20px'}}>
                <Box component="img" src={mediaFiles.backgroundImage} alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
                <Box sx={{ position: 'absolute',zIndex:2, height:'14vh', bottom: "13vh", width: '100%', display: 'flex', justifyContent: 'space-around' , backgroundColor: '#1B1B1B', padding: '2vh 0px'}}>
                    <Box sx={{ textAlign: 'center' }}>
                      <img src={mediaFiles.g1} className='image-style' alt="First Image" style={{ width: 'auto' }} disabled={!connected} onClick={handleOpenUpgrade}/>
                      <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>UPGRADE</div>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <img src={mediaFiles.fox} className='image-style' alt="Second Image" style={{ width: 'auto', ...imageStyle }} onClick={handleOpen}/>
                      <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>PROFILE</div>
                  </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <img src={mediaFiles.g2} className='image-style' alt="Third Image" style={{ width: 'auto' }} />
                        <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>REINVEST</div>
                    </Box>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      sx={{borderWidth:0,borderColor:'none',margin:0}}
                    >
                      <ProfilePage handleClose={handleClose}/>
                  </Modal>
                  <Modal
                      open={openUpgrade}
                      onClose={handleCloseUpgrade}
                      sx={{borderWidth:0,borderColor:'none',margin:0}}
                    >
                      <UpgradePage handleClose={handleCloseUpgrade}/>
                  </Modal>
                </Box>

                <Box sx={{ position: 'absolute', bottom: '33.2vh', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={mediaFiles.character}  alt="First Image" style={{  height:'23.5vh',zIndex:6}}/>
                </Box>

                <Box sx={{ position: 'absolute', bottom: '11.2vh', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={mediaFiles.line}  alt="First Image" style={{ width: '100%' , height:'2.5vh',zIndex:6}}/>
                </Box>

              
                <Box gap={3} sx={{ position: 'absolute', bottom: 0, width: '100%', height:'5vh', display: 'flex', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '4vh 0px'}}>
                  <img src={mediaFiles.docs} className='image-style2' alt="First Image" style={{ width: 'auto' }} disabled={!connected} onClick={buy}/>
                  <img src={mediaFiles.tg} className='image-style2' alt="Second Image" style={{ width: 'auto'}} />
                  <img src={mediaFiles.x} className='image-style2' alt="Third Image" style={{ width: 'auto' }} />
                </Box>
              </Box>

           

          </Box>
      
    </Container>
  );
  
}
