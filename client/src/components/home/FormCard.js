import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ClickAwayListener } from '@material-ui/core';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';
import bluegreen from '../bgpic/bluegreen.jpeg';
// import darkblue from './bgpic/darkblue.jpeg';
// import orangeyellow from './bgpic/orangeyellow.jpeg';
// import greyyellow from './bgpic/greyyellow.jpeg';
// import orangered from './bgpic/orangered.jpeg';
// import darkpurple from './bgpic/darkpurple.jpeg';
// import lightblue from './bgpic/lightblue.jpeg';
// import greywhite from './bgpic/greywhite.jpeg';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#f6f7f7',
    width: 120
  },
  root: {
    width: 250,
    height: 300,
    border: "1px solid lightgrey",
  },
  media: {
      height: 130,
  },
  
}));

// const colors = [bluegreen, greyyellow, darkblue, orangered, darkpurple, lightblue, greywhite]
const colors = [bluegreen]

function FormCard(props) {
  const classes = useStyles();
  const {form, idx, handleRename, handleDelete} = props
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true)
  };

  const clickAwayHandler = (event) => {
    setIsOpen(false)
  };

  return(
  <Box m={2} pt={3} style={{float: "left"}}>
    <Card className={classes.root}>
        <CardActionArea component={Link} to={'/edit/'+form._id}>
        <CardMedia
          component="img"
          className={classes.media}
          image={colors[idx%colors.length]}
        />
        <CardContent style={{ height: "90px"}}>
            <Typography gutterBottom variant="h5" component="h2">
            {form.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {form.description.length >= 100? form.description.slice(0, 100): form.description} 
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions style={{ bottom: "0px"}}>
        <Typography style={{color:"darkgrey", fontSize: "12px", width:"240px"}} component="p">
            Opened Jul 5, 2021
        </Typography>
        
          <Button style={{color: "lightseagreen"}} size="small" onClick={handleClick}>
            <MoreVertIcon/>
          </Button>
        
          {isOpen && 
          <Popper id='simple-popper' open={isOpen} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={clickAwayHandler}>
              <div className={classes.paper}>
                <Button style={{textTransform: 'none', color: "lightseagreen", width: "100%"}} 
                        size="large"
                        onClick={() => handleRename(idx)}
                        startIcon={<TextFieldsIcon/> }
                >
                  Rename
                </Button>
                <Divider/>
                <Button style={{textTransform: 'none', color: "lightseagreen", width: "100%", align: "left"}}  
                        onClick={() => handleDelete(idx)}
                        startIcon={<DeleteIcon/>}
                >
                  Delete
                </Button>
              </div>
            </ClickAwayListener>
          </Popper>}
        </CardActions>
    </Card>
  </Box>)
}

export default FormCard