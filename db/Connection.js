import mongoose from 'mongoose'

const Connection = async()=>{
    
    try {
        await mongoose.connect(`mongodb+srv://aditya:aditya@fun247admin.jmzvuj7.mongodb.net/?retryWrites=true&w=majority&appName=fun247admin`)
    } catch (error) {   
        console.log(error,"Something went wrong");
    }
}

export default Connection