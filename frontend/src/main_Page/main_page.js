import React,{useState,useEffect,forceUpdate} from "react"
import useFetch from "../UseFetch/UseFetch"
import './main.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Add_client from "./add_client";
import Chating from "./chating";
import {useLocation} from 'react-router-dom';
import { Context } from "./var.js";
function Main_page(){
  const [height, setHeight] = React.useState(window.innerHeight);
  const updateWidthAndHeight = () => {
    setHeight(window.innerHeight);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  const [select,setSelect] = useState("")
  useEffect(()=>{
    console.log("current chlid")
    console.log(select)
  },[select])
  return(
    <Context.Provider value={[select,setSelect]}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} >
        <Grid item xs={4} >
          <Add_client/>
        </Grid>
        <Grid item xs={8} height={height} border={3} >
          <Chating/>
        </Grid>
      </Grid>
    </Box>
    </Context.Provider>
  )
}

export default Main_page