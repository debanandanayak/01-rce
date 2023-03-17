import { useState, useEffect } from "react"
export type CompilerResponse = {
  status: string
}

const initialState = { status: "Not started yet" }

function useCompiler() {
  const [output, setOutput] = useState({stderr:"",stdout:"",isCompleted:false})

  async function getOutput(id) {

    const url = `/api/run/${id}`
    let tryCount = 0
    let intervalId = setInterval( async () => {
      console.log("Calling for output")
      
      tryCount++
      let res = await fetch(url)
      let jsonResponse = await res.json()
      console.log(jsonResponse.isCompleted)
      
      if(jsonResponse.isCompleted || tryCount == 4){
        setOutput(jsonResponse)
        clearInterval(intervalId)
      }
      if(tryCount == 4 && jsonResponse.isCompleted == false){
        setOutput({isCompleted:false,stdout:"No output",stderr:"my be a error occur"})
        clearInterval(intervalId)
      }
    },1000)
    
  }



  async function postData(formData) {
    const data = await fetch("/api/run", {
      method: "POST",
      body: JSON.stringify(formData),
    })
    const jsonResponse = await data.json()
    await getOutput(jsonResponse.id)
  }

  return [output, postData]
}

export default useCompiler

