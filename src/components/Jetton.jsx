import React from 'react';
import { useState } from 'react';
import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Container, Card, CardContent, Typography, Box, Button, Modal } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
import diamond from '../media/icons/diamante.png'
import backgroundImage from '../media/bg/bgdiamond.png'
import line from '../media/bg/line.png'

import g1 from '../media/icons/g1.png'
import g2 from '../media/icons/g2.png'
import docs from '../media/icons/docs.png'
import tg from '../media/icons/telegram.png'
import x from '../media/icons/x.png'
import fox from '../media/icons/fox.png'
import ton from '../media/icons/ton.png'

import ProfilePage from './subpages/ProfilePage';


export function Jetton() {
  const { connected, wallet } = useTonConnect();
  const { balance, miner, lasthatch, rewards, buy, sell } = useJettonContract();
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const imageStyle = {
    outline: 'none', 
    '&:focus': {
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)', 
    }
};

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

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
        <button variant="contained" className='claimbb' style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            width: 'auto', 
            padding: '5px 10px',
            marginRight: '2%' 
        }} disabled={!sell} onClick={() => {sell}}>
            <img src={ton} alt={ton} style={{ width: '30px',marginLeft:'0px' }} /> 
            <div style={{ width: '30px',marginRight:'-5px',marginLeft:'25px' ,fontSize:'12px'}}>0 <br />~0$</div>
        </button>

      </Box>

              <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ width: '100%', backgroundColor: '#30302F', padding: '10px 0', marginTop:'-7px' }}>
              
                  <Box component="img" className='idiamonds' src={diamond} alt="Descriptive Alt Text" sx={{ width: 70}} />
                  
                  <div style={{position:'absolute', width:'100%', height:'2px', backgroundColor: '#080401', top:61}}>
                    
                  </div>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    PENDING TON: 0.152 
                  </div>
                  <button variant="contained" className='claimb' style={{marginLeft:'0%'}} disabled={!sell} onClick={() => {sell}}>
                    CLAIM
                  </button>
              </Box>

              <Box display="flex" alignItems="center" justifyContent="space-around" gap={15} sx={{position:'absolute' ,zIndex:3, top:120,width: '100%', backgroundColor: '#080401', padding: '7px 0' }}>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'left' }}>
                      CONTRACT BALANCE:
                  </div>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'right' }}>
                      0 TON
                  </div>
              </Box>

              <Box sx={{ position: 'relative', width: '100%',height:'100%', overflow: 'hidden' , marginTop:'-20px', padding: '0px 0'}}>
                <Box component="img" src={backgroundImage} alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
                <Box sx={{ position: 'absolute',zIndex:2, bottom: 120, width: '100%', display: 'flex', justifyContent: 'space-around' , backgroundColor: '#1B1B1B', padding: '15px 0px'}}>
                    <Box sx={{ textAlign: 'center' }}>
                      <img src={g1} className='image-style' alt="First Image" style={{ width: 'auto' }} disabled={!connected} onClick={buy}/>
                      <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>UPGRADE<br />IN:</div>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <img src={fox} className='image-style' alt="Second Image" style={{ width: 'auto', ...imageStyle }} onClick={handleOpen}/>
                      <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>PROFILE</div>
                  </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <img src={g2} className='image-style' alt="Third Image" style={{ width: 'auto' }} />
                        <div className='inter2' style={{ marginTop: '5px', color: 'white' }}>REINVEST</div>
                    </Box>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      sx={{borderWidth:0,borderColor:'none',margin:0}}
                    >
                      <ProfilePage />
                  </Modal>
                </Box>

                <Box sx={{ position: 'absolute', bottom: 98, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={line}  alt="First Image" style={{ width: '100%' }}/>
                </Box>
              
                <Box gap={3} sx={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '20px 0px'}}>
                  <img src={docs} className='image-style2' alt="First Image" style={{ width: 'auto' }} disabled={!connected} onClick={buy}/>
                  <img src={tg} className='image-style2' alt="Second Image" style={{ width: 'auto'}} />
                  <img src={x} className='image-style2' alt="Third Image" style={{ width: 'auto' }} />
                </Box>
              </Box>

           

          </Box>
      
    </Container>
  );
  
}
