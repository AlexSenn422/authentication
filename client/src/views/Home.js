import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

export default function Home() {
  const history =  useHistory();
  const [response, setResponse] = useState("");

  useEffect(() => {
    let auth = localStorage.getItem("auth");
    if(!auth) history.push('/login');
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, [])

  const logout = () => {
    localStorage.removeItem("auth");
    history.push('/login');
  }

  return (
    <div className='wrapper'>
      <h1>Home</h1>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <button style={{minWidth: 'unset'}} onClick={logout}>Logout</button>
    </div>      
  );
}
