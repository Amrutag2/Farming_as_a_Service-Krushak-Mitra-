import React, { useState } from 'react'

function Reset() {
    const [email, setEmail] = useState("") 

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email)
        fetch("http://localhost:5000/forgot-password",{
            method:"POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",

            },
            body:JSON.stringify({
                email,
            })
        })
            .then((res)=> res.json())
            .then((data)=>{
                console.log(data, "userRegister");
                alert(data.status)
            })
    }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
            <form onSubmit={handleSubmit}>
                <h3>Forgot password</h3>
                <div className='mb-3'>
                <label>Email Address</label>
                <input 
                    type="email"
                    className='form-control'
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className='d-grid'>
                    <button type='submit' className='button'>
                        Submit
                    </button>
                    <p className='forget-password text-right'>
                        <a href='/sign-up'>Sign Up</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Reset
