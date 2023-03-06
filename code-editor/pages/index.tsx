
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [output, setOutput] = useState("")
   async function handleSubmit(e: Event) {
    e.preventDefault()
    // const url = `/api/run/`
    // const data = {
    //   code : "My code",
    //   input: "My input",
    //   language : "C"
    // }


    // var res = await fetch(
    //   url,
    //   {
    //     method: "post",
    //     body: `${JSON.stringify(data)}`
    //   })
    //   res = await res.json();
    //   console.log(await res);

      const output = await fetch(`https://nayakdebananda-symmetrical-fishstick-x9g6r5j7pjjf6999-3000.preview.app.github.dev/`)

      const res = await output.json()

      setOutput(res.stdout)
      
      
      
      
  }
  return <>
    <form onSubmit={handleSubmit}>
      <input type="text" name="code" id="code" />
      <input type="text" name="input" />
      <input type="text" name="language" />

      <input type="submit" value="Run" />
    </form>
    <h1>{output}</h1>
  </>
}