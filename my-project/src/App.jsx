
import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';

function App() {
  const [users,setUsers]=useState([])
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then(res => res.json())
    .then(data=>setUsers(data))
  },[])

  return (
    <>
      <h1 className="text-8xl text-red-600">users length:{users.length} </h1>
      <div className="grid grid-cols-3 gap-2">
        {users.map((user) => (
          <div>
            <div className="card bg-neutral text-neutral-content ">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{user.name} </h2>
                <p>{ user?.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">{user?.profesion}</button>
                  <button className="btn btn-ghost">{user.age} </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App
