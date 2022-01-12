import DraggableColorBox from './DraggableColorBox'
import {SortableContainer} from 'react-sortable-hoc'

const DraggableColorBoxList = SortableContainer((props) => {
    return (  
        <div style={{height: "100%"}}>
        {props.colors.map((color, i) => {
            return <DraggableColorBox deleteNewColor={props.deleteNewColor} key={color.name} 
                  color={color.color} name={color.name} index={i}/>
        })}
        </div>
    );
})

export default DraggableColorBoxList;