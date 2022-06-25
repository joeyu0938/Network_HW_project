import React,{useState,useEffect} from "react"
import "./formInput.css"
const Reg = (props)=>{
    const {label,onChange,id,...inputProps} = props;
  return(
    <div className = "formInput">
        <label>{label}</label>
        <input {...inputProps} onChange={onChange} ></input>
    </div>
  )
}
export default Reg