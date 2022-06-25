import React,{useState,useEffect} from "react"

function useFetch(url){
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')
  const [error, setError] = useState('') 

  useEffect(() => {
    setIsLoading(true)
    fetch(url)
    .then((res) => res.json())
    .then((json) => setData(json))
    .catch((err) => setError(err))
    .finally(() => setIsLoading(false))
  },[url])
  
  return {data, error, isLoading}
}

export default useFetch