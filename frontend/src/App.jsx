import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';
import image from './assets/bg.jpg';
import {motion} from 'framer-motion'

function App() {
  const[data,setdata]=useState([]);
  const [task,settask]=useState("");
  const[update,setupdate]=useState("");
  const[id,setid]=useState(0);
  
  function fetchdata(){
    axios.get("http://localhost:3000/api/v1/getlist")
    .then((res)=>{
      setdata(res.data.data)
      
    })
  }

  useEffect(()=>{
    fetchdata();
  },[])
  
  
function adddata(){
    axios.post("http://localhost:3000/api/v1/addlist",{task})
    .then((res)=>{
      fetchdata()
      
    })
  
  }
  function deletetask(id){
    axios.delete(`http://localhost:3000/api/v1/deletelist/${id}`)
    .then((res)=>{
      console.log(res);
      fetchdata()
    })
    setid(null)
  }
  function updatetask(){
    console.log(id);
    
    axios.put(`http://localhost:3000/api/v1/updatelist/${id}`,{task:update})
    .then((res)=>{
      console.log(res);
      fetchdata()
    })
    setid(null);
    setupdate("")

    
  }
  
 

  return (
    <div className='container min-h-screen w-full bg-no-repeat bg-cover  mx-auto text-white font-extrabold' style={{ backgroundImage: `url(${image})` }}>
        <div className='mb-3 font-mono p-5'>
          <motion.h1 initial={{opacity:0,x:90}} animate={{opacity:1,x:0}} transition={{duration:0.7,type:"spring"}} className='text-center text-4xl font-bold'>Todo list</motion.h1>
          <div className='flex justify-center items-center m-2'>
              <input type="text" className='outline-none border-none bg-amber-50 text-gray-600 m-3 p-3 rounded-2xl w-96' value={task} onChange={(e)=>settask(e.target.value)}/>
              <motion.button whileTap={{scale:0.9}} whileHover={{scale:1.1}} className='bg-gradient-to-r from-cyan-500 to-cyan-700 p-3 px-2 rounded' onClick={adddata}>Add</motion.button>
          </div>
        </div>
        <div>
          <ul className='text-center'>
            {
              data.map((data,index)=>(
                <div className='flex m-3 text-white font-bold justify-center items-center'>{
                    id!=data._id ?<motion.li initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{duration:0.9}} key={index} className='border-0 bg-cyan-100 rounded-4xl text-black rounded-r font-mono py-4  px-5 w-96 overflow-hidden'>{data.task}</motion.li>:
                <input autoFocus value={update} onChange={(e)=>{setupdate(e.target.value)}} className='outline-none border-none bg-cyan-100 rounded-4xl text-black rounded-r font-mono py-4  px-5 w-96 overflow-hidden'></input>
                }
                <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} initial={{opacity:0,x:-90}} animate={{opacity:1,x:0}}   className='bg-gradient-to-r from-red-500 to-red-900  p-3 px-2 rounded m-3' onClick={()=>{deletetask(data._id)}}>delete</motion.button>
                {id==data._id?<motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} initial={{opacity:0,x:-90}} animate={{opacity:1,x:0}} className='bg-gradient-to-r from-amber-500 to-amber-700 p-3 px-2 rounded mx-2' onClick={()=>{updatetask();}}>update</motion.button>:
                <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}} initial={{opacity:0,x:-90}} animate={{opacity:1,x:0}} className='bg-gradient-to-r from-amber-500 to-amber-700 p-3 px-2 rounded mx-2' onClick={()=>{setid(data._id); setupdate(data.task)}}>update</motion.button>}
                
                </div>
                  
              ))

            }
          </ul>
        </div>
    </div>
  )
}

export default App
