import React from 'react';
import './Navbar.css';

const Navbar = ({onRouteChange, isSignedIn}) =>{
    if(isSignedIn){  return (
        <nav className='nav'>
                <p onClick={()=> onRouteChange('signin')}className='f3 link dim black underline pa3 pointer white'>יציאה</p>
            </nav>
    )}
     else {return (
        <nav className='nav'>
                <p onClick={()=> onRouteChange('signin')}className='f3 link dim black underline pa3 pointer white'>כניסה</p>
                <p onClick={()=> onRouteChange('register')}className='f3 link dim black underline pa3 pointer white'>הרשמה</p>
            </nav>
    )}
        
    
}
export default Navbar;
