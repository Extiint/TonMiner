import React, { useState, useEffect, useRef } from 'react';

import { Container, Card, CardContent, Typography, Box, Button, Modal } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';

import banner from '../../media/banner.jpg'

export function Loading() {
  
  return (
    <Container sx={{
      display: 'flex', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100vw', 
      padding: 0, 
      margin: 0,borderWidth:0,borderColor:'none'
    }}>
              <TonConnectButton style={{zIndex:10, marginTop:'8px', width:'200px', fontSize:'10px',marginLeft:'2%',position:'absolute' }}/>

      <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ flexGrow: 1, height: '100vh' }}>

              <Box sx={{ position: 'relative', width: '100%',height:'100%', overflow: 'hidden' , marginTop:'-20px'}}>
                <Box component="img" src={banner} alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
              </Box>
          </Box>
    </Container>
  );
  
}
