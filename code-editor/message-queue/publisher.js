


const mq = require("amqplib")
const QUEUE_NAME = "CODE"

 export async function publish(message) {
  const connection = await mq.connect("amqp://localhost:5672")
  const channel = await connection.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  channel.sendToQueue(QUEUE_NAME, Buffer.from(message))
  await channel.close()
  await connection.close()
}



