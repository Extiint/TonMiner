import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import backgroundProfile from '../../media/bg/bgprofile.png'
import ProfileFox from '../../media/bg/profileFox.png'

import line from '../../media/bg/line.png'

const ProfilePage = React.forwardRef((props, ref) => {
    // State to manage scale transformation
    const [translateY, setTranslateY] = useState('-100%'); // Start above the viewport

    useEffect(() => {
        // Slide down to 0% (original position)
        const timer = setTimeout(() => {
            setTranslateY('0%');
        }, 200);  // Delay can be adjusted based on desired animation speed

        return () => clearTimeout(timer);
    }, []);

    const modalStyle = {
        position: 'absolute',
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

            <Box sx={modalStyle} ref={ref} src={backgroundProfile}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ top: 10, width: '100%', backgroundColor: '#30302F', padding: '20px 0', marginTop: '-7px' }}>
                    <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'center' }}>
                        PROFILE
                    </div>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-around" gap={20} sx={{position:'absolute' ,zIndex:5, top:40,width: '100%', backgroundColor: '#080401', padding: '7px 0' }}>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'left' }}>
                      HASH POWER:
                  </div>
                  <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'right' }}>
                      0 
                  </div>
              </Box>
              <Box component="img" src={backgroundProfile} alt="Full Width Image" sx={{ width: '100%', height: '80%' }} />

              <Box  sx={{ position: 'absolute', top: 70, width: '60%', justifyContent: 'center', padding: '20px 0px'}}>
                <Box display="flex" flexDirection="column" gap={1} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '7px 0', marginBottom:1  }}>
                        <div className='inter'>
                            USE A COUPON
                        </div>
                        <div style={{ textAlign: 'right', marginRight:'5%', fontSize:'11px' }}>
                        <input
                            type="text"
                            placeholder="INPUT CODE"
                            className="profileb"  
                            style={{maxWidth:'90px'}}
                        />
                        </div>
                        <div className='inter' style={{fontSize:'9px'}}>
                            GET 2% CASHBACK
                        </div>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={1} alignItems="center" justifyContent="center" sx={{ width: '100%', padding: '7px 0', marginBottom:1  }}>
                        <div className='inter' style={{fontSize:'14px'}}>
                        BUY HASH POWER
                        </div>
                        <div style={{ textAlign: 'right', marginRight:'5%', fontSize:'11px' }}>
                        <input
                            type="text"
                            placeholder="TON AMOUNT"
                            className="profileb"  
                            style={{maxWidth:'94px'}}
                        />
                        </div>
                        <div className='inter' style={{fontSize:'10px'}}>
                            MINIMUM 10 TON
                        </div>
                        <button variant="contained" className='claimb' style={{marginLeft:'0%'}} >
                            INVEST
                    </button>
                    </Box>

                </Box>

                <Box sx={{ position: 'absolute', bottom: 180, width: '100%', display: 'flex', justifyContent: 'right' , right:20}}>
                  <img src={ProfileFox}  alt="First Image" style={{ width: '60%',maxWidth:'180px' }}/>
                </Box>

              <Box  sx={{ position: 'absolute', bottom: 15, width: '100%', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '5px 0px'}}>
                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%', padding: '5px 0', marginBottom:1  }}>
                        <div className='inter' style={{ textAlign: 'left' ,marginLeft:'5%'}}>
                            YOUR PROMO CODE
                        </div>
                        <div style={{ textAlign: 'right', marginRight:'5%' }}>
                            <button variant="contained" className='profileb' style={{marginLeft:'0%'}} >
                                    DASH_?????
                            </button>
                        </div>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%', padding: '3px 0' }}>
                        <div className='inter' style={{ textAlign: 'left' ,marginLeft:'5%'}}>
                            TOT REFERRALS
                        </div>
                        <div className='inter' style={{ textAlign: 'right', marginRight:'5%' }}>
                            REWARDS
                        </div>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%', padding: '3px 0', marginBottom:1 }}>
                        <div className='inter' style={{ textAlign: 'left' ,marginLeft:'5%', fontSize:'24px'}}>
                            0
                        </div>
                        <div className='inter' style={{ textAlign: 'right', marginRight:'5%' , fontSize:'24px'}}>
                            0 TON
                        </div>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <button variant="contained" className='claimb' style={{marginLeft:'0%'}} >
                            CLAIM REFERRAL  REWARDS
                    </button>
                  </Box>
                </Box>

                <Box sx={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={line}  alt="First Image" style={{ width: '100%', height:'15px' }}/>
                </Box>
            </Box>
        </>
    );
});

export default ProfilePage;


