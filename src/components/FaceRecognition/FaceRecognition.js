import React from 'react';
import BoundingBox from '../boundingbox/BoundingBox'

const FaceRecognition = ({box, imageUrl}) =>{
return(
    <div className='center ma'>
        <div className='absolute mt2'>
            <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
            <BoundingBox box={box}/>
        </div>
    </div>
)
}

export default FaceRecognition;