import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import close from '../../media/icons/close.png'
import { mediaFiles } from '../../hooks/utils/media';
import { toNano } from 'ton-core';
import { useJettonContract } from '../../hooks/useJettonContract';

const ProfilePage = React.forwardRef(({ handleClose ,mycode}, ref) => { 
        const [translateY, setTranslateY] = useState('-100%');
        const { userAddress , refCode, buy} = useJettonContract();
        const [inputValue, setInputValue] = useState('');
        const [buttonText, setButtonText] = useState(`https://t.me/diamondDashBot?startapp=${mycode}`);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(buttonText); // Copies the link to the clipboard
                setButtonText('COPIED!'); // Changes the button text to "COPIED!"
                setTimeout(() => {
                    setButtonText(`https://t.me/diamondDashBot?startapp=${mycode}`); // Resets the text after 2 seconds
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err); // Handle possible errors
            }
        };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTranslateY('0%');
        }, 200); 

        return () => clearTimeout(timer);
    }, []);
    
    const handleInvestClick = () => {
        buy(inputValue,BigInt(10000)); 
    };
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
                        PROFILE
                    </div>
                    <img src={close} className='image-style' onClick={handleClose} style={{position:'absolute', right:10, width:'25px', height:'25px'}}/>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-around" gap={20} sx={{position:'absolute' ,zIndex:5, top:40,width: '100%', backgroundColor: '#080401', padding: '7px 0' }}>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'left' }}>
                      HASH POWER:
                  </div>
                  
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'right' }}>
                      0 
                  </div>
              </Box>
              <Box component="img" src={mediaFiles.backgroundProfile} alt="Full Width Image" sx={{ width: '100%', height: '80%' }} />

              <Box  sx={{ position: 'absolute', top: '10vh', width: '60%', justifyContent: 'center', padding: '20px 0px'}}>
               

                    <Box display="flex" flexDirection="column" gap={1} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '7px 0', marginBottom:1, zIndex:10  }}>
                        <div className='inter' style={{fontSize:'14px'}}>
                        BUY HASH POWER
                        </div>
                        <div style={{ textAlign: 'right', marginRight:'5%', fontSize:'11px' }}>
                        <input
                                type="text"
                                placeholder="TON AMOUNT"
                                className="profilet"
                                style={{ maxWidth: '90px' }}
                                value={inputValue}  // Controlled component
                                onChange={e => setInputValue(e.target.value)}  // Update state on input change
                            />
                        </div>
                        <div className='inter' style={{fontSize:'10px'}}>
                            MINIMUM 10 TON
                        </div>
                        <button
                            variant="contained"
                            className='claimb'
                            style={{ marginLeft: '0%' }}
                            onClick={handleInvestClick}  // Handle button click
                        >
                            INVEST
                    </button>
                    </Box>

                </Box>

                <Box sx={{ position: 'absolute', bottom: 150, width: '40%', display: 'flex', justifyContent: 'right' , right:20}}>
                  <img src={mediaFiles.ProfileFox}  alt="First Image" style={{ width: '30vh'}}/>
                </Box>
  

              <Box  sx={{ position: 'fixed', bottom: 0, width: '100%', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '3px 0px'}}>
                <Box display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '5px 0', marginBottom:1  }}>
                        <div className='inter'  style={{ textAlign: 'left' ,fontSize:'9px', marginBottom:'6px'}}>
                            SHARE YOUR LINK TO GET 8% COMMISSION
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button variant="contained" className='profileb' onClick={handleCopy} style={{fontSize:'9px'}} >
                            {buttonText}
                            </button>
                        </div>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%', padding: '0.5vh 0' }}>
                        <div className='inter' style={{ textAlign: 'left' ,marginLeft:'5%'}}>
                        REFERRAL  REWARDS
                        </div>
                        <div className='inter' style={{ textAlign: 'right', marginRight:'5%' }}>
                            0 TON
                        </div>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '1vh', marginBottom:0 }}>
                        <button variant="contained" className='claimb' style={{marginLeft:'0%'}} >
                            CLAIM REWARDS
                    </button>
                    </Box>
                 
                    <Box sx={{ position: 'absolute', bottom: -3, width: '100%', display: 'flex' }}>
                        <img src={mediaFiles.line}  alt="First Image" style={{ width: '100%', height:15 }}/>
                    </Box>
                </Box>

                
            </Box>
        </>
    );
});



export default ProfilePage;


