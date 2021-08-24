import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { useParams } from "react-router";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Fill from '../components/view/Fill';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
// import instance from '../axios';

const useStyles = makeStyles(theme => ({
    topbar:{
        height: '50px',
        lineHeight: '50px'
    },
    form: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '30px',
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

const form = 
{
    title: 'Test form',
    id: "23cc87df-8a8b-4519-8083-4fee2529e9d4",
    startid: "55051dbf-01e3-424a-b689-8f538e72222b",
    boxes: [
        {
            description: "Mark Elliot Zuckerberg (/ˈzʌkərbɜːrɡ/; born May 14, 1984) is an American media magnate, internet entrepreneur, and philanthropist. He is known for co-founding Facebook, Inc. and serves as its chairman, chief executive officer, and controlling shareholder.[2][3] He also is a co-founder of the solar sail spacecraft development project Breakthrough Starshot and serves as one of its board members.[4]",
            group_title: "Untitled Group 1",
            hasCon: true,
            id: "55051dbf-01e3-424a-b689-8f538e72222b",
            problems: [
                    {
                        options: ["aasd", "asdb"],
                        title: "Problem1",
                        to: ["", ""],
                        type: "Multiple choice"
                    },
                    {   
                        options: ["dsadsa", "bdssa"],
                        title: "Problem2",
                        to: ["52845bcf-76e4-486b-85f8-e9b7b49175a7", "ed9bd4e0-0767-4003-a7bb-b2162e4e00f8"],
                        type: "Condition box"
                    }
                    ],
            to: "ed9bd4e0-0767-4003-a7bb-b2162e4e00f8",
            x: 10,
            y: 262
        },
        {
            description: "Untitled Group 2",
            group_title: "Untitled Group 2",
            hasCon: false,
            id: "52845bcf-76e4-486b-85f8-e9b7b49175a7",
            problems: [],
            to: "1f24d657-1a78-4350-87a7-696516202952",
            x: 296,
            y: 121
        },
        {
            description: "Untitled Group 3",
            group_title: "Untitled Group 3",
            hasCon: false,
            id: "ed9bd4e0-0767-4003-a7bb-b2162e4e00f8",
            problems: [],
            to: "1f24d657-1a78-4350-87a7-696516202952",
            x: 283,
            y: 429
        },
        {
            description: "",
            group_title: "Untitled Group 4",
            hasCon: false,
            id: "1f24d657-1a78-4350-87a7-696516202952",
            problems: [],
            to: "end",
            x: 550,
            y: 276
        }
    ]
}

function Graph() {
  const { formid } = useParams();
  const classes = useStyles();
  const [viewid, setViewid] = useState(form.startid);
  const [viewpath, setViewpath] = useState([form.startid])
  const [page, setPage] = useState({});
  const [pageidx, setPageidx] = useState(0);
  const [replied, setReplied] = useState([])
  const [alertOpen, setAlert] = useState(false)
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if(form){
        let all_rep = []
        for(let i = 0; i < form.boxes.length; i++){
            let group_rep = []
            for(let j = 0; j < form.boxes[i].problems.length; j++){
                if(form.boxes[i].problems[j].type === 'Multiple choice'){
                    group_rep.push(new Array(form.boxes[i].problems[j].options.length).fill(0))
                }
                else{
                    group_rep.push(-1)
                }
            }
            all_rep.push(group_rep)
        }
        setReplied(all_rep)
    }
  }, [form])

  useEffect(() => {
    setAlert(false)
    for(let i = 0; i < form.boxes.length; i++) {
        if(form.boxes[i].id === viewid){
            setPage(form.boxes[i])
            setPageidx(i)
        }
    }
  }, [viewid])

  const handleNext = () => {
    let hasConTo = ''
    const p_replied = replied[pageidx]
    // check whether this page is fully filled
    for (let i= 0; i < p_replied.length; i++){
        if(page.problems[i].type === 'Multiple choice' && !p_replied[i].includes(1)){
            // show error message
            setAlert(true)
            console.log('error')
            return
        }
        else{
            if(p_replied[i] < 0){
                // show error message
                console.log('error')
                setAlert(true)
                return
            }
            if(page.problems[i].type === 'Condition box'){
                const idx_to = p_replied[i]
                hasConTo = page.problems[i].to[idx_to]
            }
        }
    }
    // push to another page
    if(page.hasCon){
        setViewid(hasConTo)
        setViewpath([...viewpath, hasConTo])
    }
    else{
        setViewid(page.to)
        setViewpath([...viewpath, page.to])
    }
  }

  const handleBack = () => {
    console.log(viewpath)
    const new_view_path = viewpath
    new_view_path.pop()
    setViewid(new_view_path[new_view_path.length - 1])
    setViewpath(new_view_path) 
  }

  const handleSubmit = () => {
    const p_replied = replied[pageidx]
    // check whether this page is fully filled
    for (let i= 0; i < p_replied.length; i++){
        if(page.problems[i].type === 'Multiple choice' && !p_replied[i].includes(1)){
            // show error message
            setAlert(true)
            console.log('error')
            return
        }
        else{
            if(p_replied[i] < 0){
                // show error message
                console.log('error')
                setAlert(true)
                return
            }
        }
    }
    // send replied to backend 
    // if success, go to success page
    setFinish(true)
  }

  const ButtonRender = () => {
    if(!page.hasCon && page.to === 'end'){
        return(
            <>
              <Button size="small" style={{fontWeight: 'bold'}} onClick={handleBack}>
                Back
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button color="primary" size="small" style={{fontWeight: 'bold'}} onClick={handleSubmit}>
                  Submit
              </Button>
            </>
        )
    }
    else if (page.id === form.startid){
        return(
            <>
                <Button disabled size="small" style={{fontWeight: 'bold'}}>
                    Back
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button color="primary" size="small" style={{fontWeight: 'bold'}} onClick={handleNext}>
                    Next
                </Button>
            </>
        )
    }
    return(
        <>
            <Button size="small" style={{fontWeight: 'bold'}} onClick={handleBack}>
                Back
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button color="primary" size="small" style={{fontWeight: 'bold'}} onClick={handleNext}>
                Next
            </Button>
        </>
    )
  }

  return (
    <div>
      <div className={classes.topbar}>
        <div style={{float: "left", color: "gray", fontSize:"sans-serif"}}>
        &nbsp;&nbsp;&nbsp;ComForm&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        </div>
          <div style={{float: "left"}}>
            {form.title}
          </div>
      </div>
      <Divider/>
      <Collapse in={alertOpen}>
        <Alert 
          severity="error" 
          onClose={() => (setAlert(false))}
        >Some questions haven't been replied yet!
        </Alert>
      </Collapse>
      {finish? 
        <div className={classes.form}>
          <div style={{ fontSize:32}}>
            {form.title}
          </div>
          <p style={{color: "gray"}}>Your response has been recorded</p>
        </div>
        :<div className={classes.form}>
              <Fill page={page} replied={replied} setReplied={setReplied} pageidx={pageidx}/>
              <br/>
              <div>
                  {ButtonRender()}
              </div>
        </div>
      }
      <Copyright />
    </div>
  );
}

export default Graph;
