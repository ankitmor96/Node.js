import mongoos from "mongoos";

const connectDB = async()=>{
    try{
        const connectdb = await mongoos.connect(proccess.env.MONGO_URI);

        console.log(proccess.env.MONGO_URI);

        console.log("mongodb cennected");
    }catch(error){
        console.log(error);
    }
}

export default connectDB;