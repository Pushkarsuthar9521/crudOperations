"use client"
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'



function index() {

  const [name, setName] =useState("");
  const [email , setemail] =useState("");
  const [password, setPassword] =useState("");
  const router = useRouter();


  const addUser = async ()=>{
    const id = router.query.id;
    try {
      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      else{
        alert("Your record is added")
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
    <div className='text-4xl flex flex-col  w-full   items-center bg-gray-500 '>
      <h1 className='py-4'>Edit User</h1>
      <input type='text' placeholder='enter name' className='p-4 m-2 items-center rounded bg-black w-3/5 text-white' value={name} onChange={(e)=>setName(e.target.value)} ></input>
      <input type='text' placeholder='enter email' className='p-4 m-2 items-center rounded bg-black w-3/5 text-white'  value={email} onChange={(e)=>setemail(e.target.value)}></input>
      <input type='text' placeholder='enter password' className='p-4 m-2 items-center rounded bg-black w-3/5 text-white'  value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      <button className='my-20 border p-5 rounded-lg  text-white' onClick={addUser}>Add</button>


    </div>
    </>
  )
}

export default index
