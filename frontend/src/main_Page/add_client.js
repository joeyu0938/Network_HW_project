import React,{useState,useEffect} from "react"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Client_list from "./client";
import RefreshIcon from '@mui/icons-material/Refresh';

const Add_client = ()=>{
    const [A, setAddress] = useState("");
    const [P, setPort] = useState("");
    const [N, setName] = useState("");
    const requestOptions = (A,P,N)=>{
      var b= [A,P,N,client]
      return fetch(`/add_friend`,{
          'method':'POST',
           headers : {
          'Content-Type':'application/json'
    },
      body:JSON.stringify(b)
  }).then(response => response.json()).then((response) => setClient(response)).catch((err) => {console.log(err)})
  }
  const get_client = () => {
    return(fetch(`/get_client`,{
      'method':'POST',
       headers : {
      'Content-Type':'application/json'}
    }))
    .then((res) => res.json()).then((res)=>setClient(res))
  }
  useEffect(() =>{
    let interval = setInterval(() => get_client(), (2000))
    //destroy interval on unmount
    return () => clearInterval(interval)
  })
    const [client,setClient] = useState([])
    return(
      <React.Fragment>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,width:'10%'}}
            onClick = {()=>requestOptions(A,P,N,client)}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 ,width:'10%'}}
            onClick = {()=>get_client()}
          >
            <RefreshIcon />
          </IconButton>
          <TextField  id="standard-basic" label="Address" variant="filled" size="small" onChange={(e)=>setAddress(e.target.value)}/>
          <TextField  id="standard-basic" label="Port" variant="filled" size="small" onChange={(e)=>setPort(e.target.value)}/>
          <TextField  id="standard-basic" label="Name" variant="filled" size="small" onChange={(e)=>setName(e.target.value)}/>
        </Toolbar>
        </AppBar>
        <List sx={{ backgroundColor: "rgb(210,248,255)" ,padding:1}}>
            <Client_list ls={client}/>
      </List>
      </React.Fragment>
    )
}


export default Add_client