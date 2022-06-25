import React,{useState,useEffect, useRef} from "react"
import { Route } from "react-router-dom";
import "./app.css"
import Reg from "./Reg"
import { useNavigate } from "react-router-dom";
import reg_self from "./self_reg";
function Reg_Page(){
    const history = useNavigate();
    const home = () => {
        reg_self(values)
        history("/main_page");
    }
    const [values,SetValue] = useState({
        username:"",
        port:"",
        IP:"",
    });
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    const Change = (e)=>{
        SetValue({...values,[e.target.name]:e.target.value})
    }
    const input = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"username",
            label:"username"
        },
        {
            id:2,
            name:"port",
            type:"text",
            placeholder:"port",
            label:"port"
        },
        {
            id:3,
            name:"IP",
            type:"text",
            placeholder:"IP",
            label:"IP"
        }
    ]
    console.log(values)
  return(
    <div className="app">
        <form onSubmit={handleSubmit} >
        <h1>Register</h1>
            {
                input.map((input)=>(
                    <Reg key={input.id} {...input} value={values[input.name]} onChange={Change}/>
                ))
            }
            <button onClick={home}>Submit</button>
        </form>
    </div>
  )
}

export default Reg_Page