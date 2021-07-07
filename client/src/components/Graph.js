import React, {useState, useEffect} from 'react'
import useWindowDimensions from './hooks/useWindowDimensions';
import Box from './Box';
import { makeStyles } from '@material-ui/styles'
import uuid from "uuid";
import Button from '@material-ui/core/Button';
import Lines from './Lines';
import instance from '../axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '95%', 
    position: 'absolute', 
    top: '5%', 
    width: '100%', 
    overflow: 'hidden', 
    backgroundColor: '#f8f5f5'
  }
}))


function Graph() {
  const classes = useStyles();
  const {width, height} = useWindowDimensions()
  const initial_box = [{id:uuid.v4() , 
                        x:100, y:height/2, 
                        hasCon:false, 
                        group_title: 'Untitled Group 1', 
                        problems: [],
                        to: ''
  }]
  const [boxes, setBoxes] = useState(initial_box)
  //const {width, height} = useWindowDimensions()

  const handleAdd = () => {
    // to in box is for boxes without condition box
    const new_box = { id:uuid.v4(), 
                      x:100, y:100, 
                      group_title:'Untitled Group '+(boxes.length+1), 
                      problems:[],
                      hasCon: false,
                      to: ''
                    }
    let new_boxes = [...boxes]
    new_boxes.push(new_box)
    console.log(new_boxes)
    setBoxes(new_boxes)
  }

  return (
    <>
      <Lines boxes={boxes}/>
      <Button variant="outlined" color="primary" onClick={handleAdd}>
        add block
      </Button>
      <div className={classes.root}>
        {boxes.map((box, idx) => (<Box left={box.x} top={box.y} 
                                  idx={idx} 
                                  boxes={boxes} 
                                  setBoxes={setBoxes} 
                                  key = {'box'+idx}
                                  c_id = {box.id}
                                />))}
      </div>
    </>
  );
}

export default Graph;
