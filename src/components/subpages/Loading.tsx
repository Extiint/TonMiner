import React, { useState, useEffect, useRef } from 'react';

import { Container, Box } from '@mui/material';
import { TonConnectButton } from '@tonconnect/ui-react';
import fox from '../../media/icons/fox.png'
import banner from '../../media//bg/loading.jpg'

interface LoadingProps {
    balance: number | null;
    wallet: string | null;
    mediaLoaded: boolean;
    onSkip: () => void;
  }

export function Loading({ balance , wallet, mediaLoaded, onSkip}: LoadingProps)  {

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
        }, 200);
        return () => clearTimeout(timer);
      }, [balance,wallet]);

  return (
        <Container sx={{
        display: 'flex', 
        justifyContent: 'center', 
        height: '110vh', 
        width: '100vw', 
        padding: 0, 
        margin: 0,borderWidth:0,borderColor:'none'
        }}>
              <TonConnectButton style={{zIndex:10, marginTop:'10px', fontSize:'10px',position:'absolute' }}/>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{position:'absolute', flexGrow: 1, height: '100vh',top:"40%" ,zIndex:1}}>
                        <img src={fox} alt="Rotating Fox" className="rotating" />
                        {!balance && (
                            <div>
                                <div className='inter' style={{fontSize:'15px'}}>{message}</div>
                            </div>
                        )}
                        {mediaLoaded && (
                            <div>
                                <button onClick={onSkip} className='claimb' style={{fontSize:'14px'}}>
                                SKIP
                                </button>
                            </div>
                        )}
                        
                    </Box>
              <Box sx={{ position: 'relative', width: '100%',height:'100%', overflow: 'hidden' , marginTop:'-20px'}}>
                <Box component="img"  alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
                <Box component="img" src={banner} alt="Full Width Image" sx={{ width: '100%', height: '100%' }} />
                        
              </Box>

         
    </Container>
  );
  
}
