import React from 'react';

const BoundingBox = ({box})=>{

    const boxes = box.map((box1,i)=>{
        
        return  <div key={i} className='bounding-box' style={{top: box1.topRow, right: box1.rightCol, bottom: box1.bottomRow, left: box1.leftCol }}></div>;
    })
    
    return(
        <div>
                {boxes}
        </div>
    )
}
export default BoundingBox;