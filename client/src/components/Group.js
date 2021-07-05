import React, {useState, useEffect} from 'react'
import useWindowDimensions from './hooks/useWindowDimensions';
import Question from './Question';
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

const useStyles = makeStyles(theme => ({
  title: {
    width:"100%",
    fontSize:"300px"
  },
  resize:{
    fontSize:20
  },
}))

function Group(props){
    const classes = useStyles();
    const {open, handleClose, box, setBox} = props;

    const handleDeleteQues = (num) => {
        let new_box = [...box]
        new_box.splice(num, 1)
        setBox(new_box)
    }

    const handleAdd = () => {
        let new_box = [...box]
        new_box.push({
            title: 'Problem'+(new_box.length+1),  
            type: 'Multiple choice',
            options:[]
        })
        setBox(new_box)
    }

    return(
    <Dialog fullWidth  maxWidth='lg' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="dialog-title">
            <TextField 
                id="standard-search" 
                label="Problem Group Name" 
                type="search" 
                defaultValue="Untitled Group" 
                className={classes.title}
                InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                }}
            />
        </DialogTitle>
        <DialogContent style={{fontSize: 14}}>
          
        <br/>
        {box.map((question, number) => (<Question number={number} box={box} setBox={setBox} key={number} handleDeleteQues={handleDeleteQues}/>))}
        <Button onClick={handleAdd} color="primary">
            <LibraryAddIcon color="primary"/>
        </Button>
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