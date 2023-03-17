import { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name :String
}
export default async function handler(req : NextApiRequest,res : NextApiResponse<Data>){
  res.status(200).send({status:"running"})
}
