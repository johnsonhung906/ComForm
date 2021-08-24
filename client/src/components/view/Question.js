import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const useStyles = makeStyles(theme => ({
  root:{
    fontSize: 20
  },
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
    marginTop: "-5px",
    width: "60%",
  },
}))

function Question (props){
    const classes = useStyles();
    const {question, pageidx, idx, replied, setReplied} = props;

    const ChangeReplyOne = (idx_) => {
        let new_replied = [...replied]
        new_replied[pageidx][idx] = idx_
        setReplied(new_replied)
    }

    const ChangeReplyMul = (idx_, change) => {
        let new_replied = [...replied]
        new_replied[pageidx][idx][idx_] = change
        setReplied(new_replied)
    }

    return(
        <div className={classes.root}>
            <div className={classes.numberbox}>
                <span className={classes.number}>{idx+1}
                </span>
            </div>
            <div className={classes.question}>
                {question.title}
            </div>
            <br/>
            {question.type === "Multiple choice"? 
            <div>
                {question.options.map((option, idx_)=>(
                    <div key={'ques'+idx_} style={{ marginTop: "10px" }}>
                        <div style={{float: "left"}}>
                            {replied[pageidx][idx][idx_]?
                            <CheckBoxIcon color='action' onClick={() => ChangeReplyMul(idx_, 0)}/>:
                            <CheckBoxOutlineBlankIcon color='action' onClick={() => ChangeReplyMul(idx_, 1)}/>}
                        </div>
                        <div style={{ marginLeft: "30px" }}>
                            {option}
                        </div>
                    </div>
                ))}
            </div>
            :
            <div>
                {question.options.map((option, idx_)=>(
                    <div key={'ques'+idx_} style={{ marginTop: "10px" }}>
                        <div style={{float: "left"}}>
                            {replied[pageidx][idx] === idx_?
                                <RadioButtonCheckedIcon color='action'/>:
                                <RadioButtonUncheckedIcon color='action' onClick={() => ChangeReplyOne(idx_)}/>
                            }
                        </div>
                        <div style={{ marginLeft: "30px" }}>
                            {option}
                        </div>
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

export default Question;