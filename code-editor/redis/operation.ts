
import {createClient} from "redis"
console.log("redis");

var client = createClient({ url: "redis://redis:6379" })

client.on("error", () => {
    console.log("Error occurred while connecting to redis");

})



export const addToRedis = async (key, value) => {
    try {
        await client.connect()
        await client.set(key, JSON.stringify(value))
        await client.quit()
    } catch (error) {
        console.log(error)
    }
}

export const getData = async (key) => {
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




