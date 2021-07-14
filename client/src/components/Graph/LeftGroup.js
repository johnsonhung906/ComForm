import React from "react";
import LeftBox from "./LeftBox";

function LeftGroup(props){
    const {boxes, setBoxes} = props

    return(
        <div>
            {boxes.map((box, idx) => (
                <LeftBox key={'leftbox-'+idx} idx={idx} boxes={boxes} setBoxes={setBoxes}/>
            ))}
        </div>
    )
}

export default LeftGroup