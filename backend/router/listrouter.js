import express from 'express';
import { addlist, deleteall, deletelist, getlist, updatelist } from '../controller/listcontroller.js';

const router=express.Router();

router.post("/addlist",addlist);
router.delete("/deletelist/:id",deletelist);
router.put("/updatelist/:id",updatelist);
router.get("/getlist",getlist);
router.delete("/deleteall",deleteall);


export default router;