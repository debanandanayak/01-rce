const mq = require("amqplib")
const runCode = require("./runner")
const QUEUE_NAME = "CODE"
const fs = require('fs/promises')

const db = require('./db-operation')



async function consume() {
  try {
    const connection = await mq.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    channel.assertQueue(QUEUE_NAME)
    await channel.consume(QUEUE_NAME, async message => {
      const sourceCodeInfo = JSON.parse(message.content.toString())
      
      const file = sourceCodeInfo.id

      await db.addToRedis(file,{status:"queued"})

      const code = sourceCodeInfo.code
      const ext = sourceCodeInfo.extension
      const input = sourceCodeInfo.input
      const compiler = sourceCodeInfo.compiler
      const filePath = `${file}.${ext}`
      await fs.writeFile(filePath,code)
      await fs.writeFile(file,input);
      
      await db.addToRedis(file,{status:"running"})
      
      const output = await runCode(`sh script.sh ${compiler} ${filePath} ${file}`)
      await db.addToRedis(file,output)

      console.log(sourceCodeInfo)
      channel.ack(message)
    })
  } catch (error) {
    console.log(error);
  }
}





consume()
