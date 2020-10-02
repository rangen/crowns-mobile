import React from 'react'   
const Donate = () => {
    return (
        <>
            <h4>Thank you for the support!</h4>
            <h5>(The page will open in a new tab)</h5>
            <button onClick={()=>window.open('https://paypal.me/PileOfCrowns', '_blank')}>
                Donate!
            </button>
        </>
    )
}

export default Donate;
