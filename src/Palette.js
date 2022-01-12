import {useState} from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import './Palette.css'

function Palette(props) {
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState("hex")
    const [snackBarState, setSnackbar] = useState(false)

    const changeLevel = (e) => {
        setLevel(e.target.value)
    }

    const changeFormat = (e) => {
        setFormat(e.target.value)
        setSnackbar(true)
    }

    const closeSnackbar = () =>{
        setSnackbar(false)
    }

    const colorBox = props.palette.colors[level].map(
        color => <ColorBox key={color.id} background={color[format]} name={color.name} useLink={true}
                            moreUrl={`/palette/${props.palette.id}/${color.id}`} /> 
    )
    return (
        <div className="container">

            <Navbar changeLevel={changeLevel} level={level} 
                    changeFormat={changeFormat} format={format} 
                    closeSnackbar={closeSnackbar} snackBarState={snackBarState}
                    showSlider={true}/>

            <div className="color-boxes-container">
                {colorBox}
            </div>

            <PaletteFooter paletteName={props.palette.paletteName} emoji={props.palette.emoji}/>
        </div>
    )
}

export default Palette