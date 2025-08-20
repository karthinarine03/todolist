import  List from '../model/list.js'

export const addlist=async(req,res)=>{
   const {task}=req.body;
   const data=await List.create({task});
   res.json({data});
}

export const deletelist=async(req,res)=>{
    const id=req.params.id;
    const data=await List.findByIdAndDelete(id);
    res.json({
        "message":"deleted sucessfull"
    })
}

export const updatelist=async(req,res)=>{
    const id=req.params.id;
    const {task}=req.body;
    const data=await List.findByIdAndUpdate(id,{task});
    res.json({
        data
    })
}

export const getlist=async(req,res)=>{
    const data=await List.find({});
    res.json({
        data
    })
}

export const deleteall=async(req,res)=>{
    const data=await List.deleteMany({});
    res.json({
        data
    })
}