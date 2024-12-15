import mongoose from 'mongoose'

const connectDB=async ()=>{
    try {
        const connectioninstance=await mongoose.connect(`${process.env.MONGO_URL}/Eventwise`)
        console.log("CONNECTED!",connectioninstance)

    } catch (error) {
        console.log("MONGODB CONNECTION ERROR:",error.message)
        process.exit(1)
    }
}

export default connectDB