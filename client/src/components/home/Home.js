import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import FormCard from './FormCard';
import addpic from '../bgpic/addpic.png';
import Rename from './Rename'

let ini_forms = [
{
    title: 'Hello world',
    description: 'This is a test form for all the college students',
    _id: '12345'
},
{
    title: 'Hello world',
    description: 'This is a test form for all the college students',
    _id: '12345'
},
{
    title: 'Hello world',
    description: 'This is a test form for all the college students',
    _id: '12345'
},
{
    title: 'Hello world',
    description: 'This is a test form for all the college students',
    _id: '12345'
},
{
    title: 'Hello world',
    description: 'This is a test form for all the college students',
    _id: '12345'
},
{
    title: 'Hello world',
    description: 'This is a test form for all the college students',
    _id: '12345'
},
{
    title: 'Hello world',
    description: 'This is a test form forfdgf dgfsa sdf sdf dsf  sdf  sdf sdf sd ds w dg s aqr fewwerw rerxc dfds f dsa dsadasd sads adasdas dasdasdsdds adsdsdasgdfgfdgf gdfgfdgdfg all the college students heffwe fekw sdjf josdf jopdsf dkjfd sjfodsf pojfsd ',
    _id: '12345'
},
]

const useStyles = makeStyles({
    root: {
        width: 250,
        height: 300,
        border: "1px solid lightgrey",
    },
    addmedia: {
        height: 300,
    }
});

function Home(props){
    const [forms, setForms] = useState(ini_forms)
    const [opRename, setOpen] = useState(false)
    const [renameIdx, setIdx] = useState(-1)
    const classes = useStyles();

    const handleAdd = () => {
        let new_forms = [...forms]
        new_forms.push({
            title: 'Hello world',
            description: 'This is a test form for all the college students',
            _id: '12345'
        })
        setForms(new_forms)
    }

    const handleORename = (idx) =>{
        setOpen(true)
        setIdx(idx)
    }

    const handleRename = (newforms) => {
        setForms(newforms)
    }
  
    const handleDelete= (idx) =>{
        let new_forms = [...forms]
        new_forms.splice(idx, 1)
        setForms(new_forms)
    }

    return (
        <>
        <div style={{height: "50px"}}>
            
        </div>
        <Divider/>
        <Rename open={opRename} setOpen={setOpen} idx={renameIdx} forms={forms} handleRename={handleRename}/>
        <div style={{left: "5%", top: "100px", position: "absolute", width: "95%"}}>
            <Typography variant='h5' color="textSecondary" component="p">&nbsp;&nbsp;My WorkSpace</Typography>
            <br/>
            <Divider style={{width: "90%"}}/>
            {forms.map((form, idx) => 
                <FormCard key={"cards"+idx} form={form} idx={idx}
                handleRename={handleORename}
                handleDelete={handleDelete}/>
            )}
            <Box key={"cards"} m={2} pt={3} style={{float: "left"}} onClick={handleAdd}>
                <Card className={classes.root}>
                    <CardActionArea >
                    <CardMedia
                        component="img"
                        className={classes.addmedia}
                        src={addpic}
                    />
                    </CardActionArea>
                </Card>
            </Box>
        </div>
        </>
      
    );
}

export default Home