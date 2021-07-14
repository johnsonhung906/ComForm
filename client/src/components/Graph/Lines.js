import React from 'react'
import Line from './Line'
// Line <from to/>

function ConMatch({box, k}){
    for(let i = 0; i < box.problems.length; i++){
        if(box.problems[i].type === 'Condition box'){
            return(
                <>
                    {box.problems[i].to.map((to, idx) => (
                        (to && box.id) ?
                        <Line from={box.id} to={to} key={k+'-'+idx}/>:
                        ""
                    ))}
                </>
            )
        }
    }
}


function Connect({box, k}){
    return(
        <>
            {box.hasCon ? <div><ConMatch box={box} key={k}/></div>:
                <div>{(box.to && box.id) ? <Line from={box.id} to={box.to} k={k}/>: ""}</div>
            }
        </>  
    )
}

function Lines(props){
    const {boxes} = props
    return(
        <>
            {boxes.map((box, id)=>(<Connect box={box} k={'connect'+id} key={'connect'+id}/>))}
        </>
    )
}

export default Lines