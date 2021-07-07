import React, {useState, useEffect} from 'react'
import useWindowDimensions from './hooks/useWindowDimensions';
import { makeStyles } from '@material-ui/styles'
import Group from './Group';
import { Rnd } from "react-rnd";
import instance from '../axios';

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
        setBoxes(new_boxes)
    }

    return(
    <>
        <Group open={open} handleClose={handleClose} boxes={boxes} setBoxes={setBoxes} idx={idx}/>
        <Rnd
            style={style}
            id={c_id}
            default={{
                x: left,
                y: top,
                width: 150,
                height: 90
            }}
            onDoubleClick={handleOpen}
            onDragStop={(e, d) => {onDragStop(e, d)}}
        >
            {boxes[idx].group_title}
        </Rnd>
    </>
    )
}

export default Box