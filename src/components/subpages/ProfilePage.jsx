import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

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
        height: '75%',
        bgcolor: 'white',
        margin: 0,
        outline: 'none',
        transform: `scale(${scale})`, // Use state variable for dynamic scaling
        transition: 'transform 200ms ease-out',  // Smooth scale transition
    };

    return (
        <>
            <Box sx={modalStyle} ref={ref}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ width: '100%', backgroundColor: '#30302F', padding: '15px 0', marginTop: '-7px' }}>
                    <div variant="body2" className='inter' sx={{ flexGrow: 1, textAlign: 'center' }}>
                        PROFILE
                    </div>
                </Box>
                <Typography variant="h6">
                    Profile Details
                </Typography>
            </Box>
        </>
    );
});

export default ProfilePage;


