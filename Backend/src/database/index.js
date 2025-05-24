import mongoose from 'mongoose';  
const connection = async()=>{
    try {
        const mongoUri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        const connectionInstance = await mongoose.connect(mongoUri)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("connection string problem",error,mongoUri);
    }
}
export {connection}