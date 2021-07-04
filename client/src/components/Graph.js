import React, {useState, useEffect} from 'react'
import instance from '../axios';

function Graph() {
  const loadData = async() =>{
    const {
      data : {} //message return
    } = await instance.post('api/load_data', {
      //send key
    });
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
        <div>
        
        </div>
    </>
  );
}

export default Graph;
