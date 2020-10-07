import React from 'react';
import { Button } from '@material-ui/core';
import venmo from '../icons/venmo.svg';

const Donate = () => {
    return (    
        <>
            <h4>Thank you for the support!</h4>
            <h5>(Links open in new tab)</h5>
            <Button startIcon={<img alt='PayPal Logo' src='https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png'></img>} variant='contained' color='primary' onClick={()=>window.open('https://paypal.me/PileOfCrowns', '_blank')} />
            <br/>
            
            <Button startIcon={<img alt='Venmo Logo' src={venmo}></img>} variant='contained' onClick={()=>window.open('https://venmo.com/PileOfCrowns', '_blank')}/>
        </>
        )
}

export default Donate;
   