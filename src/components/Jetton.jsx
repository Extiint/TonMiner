import React from 'react';
import { Address } from "ton-core";
import { useJettonContract } from "../hooks/useJettonContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { Container, Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
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
      height: '100vh',  // Full viewport height
      width: '100vw',  // Full viewport width
      padding: 0, // Removes padding, if any
      margin: 0  // Removes margin to ensure it takes full width and height
    }}>
      <Card variant="outlined" sx={{ 
        width: '100%', // Stretches to the width of the container
        height: '100%', // Stretches to the height of the container
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-around'  // This helps in evenly spacing the internal content
        }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <TonConnectButton />
          </div>
          <Box display="flex" flexDirection="column" gap={2} sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
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
