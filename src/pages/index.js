import Navbar from '@/components/Navbar'

import Link from 'next/link'

// const inter = Inter({ subsets: ['latin'] })

import { useEffect, useState } from 'react'


export default function Home() {
  
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      else{
        alert("User Deleted")
        
      }
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // const [loading , setloading] = useState(false)
  const [data, setData] = useState([])  
  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch('http://localhost:4000/user');
  
        if (!query.ok) {
          throw new Error('Network response was not ok');
        }
       
  
        const response = await query.json();
        console.log("response from API:", response);
        setData(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    getData();
  }, []);
  




  return (
    <>
        <Navbar />
       
        
 
      {data.length===0 ? <h1 className='text-4xl m-96 pl-64'>Loading...</h1> :
      
      <>
        {data.map(user => ( 
          
          <div key="{user.id}" className='text-4xl bg-black bg-cover w-full text-white flex items-center justify-center my-20 ' >
          <h1 className='p-20'>{user.name}</h1>
          <h2 className='p-20'>{user.email}</h2>
          <h2 className='p-20'>{user.password}</h2>
        
          <Link href={`/updateuser/${user.id}`} className='my-20 border p-5 rounded-lg  text-white text-3xl' >Edit</Link>
          <button onClick={()=>deleteUser(user.id)}  className='ml-20  p-5 rounded-lg border text-white text-3xl'>delete</button>
          </div>
        ))}
      </>
      }

      <Link href="/adduser" className='my-20 border p-5 rounded-lg  text-black text-3xl' > Add User</Link>
      <div className='h-36'></div>
    </>
  )
}
