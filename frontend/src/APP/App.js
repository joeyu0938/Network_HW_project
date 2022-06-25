import React,{useState,useEffect} from "react"
import useFetch from "../UseFetch/UseFetch"

function App(){
  const {data, isLoading, error} = useFetch("/members")
  if (isLoading) {
    return <h1>isLoading....</h1>
  } else if (error) {
    return <h1>data can't fetch</h1>
  } else {
    return (
      <div>
        <p>{data["Hi"]}</p>
        <h1>return</h1>
      </div>
    )
  }
}

export default App