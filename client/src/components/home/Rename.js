import React from 'react'
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
  resize:{
    fontSize:20
  },
}))

function Rename(props){
    const classes = useStyles();
    const {open, setOpen, idx, forms, handleRename} = props;
    //has condition box or not
    const handleClose = () => {
        setOpen(false)
    }

    const changeTitle = (e) =>{
        let new_forms = [...forms]
        new_forms[idx].title = e.target.value
        handleRename(new_forms)
    }

    const changeDescription = (e) =>{
        let new_forms = [...forms]
        new_forms[idx].description = e.target.value
        handleRename(new_forms)
    }

    if(idx < 0){
        return(<div/>)
    }
    return(
    <Dialog fullWidth  maxWidth='lg' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="dialog-title">
            <TextField 
                id="standard-search" 
                label="Form Title" 
                type="search" 
                value = {forms[idx].title}
                className={classes.title}
                InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                }}
                onChange={changeTitle}
            />
            <TextField 
                id="standard-description" 
                label="Form Description" 
                value = {forms[idx].description}
                className={classes.description}
                onChange={changeDescription}
            />
        </DialogTitle>
        
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default Rename