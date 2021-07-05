import React, {useState, useEffect} from 'react'
import useWindowDimensions from './hooks/useWindowDimensions';
import Box from './Box';
import { makeStyles } from '@material-ui/styles'

import instance from '../axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '95%', 
    position: 'absolute', 
    top: '5%', 
    width: '100%', 
    overflow: 'hidden', 
    backgroundColor: 'lightgrey'
  }
}))

function Graph() {
  const classes = useStyles();
  // const loadData = async() =>{
  //   const {
  //     data : {} //message return
  //   } = await instance.post('api/load_data', {
  //     //send key
  //   });
  // }

  // useEffect(() => {
  //   loadData()
  // }, [])
  const {width, height} = useWindowDimensions()

  return (
    <>
        <div className={classes.root}>
           <Box left={width/2} top={height/2}/>
        </div>
    </>
  );
}

export default Graph;
