import React from 'react';
import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Container, Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
import diamond from '../media/icons/diamante.png'
import backgroundImage from '../media/bg/bg1.png'
import g1 from '../media/icons/g1.png'
import g2 from '../media/icons/g2.png'
import g3 from '../media/icons/g3.png'

export function Jetton() {
  const { connected, wallet } = useTonConnect();
  const { balance, miner, lasthatch, rewards, buy, sell } = useJettonContract();

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
      margin: 0 
    }}>
      
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ flexGrow: 1, height: '100vh' }}>
           <TonConnectButton style={{marginTop:'15px'}}/>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ width: '100%', backgroundColor: '#30302F', padding: '10px 0' }}>
                
                  <Box component="img" className='idiamonds' src={diamond} alt="Descriptive Alt Text" sx={{ width: 70}} />
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'center' }}>
                    PENDING TON: 0.152 
                  </div>
                  <button variant="contained" className='claimb' style={{marginLeft:'0%'}} onClick={() => { /* your button action here */ }}>
                    CLAIM
                  </button>
              </Box>

              <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' , marginTop:'-20px'}}>
                <Box component="img" src={backgroundImage} alt="Full Width Image" sx={{ width: '100%', height: 'auto' }} />
              
                <Box sx={{ position: 'absolute', bottom: 40, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={g1} className='image-style' alt="First Image" style={{ width: 'auto' }} />
                  <img src={g2} className='image-style' alt="Second Image" style={{ width: 'auto'}} />
                  <img src={g3} className='image-style' alt="Third Image" style={{ width: 'auto' }} />
                </Box>
              </Box>

            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Contract Balance: {balance} TON
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Your Miners: {Number(miner)}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Last Hatch: {formatDate(lasthatch)}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Rewards: {rewards} TON
            </Typography>
            <Box display="flex" justifyContent="center" gap={1} sx={{marginBottom:'4%'}}>
              <Button variant="contained" disabled={!connected} onClick={buy}>
                Buy Miners
              </Button>
              <Button variant="contained" disabled={!connected} onClick={buy}>
                Hatch
              </Button>
              <Button variant="contained" disabled={!connected} onClick={sell}>
                Sell Eggs
              </Button>
            </Box>
          </Box>
      
    </Container>
  );
  
}
