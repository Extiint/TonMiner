import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import backgroundProfile from '../../media/bg/upgradeback.png'
import upgradetable from '../../media/bg/upgrade1.png'

import line from '../../media/bg/line.png'
import close from '../../media/icons/close.png'
import pickaxe1 from '../../media/pickaxes/1.png'


const UpgradePage = React.forwardRef(({ handleClose }, ref) => { 
        const [translateY, setTranslateY] = useState('-100%'); // Start above the viewport
    useEffect(() => {
        // Slide down to 0% (original position)
        const timer = setTimeout(() => {
            setTranslateY('0%');
        }, 200);  // Delay can be adjusted based on desired animation speed

        return () => clearTimeout(timer);
    }, []);

    const modalStyle = {
        position: 'fixed',
        top: 0,
        width: "100%",
        height: '90%',
        bgcolor: 'white',
        margin: 0,
        outline: 'none',
        transform: `translateY(${translateY})`, // Use state variable for vertical sliding
        transition: 'transform 300ms ease-out',  // Smooth slide transition
    };

    return (
        <>
            <Box sx={modalStyle} ref={ref} src={backgroundProfile} >
                <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ zIndex:5, top: 10, width: '100%', backgroundColor: '#30302F', padding: '20px 0', marginTop: '-7px' }}>
                    <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'center' }}>
                        UPGRADE
                    </div>
                    <img src={close} className='image-style' onClick={handleClose} style={{position:'absolute', right:10, width:'25px', height:'25px'}}/>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-around" gap={20} sx={{position:'absolute' ,zIndex:5, top:40,width: '100%', backgroundColor: '#080401', padding: '7px 0' }}>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'left' }}>
                      NEXT UPGRADE IN:
                  </div>
                  
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'right' }}>
                      NOW
                  </div>
              </Box>
              <Box component="img" src={backgroundProfile} alt="Full Width Image" sx={{ width: '100%', height: '80%' }} />

              <Box  sx={{ position: 'absolute', top: '12vh', width: '100%', justifyContent: 'center', padding: '20px 0px'}}>
                <Box display="flex" flexDirection="column" gap={1} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '7px 0', marginBottom:1, zIndex:20  }}>
                        <div className='inter'>
                            PICKAXE LEVEL 1
                        </div>
                        <div style={{ fontSize:'11px' }}>
                        <div style={{
                            backgroundColor: '#1D2358', 
                            border: '2px solid #0098EA', // Blue border color with a 2px solid style
                            borderRadius: '10px', // Rounded corners
                            zIndex:100
                        }}>
                            <img src={pickaxe1} alt="First Image" style={{ width: '15vh', marginTop:'10px'}} />
                        </div>

                        </div>
                        <div className='inter' style={{fontSize:'9px'}}>
                            0.1% PENALTY
                        </div>
                    </Box>

                </Box>

                <Box sx={{ position: 'absolute', bottom: 110, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img src={upgradetable}  alt="First Image" style={{ width: '32vh'}}/>
                </Box>
  

              <Box  sx={{ position: 'fixed', bottom: 0, width: '100%', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '10px 0px'}}>
               
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <div className='inter' style={{ textAlign: 'right' }}>
                            CHANCES TO FAIL: 1%
                        </div>
                        <button variant="contained" className='claimb' style={{marginLeft:'0%', marginTop:'7px'}} >
                            UPGRADE TO LEVEL 2
                    </button>
                    <div className='inter' style={{ textAlign: 'right', marginTop:'-10px', marginBottom:'4%' }}>
                            COST: 1 TON
                        </div>
                  </Box>
                    <Box sx={{ position: 'absolute', bottom: -3, width: '100%', display: 'flex' }}>
                        <img src={line}  alt="First Image" style={{ width: '100%', height:15 }}/>
                    </Box>
                </Box>

                
            </Box>
        </>
    );
});



export default UpgradePage;


