const mq = require("amqplib")
const runCode = require("./runner")
const QUEUE_NAME = "CODE"
const fs = require("fs/promises")

const db = require("./db-operation")
const languages = require('./languages')
async function consume() {
  try {
    const connection = await mq.connect("amqp://queue:5672")
    const channel = await connection.createChannel()
    channel.assertQueue(QUEUE_NAME)
    await channel.consume(QUEUE_NAME, async message => {
      
      const msg = message.content.toString("utf8")
      let sourceCodeInfo = JSON.parse(msg)
      const compilerInfo = sourceCodeInfo.language
      console.log(compilerInfo)
      sourceCodeInfo = {...sourceCodeInfo,...languages[compilerInfo]}
      console.log("received", sourceCodeInfo)
      const id = `${sourceCodeInfo.id}`
      const fileName = `${sourceCodeInfo.id}`
      await db.addToRedis(id, { isCompleted: false })

      const code = sourceCodeInfo.code
      const ext = sourceCodeInfo.extension
      const input = sourceCodeInfo.input
      const compiler = sourceCodeInfo.compiler
      const filePath = `${fileName}${ext}`
      await fs.writeFile(filePath, code)
      await fs.writeFile(`${fileName}.txt`, input)

      try {
        const output = await runCode(`sh script.sh ${compiler} ${filePath} ${fileName}.txt`)
        console.log(output)
        await db.addToRedis(id, { ...output, isCompleted: true })
      } catch (error) {
        console.log("Error while running",error);
      }finally{
        await channel.ack(message)
      }
    })
  } catch (error) {
    console.log("Some error occurred ", error)
  }
}

consume()
