import React,{useState,useEffect,useContext,Component} from "react"
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Get_message from "./get_message";
import ImageIcon from '@mui/icons-material/Image';
import Input from '@mui/material/Input';
import { Context } from "./var.js";
function Chating(){
  const [file,setFile] = useState();
  const [select,setSelect] = useContext(Context);
  const add_message = ()=>{
    var tmp = M
    console.log(select)
    setMessage("")
    document.getElementById('outlined-multiline-flexible').value = ''
    return fetch(`/send_message/${select}`,{
        'method':'POST',
         headers : {
        'Content-Type':'application/json'
  },
    body:JSON.stringify(tmp)
  })
  }
  const SendFile = (val)=>{
    const formData = new FormData();
    formData.append('file',val)
    const Upload = () =>{
      fetch(`/image_url/${select}`,{
      'method':'POST',
       body:formData
      })
  }
  document.getElementById("icon-button-file").value = ''
  Upload();
}
  const [M, setMessage] = useState("");
    return(
    <React.Fragment >
        <Get_message/>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          sx={{
            position:"absolute",
            bottom:0,
            mb:2,
            width:'30%'
          }}
          onChange={(e)=>setMessage(e.target.value)}
        />
        <IconButton sx={{
            position:"absolute",
            bottom:0,
            mb:2,
            ml:'30%',
            width:'5%'
          }}
          onClick={add_message}
        >
          <SendIcon/>
        </IconButton>
        <label htmlFor="icon-button-file" position="relative">
        <Input accept="image/*" id="icon-button-file" type="file" sx={{visibility:'hidden'}}
          onChange={(e)=>{SendFile(e.target.files[0])}}
        />
          <IconButton 
          aria-label="upload picture" 
          component="span"
          size = "large"
          sx={{
            position:"absolute",
            bottom:0,
            mb:2,
            ml:'20%',
            width:'5%'
          }}
          >
            <ImageIcon />
          </IconButton>
        </label>
    </React.Fragment>
    )
}

export default Chating