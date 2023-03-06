
const {createClient} = require("redis")
console.log("redis");

var client = createClient({ url: "redis://localhost:6379" })

client.on("error", () => {
    console.log("Error occurred while connecting to redis");

})



const addToRedis = async (key, value) => {
    try {
        await client.connect()
        await client.setEx(key, 20, JSON.stringify(value))
        await client.quit()
    } catch (error) {
        console.log(error)
    }
}

const getData = async (key) => {
    try {
        await client.connect()
        const data = await client.get(key)
        await client.quit()
        return data
        
    } catch (error) {
        console.log(error);
        return {error:"Error occurred"}
        
    }
}


module.exports = {getData, addToRedis}



