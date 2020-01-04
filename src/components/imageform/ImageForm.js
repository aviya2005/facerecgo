import React from 'react';

const ImageForm = ({onInputChange, onClick})=>{
    return (
        <div className='tc'>
            <p className='f3'>{'תן ניסיון למוח הקסם לזהות אם יש פנים בתמונה'}</p>
             <div className='center'>
                 <div className='form center tc pa4 br3 shadow-5'>
             <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
             <button className='w-30 grow f4 link ph5 dib white bg-light-purple' onClick={onClick}>בדוק</button>
                 </div>  
             </div>
        </div>
    )
}

export default ImageForm;