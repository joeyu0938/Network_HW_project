import React,{useState,useEffect,useContext} from "react"
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { Context } from "./var.js";
const Client_list= (props)=>{
    const [select,setSelect] = useContext(Context);
    function stringToColor(string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
    function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
    return(
        <React.Fragment>
            {
                props.ls.map((input)=>{
                    return(
                        <ListItem key={input[2]}  disablePadding>
                            {/* <Avatar {...stringAvatar(input[2])}/> */}
                            <ListItemButton onClick={() => setSelect(input[2])}>
                            {
                                <ListItemText primary={input[2]} secondary={input[0].concat(input[1])} />
                            }
                            </ListItemButton>
                        </ListItem>
                    )
                })
            }
        </React.Fragment>
    )
}

export default Client_list