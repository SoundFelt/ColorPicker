import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import {SortableElement} from 'react-sortable-hoc'
import chroma from 'chroma-js'

const useStyles = makeStyles({
    newColorBox: {
        width: "20%",
        height: "25%",
        display: "inline-block",
        verticalAlign: "top",
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.2)'
        },
        "@media (max-width: 992px)" : {
            width: "25%",
            height: "20%",
        },
        "@media (max-width: 576px)" : {
            width: "100%",
            height: "10%",
        }
    },
    textContainer: {
        display: 'flex', 
        height: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end'
    },
    colorTitle: {
        textTransform: 'uppercase',
        padding: '5px 5px',
        color: props => chroma.contrast(props.color, "white") <= 4.5 ? "black" : "white",
        fontSize: '70%'
    },
    deleteIcon: {
        marginBottom: '3px',
        fontSize: '1.3rem',
        transition: 'all 0.15s ease-in-out',
        cursor: 'pointer'
    }
})

const DraggableColorBox = SortableElement((props) => {
    const classes = useStyles(props)
    return (  
        <div className={classes.newColorBox} style={{backgroundColor: props.color}}>
            <div className={classes.textContainer}>
            <span className={classes.colorTitle}>{props.name}</span>
            <DeleteIcon onClick={() => props.deleteNewColor(props.name)} className={classes.deleteIcon}/>
            </div>
        </div>
    );
})

export default DraggableColorBox;