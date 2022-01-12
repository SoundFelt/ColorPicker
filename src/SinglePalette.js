import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import {useState} from 'react'
import {Link} from 'react-router-dom'

function SinglePalette(props) {
    const gatherShades = (palette, colorToFilterBy) => {
        let shades = []
        let allColors = props.palette.colors;
        for (let shadeNum in allColors) {
            shades = shades.concat(allColors[shadeNum]).filter(color => color.id === colorToFilterBy)
        }
        return shades.slice(1)
    }

    const [format, setFormat] = useState("hex")
    const changeFormat = (e) => {
        setFormat(e.target.value)
        setSnackbar(true)
    }

    const [snackBarState, setSnackbar] = useState(false)
    const closeSnackbar = () =>{
        setSnackbar(false)
    }

    const colorBoxes = gatherShades(props.palette, props.match.params.colorId).map(color => 
            <ColorBox background={color[format]} name={color.name} key={color.name} useLink={false} />)
    return ( 
        <div className="container">
        <Navbar showSlider={false} changeFormat={changeFormat} format={format} 
                closeSnackbar={closeSnackbar} snackBarState={snackBarState}/>
                
        <div className="single-color-boxes color-boxes-container">
        {colorBoxes}
        <div className="color-box go-back-box">
        <Link className="go-back-link" to=".">Go Back</Link>
        </div>
        </div>

        <PaletteFooter paletteName={props.palette.paletteName} emoji={props.palette.emoji}/>

        </div>
     );
}

export default SinglePalette;