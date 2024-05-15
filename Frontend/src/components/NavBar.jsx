import React, { useState } from 'react';
import Login from './Login'; // Assuming you have a Login component

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const theme = LightOceanTheme; // Using the default light theme

  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
        {/* Logo on the top left */}
        <div className='flex items-center h-12'> {/* Set a specific height for the container */}
      <img 
        src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" 
        alt="Help Desk Logo" 
        className="h-full w-auto"  // Set the height to 100% of its container
        style={{ objectFit: 'contain' }} // Ensures the image fits within its container
      /> 
    </div>
    <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
      Event <span className='font-bold'>Booking</span>
    </h1>

        {/* Login/Signup Button on the Very Right */}
        <div className='flex items-center'>
          <Login theme={theme} /> {/* Pass the theme as a prop to the Login component */}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
