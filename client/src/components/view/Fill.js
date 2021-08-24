import React, {useState} from 'react'
import Divider from '@material-ui/core/Divider';
import Question from './Question';

function Fill (props) {
    const {page, pageidx, replied, setReplied} = props;

    return(
        <div>
            <div style={{fontSize: '28px'}}>
                {page.group_title}
            </div>
            <Divider style={{marginTop: '12px'}}/>
            <div style={{fontSize: '16px', color: 'grey', marginTop: '12px'}}>
                {page.description}
            </div>
            <br/>
            <div>
                {page.problems? 
                page.problems.map((question, idx) => (
                    <div key={'ques'+idx}>
                        <br/>
                        <Question question={question} pageidx={pageidx} idx={idx} replied={replied} setReplied={setReplied}/>
                        <Divider style={{marginTop: '28px'}}/>
                    </div>
                ))
                :
                ""
                }
            </div>
        </div>
    )
}
export default Fill

