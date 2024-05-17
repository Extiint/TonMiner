import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { mediaFiles } from '../../hooks/utils/media';
import close from '../../media/icons/close.png'
import { useJettonContract } from '../../hooks/useJettonContract';

const UpgradePage = React.forwardRef(({ handleClose , level, penalty, upgradewen}, ref) => { 
    const {upgrade} = useJettonContract();
    const [character, setCharacter] = useState(0);

        const [translateY, setTranslateY] = useState('-100%'); // Start above the viewport
    useEffect(() => {
        // Slide down to 0% (original position)
        const timer = setTimeout(() => {
            setTranslateY('0%');
        }, 200);  // Delay can be adjusted based on desired animation speed

        return () => clearTimeout(timer);
    }, []);

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
            <Box sx={modalStyle} ref={ref} >
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
                      {upgradewen}
                  </div>
              </Box>
              <Box component="img" src={mediaFiles.backgroundUpgrade} alt="Full Width Image" sx={{ width: '100%', height: '80%' }} />

              <Box  sx={{ position: 'absolute', top: '12vh', width: '100%', justifyContent: 'center', padding: '20px 0px'}}>
                <Box display="flex" flexDirection="column" gap={1} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '7px 0', marginBottom:1, zIndex:20  }}>
                        <div className='inter'>
                            PICKAXE LEVEL {level}
                        </div>
                        <div style={{ fontSize:'11px' }}>
                        <div style={{
                            backgroundColor: '#1D2358', 
                            border: '2px solid #0098EA', // Blue border color with a 2px solid style
                            borderRadius: '10px', // Rounded corners
                            zIndex:100
                        }}>
                            <img src={mediaFiles[`pickaxe${character}`]} alt="First Image" style={{ width: '18vh', marginTop:'10px'}} />
                        </div>

                        </div>
                        <div className='inter' style={{fontSize:'10px', color: penalty === 0 ? 'green' : 'red' }}>
                            {penalty}% PENALTY
                        </div>
                    </Box>

                </Box>

                <Box sx={{ position: 'absolute', bottom: 110, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img src={mediaFiles.upgradetable}  alt="First Image" style={{ width: '32vh'}}/>
                </Box>
  

              <Box  sx={{ position: 'fixed', bottom: 0, width: '100%', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '10px 0px'}}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <div className='inter' style={{ textAlign: 'right' }}>
                           {level > 0 ? "SUCCESS CHANCES: " + (101 - (level * 2) + "%") : "SUCCESS CHANCES: 99%"}
                        </div>
                        <button variant="contained" className='claimb' style={{marginLeft:'0%', marginTop:'7px', backgroundColor:upgradewen === 'NOW' ? '#0098EA' : 'transparent'}} disabled={upgradewen != 'NOW'} onClick={upgrade}>
                            UPGRADE TO LEVEL {level + 1}
                    </button>
                    <div className='inter' style={{ textAlign: 'right', marginTop:'-10px', marginBottom:'4%' }}>
                            COST: 1 TON
                        </div>
                  </Box>
                    <Box sx={{ position: 'absolute', bottom: -3, width: '100%', display: 'flex' }}>
                        <img src={mediaFiles.line}  alt="First Image" style={{ width: '100%', height:15 }}/>
                    </Box>
                </Box>

                
                
                {level == 0 && (
                    <><Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ position: 'absolute', top: "10%", width: '100%', height: '90%', backgroundColor: '#30302F', opacity: 0.5 }}>
                    </Box><Box sx={{ position: 'absolute', top: "40%", width: '70%', marginLeft: '15%', justifyContent: 'center', backgroundColor: '#1B1B1B', padding: '10px 0px' }}>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                <div className='inter' style={{ textAlign: 'center' }}>
                                    YOU NEED TO BUY A PICKAXE FIRST!
                                </div>

                                <div className='inter' style={{ textAlign: 'center', marginTop: '10px', marginBottom: '4%' }}>
                                    You can get a pickaxe by depositing any amount from your profile page
                                </div>
                                <button variant="contained" className='claimb' style={{ marginLeft: '0%', marginTop: '7px' }} onClick={handleClose}>
                                    OK
                                </button>
                            </Box>
                            <Box sx={{ position: 'absolute', bottom: -3, width: '100%', display: 'flex' }}>
                                <img src={mediaFiles.line} alt="First Image" style={{ width: '100%', height: 15 }} />
                            </Box>
                        </Box></>
                )}
                

                
            </Box>
        </>
    );
});



export default UpgradePage;


