import React, { Component, useState } from "react";
import app from "./firebase_config"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";


const auth = getAuth(app);
export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [verifyButton, setVerifyButton] = useState(false)
  const [verifyOtp, setVerifyOtp] = useState("")
  const [show,setShow] = useState("")
  const [load,setLoad] = useState("")
  


  function onCaptchVerify() {
    if(!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup();
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      }, auth);

    }
  }

  function onSignup() {
    setVerifyButton(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + mobile ;
    console.log(formatPh)
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoad(false)
        setShow(true)
        alert("OTP sended successfully!");
        
      })
      .catch((error) => {
        console.log(error)
        setLoad(false)
       
      });
  }

  function onOTPVerify() {
    setVerifyButton(true);
    window.confirmationResult
      .confirm(verifyOtp)
      .then(async (res) => {
        console.log(res);
        const user = setFname;
        console.log(user)
        alert("Verification Done")
        setVerifyButton(false);
        
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Otp")
        setVerifyButton(false);
      });
  }

  function changeMobile(e) {
     const mob = setMobile(e.target.value)
     const x= console.log(mob.length)
      if(x==10){
        verifyButton(true);
      }
  }

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      
        console.log(fname, lname, mobile, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          mobile,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Sent Successful");
          } else {
            alert("Something went wrong");
          }
        });
      
      e.preventDefault();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div id="recaptcha-container"></div>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType == "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter phone number"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            </div>

          <div className="mb-3">
            <label>Phone number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter phone number"
              onChange={(e) => setMobile(e.target.value)}
            />
            
            <button
                className="button"
                type="button"
                onClick={onSignup}
                style={{
                  background: "#0163d2",
                  width: "100%",
                  padding: 8,
                  color: "white",
                  border: "none",
                }}
            >Send OTP via SMS</button>  
          </div>

          {show ? (
            <div className="mb-3">
              <label>Enter OTP</label>
              <input
                value={verifyOtp}
                
                type="number"
                length={6}
                className="form-control"
                placeholder="Enter OTP"
                onChange={(e) => setVerifyOtp(e.target.value)}
              />
              <button
                className="button"
                type="button"
                onClick={onOTPVerify}
                style={{
                  background: "#0163d2",
                  width: "100%",
                  padding: 8,
                  color: "white",
                  border: "none",
                }}
              >Verify</button>
            </div>
            ) : null}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="button">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
