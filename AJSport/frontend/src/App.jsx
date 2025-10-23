import React from "react"
import { useEffect, useState } from "react"

function App() {  
  const [message, setMessage] = useState("")
  
  useEffect(() =>{
    fetch("http://127.0.0.1:8000/")
      .then(res => res.json)
      .then(data => setMessage(data.message))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Mensaje desde FastAPI</h1>
      <p>{message}</p>
    </div>
  )
}

export default App
