
function reg_self(values){
   console.log(values)
   fetch(`/setup`,{
        'method':'POST',
         headers : {
        'Content-Type':'application/json'
  },
    body:JSON.stringify(values)
}).then((res) =>console.log("success")).catch((err) => console.log("problem"))
}

export default reg_self