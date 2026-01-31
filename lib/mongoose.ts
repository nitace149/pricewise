import mongoose from 'mongoose';
import mongooes from 'mongoose';

let isConnected =  false; // this variable will keep the track of connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');
    if(isConnected) return console.log('=> using existing database connection');
    try {
        await mongooes.connect(process.env.MONGODB_URI, );
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}
