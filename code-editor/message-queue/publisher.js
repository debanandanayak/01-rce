

const mq = require("amqplib")
const QUEUE_NAME = "CODE"
async function publish(message) {
  const connection = await mq.connect("amqp://queue:5672")
  const channel = await connection.createChannel()
  await channel.assertQueue(QUEUE_NAME)
  const str = JSON.stringify(message)
  channel.sendToQueue(QUEUE_NAME, Buffer.from(str))
  await channel.close()
  await connection.close()
}



module.exports = {publish}

