
import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const Submit = (e) => {
    e.preventDefault();

    axios
      .post("https://crud-mlsm.vercel.app/createUser", { name, email, age })
      .then((result) => {
        setMessage(result.data.message);
        setName("");
        setEmail("");
        setAge("");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Something went wrong!");
      });
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add User</h2>

          <div className='mb-2'>
            <label>Name</label>
            <input
              type="text"
              placeholder='Enter Name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='mb-2'>
            <label>Email</label>
            <input
              type="email"
              placeholder='Enter Email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-2'>
            <label>Age</label>
            <input
              type="number"
              placeholder='Enter Age'
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <button className='btn btn-success'>Submit</button>

          {message && <p className='mt-3'>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
