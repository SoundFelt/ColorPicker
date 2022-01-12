import './Navbar.css'
import {Link} from 'react-router-dom'
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Navbar(props) {
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <Link to='/'>ReactColorPicker</Link>
                    </div>
                    {props.showSlider &&
                    <div className="slider-container">
                        <div>
                            <span className="slider-level" href="#!">Level {props.level} </span>
                        </div>
                        <div>
                        <Slider onChange={props.changeLevel} value={props.level} size="small" 
                            step={100} min={100} max={900}/>
                        </div>
                    </div> 
                    }
                    
                    <div className="select-container">
                        <Select className="select" onChange={props.changeFormat} value={props.format}>
                            <MenuItem value="hex">Hex - #f9f9f9</MenuItem>
                            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                        </Select>
                    </div>

                    <div className="snackbar-container">
                        <Snackbar open={props.snackBarState} message="Format changed!" onClose={props.closeSnackbar} 
                                autoHideDuration={2000} action={[
                            <IconButton onClick={props.closeSnackbar}>
                                <CloseIcon/>
                            </IconButton>
                            ]}/>
                    </div>
            </nav>
        </div>
    )
}

export default Navbar