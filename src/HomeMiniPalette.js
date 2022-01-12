import './HomeMiniPalette.css'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

function HomeMiniPalette(props) {
    const {paletteName, emoji, colors, id} = props.palette

    console.log(paletteName)

    const prepareDelete = (e) => {
        e.stopPropagation();
        props.toggleDialog()
        props.setId(id)
    }

    return ( 
        <div className="palette-container" onClick={() => props.goToPalette(id)}> 
        <DeleteIcon onClick={prepareDelete} className="palette-delete" style={{transition: 'all 0.3s ease'}}/>
            <div className="palette-colors">
            {colors.map(color => <div className="palette-color" key={color.color} 
                style={{backgroundColor: color.color}}></div>)}
            </div>

            <div className="palette-info">
                 <h2>{paletteName}</h2>
                 <span>{emoji}</span>
            </div>
        </div>
     );
}

export default React.memo(HomeMiniPalette, () => true);