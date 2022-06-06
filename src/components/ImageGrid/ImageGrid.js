import React from 'react';
import './ImageGrid.css';

const ImageGrid = (props) => {
const Images = props.itemData.map((item) => {
    return <div><img src={`${item.img}`} alt={item.title}/></div>
})
return (
    <div className='image-grid'>
     {Images}
    </div>
  )
}

export default ImageGrid
