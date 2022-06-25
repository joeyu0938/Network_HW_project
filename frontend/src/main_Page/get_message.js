import React,{useState,useEffect,useContext } from "react"
import Box from '@mui/material/Box';
import Image1 from './paper2.jpg'
import Image2 from './paper.jpg'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemText, Typography } from "@mui/material";
import { List } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { ImageList ,ImageListItem} from "@mui/material";
import { Context } from "./var.js";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Avatar from '@mui/material/Avatar';
function Get_message(){
    const [select,setSelect] = useContext(Context);
    const [text,setText] = useState([])
    const [Image,setImage] = useState()
    const Fetchmessage = ()=>{
        return fetch(`/get_message/${select}`,{
            'method':'POST',
            headers : {
            'Content-Type':'application/json'
        }
      }).then((res) => res.json()).then((res)=>setText(res)).catch((error)=>(console.log(error)))
    }
    useEffect(() =>{
        let interval = setInterval(() => Fetchmessage(), (1000))
        //destroy interval on unmount
        return () => clearInterval(interval)
    })
    useEffect(()=>{
        var objDiv = document.getElementById("chatbox");
        objDiv.scrollTop = objDiv.scrollHeight;
    },[text])
    var cnt = 0
    useEffect(()=>{
        if(select === "")setImage(Image2)
        else{
            setImage(Image1)
        }
    },[select])
    return(
        <Box sx={{
        flexGrow: 1 ,
        height:'90%',
        mr:1 ,
        backgroundImage: `url(${Image})`,
        backgroundPosition:'center',
        backgroundSize:'100%',
        }} border={3} overflow='auto' id="chatbox">
            <IconButton onClick={Fetchmessage}>
            <RefreshIcon/>
            </IconButton>
            <List>
            {
                text.map((input)=>{
                    cnt++
                    if(input.length == 3 && input[2]==="image"){
                        return(
                            <ImageList sx={{ml:2}} key={cnt}>
                            <ImageListItem>
                            <ListItemText primary={<Typography style={{ color: '#FFFFFF' }}>{input[0]}</Typography>} />
                            <img
                                src={(`${input[1]}`)}
                            />
                            </ImageListItem>
                        </ImageList>
                        )
                    }
                    else if(input.length == 3 && input[2] === "File"){
                        return(
                            <ListItem key={cnt}>
                              <ListItemText primary={<Typography style={{ color: '#FFFFFF' }}>{input[0]}</Typography>}
                                secondary={
                                    <React.Fragment>
                                        <Avatar>
                                        <AttachFileIcon></AttachFileIcon>
                                        </Avatar>
                                        <Typography style={{ color: '#FFFFFF' }}>{input[1]}</Typography>
                                    </React.Fragment>
                                
                            }/>
                              
                          </ListItem>
                        )
                    }
                    return(
                        <ListItem key={cnt}  disablePadding>
                            {/* <Avatar {...stringAvatar(input[2])}/> */}
                            <ListItemButton>
                            {
                                <ListItemText primary={<Typography style={{ color: '#FFFFFF' }}>{input[0]}</Typography>} secondary={<Typography style={{ color: '#FFFFFF' }}>{input[1]}</Typography>}/>
                            }
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
            </List>
        </Box>
)
}

export default Get_message