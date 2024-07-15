const mongoose=require("mongoose");
const conn= async (req,res)=>{
    try {
        await mongoose
        .connect("mongodb+srv://vishal:vishal2402@cluster0.sv69rtk.mongodb.net/")
        .then(()=>{
            console.log("database is connected");
        });
    } catch (error) {
        res.status(400).json({
            message:"Not Connected",
        });
    }
};
conn();