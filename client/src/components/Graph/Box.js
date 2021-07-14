import React, {useState} from 'react'
import Group from './Group';
import { Rnd } from "react-rnd";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Norm from '../Norm';

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: '3px solid lightgreen',
    borderRadius: '10%',
    backgroundColor: 'white'
};

function Box(props){
    const {left, top, idx, boxes, setBoxes, c_id} = props;
    //const { height, width } = useWindowDimensions()
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () =>{
        setOpen(true)
    }

    const onDragStop = (e, d) =>{
        let new_boxes = [...boxes]
        new_boxes[idx].x = d.x
        new_boxes[idx].y = d.y
        if(d.x < 0){
            new_boxes[idx].x = 0
        }
        if(d.y < 0){
            new_boxes[idx].y = 0
        }
        setBoxes(new_boxes)
    }

    const handleDelete = () => {
        let new_boxes = [...boxes]
        const delete_id = new_boxes[idx].id
        new_boxes.splice(idx, 1)
        for(let i = 0; i < new_boxes.length; i++){
            if(new_boxes[i].to === delete_id) new_boxes[i].to = ''
            let problems = new_boxes[i].problems
            for(let j = 0; j < problems.length; j++){
                let tos = problems[j].to
                for(let k = 0; k < tos.length; k++){
                    if(tos[k] === delete_id) new_boxes[i].problems[j].to[k] = ''
                }
            }
        }
        setBoxes(new_boxes)
    }

    return(
    <>
        <Group open={open} handleClose={handleClose} boxes={boxes} setBoxes={setBoxes} idx={idx}/>
        <Rnd
            style={style}
            id={c_id}
            position={{ x: left, y: top}}
            size={{width: 150, height: 90}}
            onDoubleClick={handleOpen}
            onDragStop={(e, d) => {onDragStop(e, d)}}
        >
            {boxes[idx].group_title}
        </Rnd>
        <div style={{position: 'absolute', left: boxes[idx].x+133+Norm.SIDE_BAR_WIDTH, top: boxes[idx].y-8}}
            onClick={handleDelete}>
            <HighlightOffIcon/>
        </div>
    </>
    )
}

export default Box