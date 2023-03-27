import { useState } from "react";
import "./LoginForm.css";

const noUserMessage = "Either email or password are incorect. Did you mean to Sign up?"
const loginTakenMessage = "Sorry, but there is allready an account using that email."

function LoginForm({loggUser}) {
  const [email, setEmail] = useState("marianka@gmail.com");
  const [password, setPassword] = useState("greatsecret");
  const [logInMessage, setLogInMessage] = useState('');

  async function handleSignUp() {
    const data = await saveUser();
    if (data.length === 0) {
     setLogInMessage(loginTakenMessage);
    } else {
     loggUser(data.email); 
    }  
  }

  async function handleLogIn() {
    const data = await getUser();
    if (data.length === 0) {
     setLogInMessage(noUserMessage);
    } else {
     loggUser(data.email); 
    }  
  }

  async function saveUser() {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: email,
          password: password
      }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    try {
        const response = await fetch('http://localhost:8080/login', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            email: email,
            password: password
        }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
  }

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div id="login-form">
        <div id="login-form-header">
          <div id="login-form-header-logo">
            <div id="logo-wrapper">
              <img id="logo" src="/ecological.png" alt="logo"></img>
            </div>
            <div id="app-name">
              Quiz<section id="sec-part">App</section>
            </div>
          </div>
          <div className="login-form-header-text">
            {logInMessage 
            ? <div id="logg-error">{logInMessage}</div>
             : (<div><div>Welcome!</div>
            <div>Please login/signup to your account.</div></div>)}
          </div>
        </div>
        <form
          onSubmit={(event) => event.preventDefault()}
          id="login-signup-form"
        >
          <label className="input-wrapper">
            <div className="login-input">
              <div className="input-label">Email Address</div>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </label>
          <label className="input-wrapper">
            <div className="login-input">
              <div className="input-label">Password</div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </label>
          <div id="additional-choices">
            <label className="checkbox-wrapper">
              <input type="checkbox" />
              <div className="checkbox-label">Remember Me</div>
            </label>
            <div className="forgot-password">Forgot Password?</div>
          </div>
          <div id="google-login-wrapper">
            <div className="google-text">Or login with </div>
            <div id="google">Google</div>
          </div>
          <div id="login-submit-btns">
            <button className="login" onClick={handleLogIn}>LOGIN</button>
            <button className="sigup-btn" onClick={handleSignUp}>SIGNUP</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
