import {useState} from 'react';
import {Link} from 'react-router-dom'
import './Home.css'
import HomeMiniPalette from './HomeMiniPalette'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function Home(props) {
    const goToPalette = (id) => {
        props.history.push(`/palette/${id}`)
    }

    const [deleteDialogOpen, setDeleteDialog] = useState(false)
    const toggleDialog = () => {
        setDeleteDialog(!deleteDialogOpen)
    }

    const [paletteId, setPaletteId] = useState('')
    const setId = (id) => {
        setPaletteId(id)
    }

    const handleDelete = () => {
       props.deletePalette(paletteId)
       toggleDialog()
    }

    return ( 
        <div className="container">
            <div className="list-container">

                <div className="header">
                <h1>React Colors</h1>
                <Link to="/palette/new">Create Palette</Link>
                </div>

                <TransitionGroup className="palettes">
                {props.palettes.map(palette => (
                   <CSSTransition classNames="fade" timeout={800} key={palette.id}> 
                   <HomeMiniPalette key={palette.id} palette={palette} goToPalette={goToPalette} 
                       toggleDialog={toggleDialog} setId={setId} /> 
                    </CSSTransition> ))}
                </TransitionGroup>

            </div>

            <Dialog open={deleteDialogOpen} onClose={toggleDialog}>
            <DialogTitle>Delete This Palette?</DialogTitle>
            <List>
                <ListItem onClick={handleDelete}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: "teal", color: 'white'}}><CheckIcon/></Avatar>
                         </ListItemAvatar>
                    <ListItemText>Delete</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem onClick={toggleDialog}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: "darkred", color: 'white'}}><CloseIcon/></Avatar>
                         </ListItemAvatar>
                    <ListItemText>Cancel</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            </Dialog>
        </div>
     );
}

export default Home;