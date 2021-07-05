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
    border: '2px solid black',
    borderRadius: '10%',
    backgroundColor: 'white', 
    background: "#f0f0f0"
};

function Box(props){
    const {left, top} = props;
    //const { height, width } = useWindowDimensions()
    const [box, setBox] = useState([])
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        console.log(box)
    }

    const handleOpen = () =>{
        setOpen(true)
    }

    return(
    <>
        <Group open={open} handleClose={handleClose} box={box} setBox={setBox}/>
        <Rnd
            style={style}
            default={{
                x: left,
                y: top,
                width: 150,
                height: 90
            }}
            onDoubleClick={handleOpen}
        >
        </Rnd>
    </>
    )
}

export default Box