import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';
import image from './assets/bg.jpg';

function App() {
  const[data,setdata]=useState([]);
  const [task,settask]=useState("");
  const[update,setupdate]=useState("Add");
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
  }
  function updatetask(){
    axios.put(`http://localhost:3000/api/v1/updatelist/${id}`,{task})
    .then((res)=>{
      console.log(res);
      fetchdata()
    })
    setupdate("Add")
  }
  
 

  return (
    <div className='container min-h-screen w-full bg-no-repeat bg-cover  mx-auto text-cyan-700' style={{ backgroundImage: `url(${image})` }}>
        <div className='mb-3 font-mono p-5'>
          <h1 className='text-center text-4xl font-bold'>Todo list</h1>
          <div className='flex justify-center items-center m-2'>
              <input type="text" className='border border-2 m-3 p-3 rounded-2xl w-96' value={task} onChange={(e)=>settask(e.target.value)}/>
              <button className='bg-cyan-600 p-3 px-2 rounded' onClick={update=="update"?updatetask:adddata}>{update}</button>
          </div>
        </div>
        <div>
          <ul className='text-center'>
            {
              data.map((data,index)=>(
                <div className='flex m-3 justify-center items-center'>
                <li key={index} className='border-0 bg-cyan-100 rounded-4xl rounded-r font-mono py-4  px-5 w-96 overflow-hidden'>{data.task}</li>
                <button className='bg-red-600 p-3 px-2 rounded m-3' onClick={()=>{deletetask(data._id)}}>delete</button>
                <button className='bg-amber-500 p-3 px-2 rounded mx-2' onClick={()=>{setid(data._id);setupdate("update") }}>update</button>
                </div>
                  
              ))
            }
          </ul>
        </div>
    </div>
  )
}

export default App
