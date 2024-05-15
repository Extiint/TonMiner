import React, { useState, useEffect, useRef } from 'react';

import { Container, Box } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
import fox from '../../media/icons/fox.png'
import banner from '../../media/banner.jpg'

interface LoadingProps {
    balance: number | null;
    wallet: string | null;
  }

export function Loading({ balance , wallet}: LoadingProps)  {

    const [message, setmessage] = useState('CONNECT YOUR WALLET');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if(wallet && !balance){
            setmessage('FETCHING YOUR DATA ;')
        }
        
      }, [balance,wallet]);

      useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

  return (
        <Container sx={{
        display: 'flex', 
        justifyContent: 'center', 
        height: '100vh', 
        width: '100vw', 
        padding: 0, 
        margin: 0,borderWidth:0,borderColor:'none'
        }}>
              <TonConnectButton style={{zIndex:10, marginTop:'8px', fontSize:'10px',position:'absolute' }}/>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{position:'absolute', flexGrow: 1, height: '100vh',top:"40%" ,zIndex:1}}>
                        <img src={fox} alt="Rotating Fox" className="rotating" />
                        {
                          !balance && showMessage && (
                            <div className='inter'>{message}</div>
                          )
                        }
                        
                    </Box>
              <Box sx={{ position: 'relative', width: '100%',height:'100%', overflow: 'hidden' , marginTop:'-20px'}}>
                <Box component="img"  alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
                

              </Box>

         
    </Container>
  );
  
}
