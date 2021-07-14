import React, {useState} from 'react'
import Group from './Group'

const boxstyle = {
    border: "2px solid darkgrey", 
    borderRadius: "8%",
    width:"80%", 
    marginLeft:"10%", 
    marginTop:"20px", 
    height:"80px", 
    overflow:"auto",
    textAlign: 'center',
    color: "green"
}

function LeftBox(props){
    const {boxes, setBoxes, idx} = props
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () =>{
        setOpen(true)
    }

    return (
        <>
            <Group open={open} handleClose={handleClose} boxes={boxes} setBoxes={setBoxes} idx={idx}/>
            <div style={boxstyle} onClick={handleOpen}>
                <p style={{top:"20px"}}>{boxes[idx].group_title}</p>
            </div>
        </>
    )
}

export default LeftBox