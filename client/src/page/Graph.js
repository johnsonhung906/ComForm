import React, {useState} from 'react'
import useWindowDimensions from '../components/hooks/useWindowDimensions'
import Box from '../components/Graph/Box';
import { makeStyles } from '@material-ui/styles'
import uuid from "uuid";
import Button from '@material-ui/core/Button';
import Lines from '../components/Graph/Lines';
import { useParams } from "react-router";
import Divider from '@material-ui/core/Divider';
import QueueIcon from '@material-ui/icons/Queue';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import LeftGroup from '../components/Graph/LeftGroup';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
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

// const form = 
// {
//     title: 'Test form',
//     id: "23cc87df-8a8b-4519-8083-4fee2529e9d4",
//     startid: "55051dbf-01e3-424a-b689-8f538e72222b",
//     boxes: [
//         {
//             description: "Mark Elliot Zuckerberg (/ˈzʌkərbɜːrɡ/; born May 14, 1984) is an American media magnate, internet entrepreneur, and philanthropist. He is known for co-founding Facebook, Inc. and serves as its chairman, chief executive officer, and controlling shareholder.[2][3] He also is a co-founder of the solar sail spacecraft development project Breakthrough Starshot and serves as one of its board members.[4]",
//             group_title: "Untitled Group 1",
//             hasCon: true,
//             id: "55051dbf-01e3-424a-b689-8f538e72222b",
//             problems: [
//                     {
//                         options: ["aasd", "asdb"],
//                         title: "Problem1",
//                         to: ["", ""],
//                         type: "Multiple choice"
//                     },
//                     {   
//                         options: ["dsadsa", "bdssa"],
//                         title: "Problem2",
//                         to: ["52845bcf-76e4-486b-85f8-e9b7b49175a7", "ed9bd4e0-0767-4003-a7bb-b2162e4e00f8"],
//                         type: "Condition box"
//                     }
//                     ],
//             to: "ed9bd4e0-0767-4003-a7bb-b2162e4e00f8",
//             x: 10,
//             y: 262
//         },
//         {
//             description: "Untitled Group 2",
//             group_title: "Untitled Group 2",
//             hasCon: false,
//             id: "52845bcf-76e4-486b-85f8-e9b7b49175a7",
//             problems: [],
//             to: "1f24d657-1a78-4350-87a7-696516202952",
//             x: 296,
//             y: 121
//         },
//         {
//             description: "Untitled Group 3",
//             group_title: "Untitled Group 3",
//             hasCon: false,
//             id: "ed9bd4e0-0767-4003-a7bb-b2162e4e00f8",
//             problems: [],
//             to: "1f24d657-1a78-4350-87a7-696516202952",
//             x: 283,
//             y: 429
//         },
//         {
//             description: "",
//             group_title: "Untitled Group 4",
//             hasCon: false,
//             id: "1f24d657-1a78-4350-87a7-696516202952",
//             problems: [],
//             to: "end",
//             x: 550,
//             y: 276
//         }
//     ]
// }

function Graph() {
  const { formid } = useParams()
  const classes = useStyles();
  const [alertCycle, setcAlert] = useState(false)
  const [alertUnused, setuAlert] = useState(false)
  const [boxes, setBoxes] = useState([])
  const [title, setTitle] = useState('Untitled form')
  const [onEditTitle, setEditTitle] = useState(false)
  const [startid, setStartid] = useState('')
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
    if(boxes.length === 0){
      setStartid(new_box.id)
    }
    new_boxes.push(new_box)
    setBoxes(new_boxes)
    setX(x+10)
  }

  const handleSave = () => {
    // first check whether this is a valid form 
    // check whether all the boxes have connection
    for(let idx = 0; idx < boxes.length; idx++) {
      if(boxes[idx].hasCon){
        let valid = true
        for (let i = 0; i < boxes[idx].problems.length; i++){
          if(boxes[idx].problems[i].type === "Condition box"){
            for(let j = 0; j < boxes[idx].problems[i].to.length; j++){
              if(boxes[idx].problems[i].to[j] === ""){
                valid = false
                break;
              }
            } 
          }
        }
        if(!valid){
          console.log('error at '+idx)   
        }
      }
      else{
          if(!boxes[idx].to){
            console.log('error at '+idx)   
          }
      }
    }
    // check whether it is a valid box
    // and find the start box
    let visited = {};
    let visit_stack = {};
    const find_box = (id) => {
      for(let i = 0; i < boxes.length; i++){
        if(boxes[i].id === id){
          return boxes[i];
        }
      }
      return {};
    }
    const dfs_visit = (box) => {
      // vertex of boxes
      console.log(visit_stack)
      if(visit_stack[box.id]){
        return false;
      }

      if(visited[box.id]){
        return true;
      }

      visited[box.id] = true;
      visit_stack[box.id] = true;

      if(box.hasCon){
        const ques = box.problems.filter(prob => prob.type === 'Condition box')
        const tos = ques[0].to
        for(let i = 0; i < tos.length; i++){
          if(!dfs_visit(find_box(tos[i]))){
            return false
          }
        }
      }
      else{
        if(box.to !== 'end' && !dfs_visit(find_box(box.to))){
          return false
        }
      }

      visit_stack[box.id] = false
      return true
    }

    const acyclic = (boxes) => {
      if(!dfs_visit(find_box(startid))){
        setcAlert(true)
        return false;
      }
      if(boxes.length !== Object.keys(visited).length){
        setuAlert(true)
        return false;
      }
      return true;
    }

    // save the form 
    if(acyclic(boxes)){
      const form = {
        title,
        id:uuid.v4(),
        startid,
        boxes
      }
      console.log(form)
    }
  }

  return (
    <>
      <div className={classes.topbar}>
        <div style={{float: "left", color: "gray", fontSize:"sans-serif"}}>
        &nbsp;&nbsp;&nbsp;My workSpace&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        </div>
        {onEditTitle? 
          <div style={{float: "left"}}>
            <label>
              <input type="text" value={title} onChange={(e)=>(setTitle(e.target.value))} onBlur={() => (setEditTitle(false))}/>
            </label>
          </div>:
          <div style={{float: "left"}} onClick={() => (setEditTitle(true))}>
            {title}
          </div>}
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
                  onClick={handleSave}
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
        <Collapse in={alertCycle}>
          <Alert 
            severity="error" 
            onClose={() => (setcAlert(false))}
          >there is a cycle in this graph/there is no end
          </Alert>
        </Collapse>
        <Collapse in={alertUnused}>
          <Alert 
            severity="error" 
            onClose={() => (setuAlert(false))}
          >some of the boxes are unused
          </Alert>
        </Collapse>
        {boxes.map((box, idx) => (<Box left={box.x} top={box.y} 
                                  idx={idx} 
                                  boxes={boxes} 
                                  setBoxes={setBoxes} 
                                  key = {'box'+idx}
                                  c_id = {box.id}
                                  startid={startid}
                                  setStartid={setStartid}
                                />))}
        <Copyright/>
      </div>
      </div>
    </>
  );
}

export default Graph;
