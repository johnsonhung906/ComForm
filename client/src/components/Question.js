import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

const useStyles = makeStyles(theme => ({
  numberbox: {
    backgroundColor: "#20B2AA",
    width: "25px",
    height: "25px",
    textAlign: "center",
    color: "white",
    float: "left",
    marginTop: "-5px"
  },
  number:{
      display:"inline-block",
      verticalAlign: "middle"
  },
  question:{
    float: "left",
    marginLeft: "20px",
    marginTop: "-10px",
    width: "60%"
  },
  title: {
    width:"100%",
    fontSize:"250px"
  },
  resize:{
    fontSize: 20
  },
  resizeq:{
    fontSize: 16
  },
  select:{
    marginLeft: "50px",
    marginTop: "5px",
    width: "200px"
  },
  addo:{
    fontSize: 16,
    color: "gray"
  }
}))

function Question(props){
    const {number, box, setBox, handleDeleteQues}  = props
    const classes = useStyles();
    // const [title, setTitle] = useState(box[number].title);
    // const [questype, setQes] = useState('Multiple choice');
    const questypes = [
        {name: 'Multiple choice',
         icon: <RadioButtonCheckedIcon/> 
        },
        {name: 'Checked box',
         icon: <CheckBoxIcon/> 
        }
    ]

    const ChangeTitle = (e) => {
        let new_box = [...box]
        new_box[number].title = e.target.value
        setBox(new_box)
    }

    const handleChange = (e) => {
        let new_box = [...box]
        new_box[number].type = e.target.value
        setBox(new_box)
    }

    const handleAddOption = (e) => {
        if(e.target.value !== ''){
            let new_box = [...box]
            new_box[number].options.push(e.target.value)
            setBox(new_box)
        }
        e.target.value = ''
    }

    const handleAddChange = (e) => {
        const key = e.which || e.keyCode
        if(key == 13){handleAddOption(e)}
    }

    const handleDelete = (key) => {
        let new_box = [...box]
        new_box[number].options.splice(key, 1)
        setBox(new_box)
    }

    const Changechoice = (e, num) =>{
        let new_box = [...box]
        new_box[number].options[num] = e.target.value
        setBox(new_box)
    }

    const ButtonChoice = () =>{
        switch(box[number].type){
            case 'Multiple choice':
                return <RadioButtonUncheckedIcon/>
            case 'Checked box':
                return <CheckBoxOutlineBlankIcon/>
        }
        return <CheckBoxOutlineBlankIcon/>
    }
    
    return(
    <div>
        <div className={classes.numberbox}>
            <span className={classes.number}>{number+1}
            </span>
        </div>
        <div className={classes.question}>
            <TextField 
                fullWidth
                id={number+'-'+'title'} 
                value={box[number].title} 
                className={classes.title}
                InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                }}
                onChange={ChangeTitle}
            />
        </div>
        <div>
            <FormControl className={classes.select} variant="outlined">
                <Select
                    labelId="demo-simple-select-label"
                    id={number+'-'+'select'} 
                    value={box[number].type}
                    onChange={handleChange}
                >
                    {questypes.map((ques) => (
                        <MenuItem key={ques.name} value={ques.name}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {ques.icon}
                                <div style={{ marginLeft:'10px'}}>{ques.name}</div>
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
        
        <div>
            {box[number].options.map((choice, num) => (
                <div key={num}> 
                    <div style={{float: "left", marginTop:"5px"}}>
                        {ButtonChoice(num)}
                    </div>
                    <div style={{float: "left", marginLeft: "15px" }}>
                        <TextField 
                            id={number+'-'+num} 
                            value={choice} 
                            InputProps={{
                                classes: {
                                input: classes.resizeq,
                                },
                            }}
                            onChange={(e) => Changechoice(e, num)}
                        />
                    </div>
                    <div style={{float: "left", marginLeft: "10px", marginTop:"7px"}} onClick={() => handleDelete(num)}>
                        <CloseIcon/>
                    </div>
                    <br/><br/><br/>
                </div>
            ))}
            <div style={{float: "left", marginTop:"5px"}}>
                {ButtonChoice()}
            </div>
            <div style={{marginLeft: "40px", marginTop:"-5px"}}>
                <TextField 
                    id={number+'-'+'add'} 
                    placeholder="Add option"
                    InputProps={{
                        classes: {
                            input: classes.addo,
                        },
                    }}
                    onKeyPress = {handleAddChange} 
                    onBlur = {handleAddOption}
                />
            </div>
        </div>
        <div style={{marginLeft: "95%", marginTop: "-20px"}} onClick={() => (handleDeleteQues(number))}>
            <DeleteOutlineRoundedIcon fontSize="large"/>
        </div>
        <br/>
        <Divider/>
        <br/><br/>
    </div>
    )
}

export default Question