import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form"

export default function Register() {
  const history = useHistory();
  const [count, setCount] = useState(0);
  const addMore = () => {
    setCount(count + 1);
  }
  const onSubmit = (data) => {
    axios.post('/api/register', data).then(res => {
      console.log(res.data)
      history.push('/login')
    }).catch(err => console.log("Register Error", err))
  }

  return (
    <div>
      <Form count={count} onSubmit={onSubmit} addMore={addMore} />
    </div>
  );
}