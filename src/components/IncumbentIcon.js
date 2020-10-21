import React, { useState } from 'react'
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';

const IncumbentIcon = () => {
    const [isOpen, setIsOpen] = useState(true);

    setTimeout(()=>setIsOpen(false), 3000);

    return (
        <Tooltip 
            title='Incumbent'
            open={isOpen}
            arrow
            placement='top'
            >
            <StarIcon style={{color: '#ffc107'}}/>
        </Tooltip>
    )
}

export default IncumbentIcon
