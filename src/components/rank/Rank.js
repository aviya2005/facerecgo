import React from 'react';

const Rank = ({name, entries})=>{
    return (
        <div className='tc'>
            <div className='f3 white'>{`${name} מספר זיהוי התמונות שלך הוא...`}</div>
            <div className='f1 white'>{`#${entries}`}</div>
            
            
        </div>
    )
}

export default Rank;