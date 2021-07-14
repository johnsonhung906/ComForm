import React, {useState} from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'
import Box from './Box';
import { makeStyles } from '@material-ui/styles'
import uuid from "uuid";
import Button from '@material-ui/core/Button';
import Lines from './Lines';
import { useParams } from "react-router";
import Divider from '@material-ui/core/Divider';
import QueueIcon from '@material-ui/icons/Queue';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import LeftGroup from './LeftGroup';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Norm from '../Norm';
// import instance from '../axios';

const useStyles = makeStyles(theme => ({
  topbar:{
    height: '50px',
    lineHeight: '50px'
  },
  root: {
    position: 'absolute', 
    width: '100%', 
    overflow: 'hidden', 
    backgroundColor: 'white'
  },
  addblock:{
    left: '30px',
    width: "150px"
  }
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{right:"10px", position:"absolute", bottom:"10px"}}>
      {'Copyright © '}
        ComForm
      {' '+new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Graph() {
  const { formid } = useParams()
  const classes = useStyles();
  // const {width, height} = useWindowDimensions()
  // const initial_box = [{id:uuid.v4() , 
  //                       x:100, y:height/2, 
  //                       hasCon:false, 
  //                       group_title: 'Untitled Group 1', 
  //                       problems: [],
  //                       to: ''
  // }]
  const [boxes, setBoxes] = useState([])
  const [title, setTitle] = useState('Untitled form')
  const {width, height} = useWindowDimensions()
  const [x, setX] = useState(10)

  const handleAdd = () => {
    // to in box is for boxes without condition box
    const new_box = { id:uuid.v4(), 
                      x:x, y:height/3, 
                      group_title:'Untitled Group '+(boxes.length+1), 
                      description: '',
                      problems:[],
                      hasCon: false,
                      to: ''
                    }
    let new_boxes = [...boxes]
    new_boxes.push(new_box)
    setBoxes(new_boxes)
    setX(x+10)
  }

  return (
    <>
      <div className={classes.topbar}>
        <div style={{float: "left", color: "gray", fontSize:"sans-serif"}}>
        &nbsp;&nbsp;&nbsp;My workSpace&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        </div>
        <div style={{float: "left"}}>
          {title}
        </div>
        {/* <div style={{float: "right"}}>
            Johnson&nbsp;&nbsp;&nbsp;
        </div> */}
        <div style={{float: "right"}}>
          <Button style={{backgroundColor:"ForestGreen", color:"white"}}>
            Publish
          </Button>
          &nbsp;&nbsp;&nbsp;
        </div>
        <div style={{float: "right", color: "grey"}}>
          <Button style={{textTransform: 'none', color: "grey"}}
                  startIcon={ <VisibilityOutlinedIcon style={{color: "grey"}}/>}
          >
            preview
          </Button>
          &nbsp;&nbsp;&nbsp;
        </div>
      </div>
      <Divider/>
      <div className={classes.root} style={{top:Norm.TOP_BAR_HEIGHT ,height: height-Norm.TOP_BAR_HEIGHT}}>
        <div style={{width:Norm.SIDE_BAR_WIDTH,height: height-Norm.TOP_BAR_HEIGHT, borderRight: "1px solid lightgrey", float:"left", overflow: 'auto'}}>
          <br/>
          <Button variant="contained"
                  color="primary"
                  className={classes.addblock}
                  startIcon={<SaveIcon/>}
          >
            Save form
          </Button>
          <br/><br/>
          <Button variant="contained"
                  onClick={handleAdd} 
                  className={classes.addblock}
                  startIcon={<QueueIcon/>}
          >
          add block
          </Button>
          <br/><br/><Divider/><br/>
          <div style={{color:"grey"}}>
            &nbsp;&nbsp;Boxes
          </div>
          <LeftGroup boxes={boxes} setBoxes={setBoxes}/> 
        </div>
        <Lines boxes={boxes}/>
        <div style={{width:width-Norm.SIDE_BAR_WIDTH, height: height-Norm.TOP_BAR_HEIGHT, marginLeft: Norm.SIDE_BAR_WIDTH}}>
          {boxes.map((box, idx) => (<Box left={box.x} top={box.y} 
                                    idx={idx} 
                                    boxes={boxes} 
                                    setBoxes={setBoxes} 
                                    key = {'box'+idx}
                                    c_id = {box.id}
                                  />))}
          <Copyright/>
        </div>
      </div>
    </>
  );
}

export default Graph;
