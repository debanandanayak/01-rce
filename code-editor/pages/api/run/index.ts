
import { NextApiRequest, NextApiResponse } from "next"
import { publish } from 'message-queue/publisher'


type Code = {
  code: string,
  input: string,
  language: string,
  extension:string
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const id = Date.now()
  const location = `${req.headers.host}${req.url}/${id}`

  switch (method) {
    case "POST":

      const body = JSON.parse(req.body)
      const msg = {...body,id}
      
      await publish(msg)
      res.status(201).json({ ...msg, location })
      return
  }
}



