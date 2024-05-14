import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import backgroundProfile from '../../media/bg/bgprofile.png'
import line from '../../media/bg/line.png'

const ProfilePage = React.forwardRef((props, ref) => {
    // State to manage scale transformation
    const [scale, setScale] = useState(0.2);  // Start with the modal scaled down

    useEffect(() => {
        // First, scale up slightly to 1.2
        setScale(1.2);

        const timer = setTimeout(() => {
            setScale(1);
        }, 200); 

        return () => clearTimeout(timer);
    }, []);

    const modalStyle = {
        position: 'absolute',
        top: 70,
        width: "100%",
        height: '80%',
        bgcolor: 'white',
        margin: 0,
        outline: 'none',
        transform: `scale(${scale})`, // Use state variable for dynamic scaling
        transition: 'transform 200ms ease-out',  // Smooth scale transition
    };

    return (
        <>

            <Box sx={modalStyle} ref={ref} src={backgroundProfile}>
            <Box sx={{ position: 'absolute', top: -12, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={line}  alt="First Image" style={{ width: '100%', height:'15px' }}/>
                </Box>
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

             

              <Box gap={3} sx={{ position: 'absolute', bottom: 15, width: '100%', display: 'flex', justifyContent: 'center' , backgroundColor: '#1B1B1B', padding: '20px 0px'}}>
              <button variant="contained" className='claimb' style={{marginLeft:'0%'}} >
                    CLAIM
                  </button>
                </Box>

                <Box sx={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                  <img src={line}  alt="First Image" style={{ width: '100%', height:'15px' }}/>
                </Box>
            </Box>
        </>
    );
});

export default ProfilePage;


