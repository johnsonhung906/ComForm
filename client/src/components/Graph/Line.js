import React from 'react'
import Arrow, { DIRECTION, HEAD} from 'react-arrows'


function Line(props){
    const {from, to} = props

    // translation of the curve is just the Slope of that point
    // and by this four parameters we can get the deg = 3 formula f(x) 
    // then we can just plot it out btn two points 
    return(
    <div>
        <Arrow
        className='arrow'
        from={{
            direction: DIRECTION.RIGHT,
            node: () => document.getElementById(from),
            translation: [0.6, 0],
        }}
        to={{
            direction: DIRECTION.LEFT,
            node: () => document.getElementById(to),
            translation: [-0.6, 0],
        }}
        head = {HEAD.NORMAL}
        />
    </div>
    )
}

export default Line