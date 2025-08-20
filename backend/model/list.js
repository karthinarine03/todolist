import mongoose from "mongoose";

const listschema=new mongoose.Schema({
    task:{
        type:String,
        required:true
    }
})

const List=mongoose.model("List",listschema);

export default List;