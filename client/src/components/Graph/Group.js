import React from 'react'
import Question from './Question';
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  title: {
    width:"30%",
    fontSize:"300px"
  },
  description:{
    width:"90%",
    fontSize:"300px",
    marginTop: "10px"
  },
  button:{
    top: "15px", 
    marginLeft:"20px"
  },
  resize:{
    fontSize:20
  },
}))

function Group(props){
    const classes = useStyles();
    const {open, handleClose, boxes, setBoxes, idx, setStartid} = props;
    //has condition box or not

    const handleDeleteQues = (num) => {
        let new_boxes = [...boxes]
        if(new_boxes[idx].problems[num].type === 'Condition box'){
            new_boxes[idx].hasCon = false
        }
        new_boxes[idx].problems.splice(num, 1)
        setBoxes(new_boxes)
    }

    const handleAdd = () => {
        let new_boxes = [...boxes]
        new_boxes[idx].problems.push({
            title: 'Problem'+(new_boxes[idx].problems.length+1),  
            type: 'Multiple choice',
            options:[],
            to:[]
        })
        setBoxes(new_boxes)
    }

    const changeGroupTitle = (e) =>{
        let new_boxes = [...boxes]
        new_boxes[idx].group_title = e.target.value
        setBoxes(new_boxes)
    }

    const Find_GroupName = (id) => {
        for (let i = 0; i < boxes.length; i++){
            if (boxes[i].id === id) {
                return boxes[i].group_title
            }
        }
    }

    const handleChangeTo = (e) =>{
        let new_boxes = [...boxes]
        new_boxes[idx].to = e.target.value
        setBoxes(new_boxes)
    }

    const changeDescription = (e) =>{
        let new_boxes = [...boxes]
        new_boxes[idx].description = e.target.value
        setBoxes(new_boxes)
    }

    return(
    <Dialog fullWidth  maxWidth='lg' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="dialog-title">
            <TextField 
                id="standard-search" 
                label="Problem Group Name" 
                type="search" 
                value = {boxes[idx].group_title}
                className={classes.title}
                InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                }}
                onChange={changeGroupTitle}
            />
            <Button 
                variant="outlined" 
                onClick={() => setStartid(boxes[idx].id)}
                className={classes.button}
                color="secondary"
                size="small"
            >set to start problem</Button>
            <TextField 
                id="standard-description" 
                label="Group Description" 
                multiline
                value = {boxes[idx].description}
                className={classes.description}
                onChange={changeDescription}
            />
        </DialogTitle>
        <DialogContent style={{fontSize: 14}}>
        <br/>
        {boxes[idx].problems.map((question, number) => 
            (<Question  number={number} 
                        boxes={boxes} 
                        setBoxes={setBoxes} 
                        key={number} 
                        handleDeleteQues={handleDeleteQues} 
                        idx={idx}
            />))}
        <div style={{float: "left"}}>
            <Button onClick={handleAdd} color="primary">
                <LibraryAddIcon color="primary"/>
            </Button>
        </div>
        {boxes[idx].hasCon? "": 
            <div style={{float: "left"}}>
                <div style={{float: "left", marginTop:"5px", marginLeft: "10px"}}>
                    <ArrowForwardIcon color="primary"/>
                </div>
                <Select
                    labelId="demo-simple-select-label"
                    id='select' 
                    value={boxes[idx].to}
                    onChange={(e) => handleChangeTo(e)}
                >
                    {boxes.map((box, key) => (
                        key === idx ? "":
                        <MenuItem key={'to'+'-'+key} value={box.id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginLeft:'10px'}}>{Find_GroupName(box.id)}</div>
                            </div>
                        </MenuItem>
                    ))}   
                    <MenuItem key={'to'+'-'+'end'} value={'end'}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginLeft:'10px'}}>end</div>
                        </div>
                    </MenuItem>
                </Select>
            </div>
        }
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Save
            </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
    )
}

export default Group