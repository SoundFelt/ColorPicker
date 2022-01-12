import {useState} from 'react';
import NewPaletteSaveData from './NewPaletteSaveData'
import {Link} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 350;

const DrawerAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

function NewPaletteNav(props) {

    const [openForm, setForm] = useState(false)
    const handleOpenForm = () => {
      setForm(true)
    }
    const handleFormClose = () => {
      setForm(false)
    }

    return (  
        <div>
        <DrawerAppBar position="fixed" open={props.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(props.open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          
          <Typography style={{display: 'flex', flex: '1'}} variant="h6" noWrap component="div">
            Create Your Palette
          </Typography>
          
          <Button onClick={handleOpenForm} style={{height: "40px", margin: 'auto'}} 
          variant="contained" color="secondary">Save Palette</Button>

          {openForm && <NewPaletteSaveData hideDialog={handleFormClose} openForm={openForm}
          palettes={props.palettes} handleSavePalette={props.handleSavePalette}/>}

          <Link style={{textDecoration: 'none', color: 'white', marginLeft: '10px'}} to='/'>
          <Button style={{height: "40px"}} variant="contained" color="error">Go Back</Button>
          </Link>

        </Toolbar>
      </DrawerAppBar>
        </div>
    );
}

export default NewPaletteNav;