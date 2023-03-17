import useCompiler from "@/hooks/useCompiler"
import { useState } from "react"

export default function Home() {
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output,postData] = useCompiler()
  async function handleSubmit(e: Event) {
    e.preventDefault()
    const data = {
      code: code,
      input: input,
      language: "java",
    }

    await postData(data)
    
  }
  
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        
        <textarea
        rows='30'
        cols='90'
          type='text'
          name='code'
          id='code'
          onChange={e => {
            setCode(e.target.value)
          }}
        />
        <textarea
        rows='3'
        cols="40"
          type='text'
          name='input'
          onChange={e => {
            setInput(e.target.value)
          }}
        />
        <input type='text' name='language' />

        <input type='submit' value='Run Code >>' />
      </form> 
      <pre>{JSON.stringify(output)}</pre>
    </>
  )
}



// var res = await fetch(url, {
//   method: "post",
//   body: JSON.stringify(data),
// })
// res = await res.json()
// await apiCall(res.id)
// await apiCall(res.id)