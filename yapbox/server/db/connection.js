import mongoose from 'mongoose';

const connectMongo = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch(err) {
        console.log("Connection error:", err);
    }
}

export default connectMongo;