import React from 'react'   
const Donate = () => {
    return (
        // <>
        //     <h4>Thank you for the support!</h4>
        //     <h5>(The page will open in a new tab)</h5>
        //     <button onClick={()=>window.open('https://paypal.me/PileOfCrowns', '_blank')}>
        //         Donate!
        //     </button>
        // </>
            <>
            <h4>Thank you for the support!</h4>
            <h5>(The page will open in a new tab)</h5>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
<input type="hidden" name="cmd" value="_donations" />
<input type="hidden" name="business" value="LSRXJBQKNQAMA" />
<input type="hidden" name="currency_code" value="USD" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>
</>
    )
}

export default Donate;
