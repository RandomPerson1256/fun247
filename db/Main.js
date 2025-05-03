import mongoose from "mongoose"

const MainSchema = mongoose.Schema({
    whatsappNumber : {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:false,
    }
})

const LASER = mongoose.models.LASER || mongoose.model("LASER",MainSchema);
export default LASER;