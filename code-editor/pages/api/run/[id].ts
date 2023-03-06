import { NextApiRequest, NextApiResponse } from "next"
const db = require('../../../redis/operation')
export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const id = req.query.id
    const data =await db.getData(id)
    res.json(data)
}




