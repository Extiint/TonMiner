import React from 'react';
import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Container, Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
import diamond from '../media/icons/diamante.png'
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
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw', 
      padding: 0, 
      margin: 0 
    }}>
      <Card variant="outlined" sx={{ 
        width: '100%',
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-around'  // This helps in evenly spacing the internal content
        }}>
      
          <Box display="flex" flexDirection="column" gap={2} sx={{ flexGrow: 1 }}>
          <TonConnectButton/>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                  <Box component="img" src={diamond} alt="Descriptive Alt Text" sx={{ width: 40, height: 40 }} />
                  <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Label Text Here
                  </Typography>
                  <Button variant="contained" onClick={() => { /* your button action here */ }}>
                    Button Text
                  </Button>
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
            <Box display="flex" justifyContent="center" gap={1}>
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
        </CardContent>
      </Card>
    </Container>
  );
  
}
