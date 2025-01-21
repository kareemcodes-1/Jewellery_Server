import mongoose from "mongoose";
export async function connectDB(){
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        const host = connect.connection.host;
        console.log(`Connected successfully on ${host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}