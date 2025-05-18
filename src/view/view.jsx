import Logo from '../../assets/Logo.webp'
import { useState } from 'react';


function Login() {
  const loggedIn = localStorage.getItem('LoggedIn');
  if (loggedIn !== 'true') {
    return (
      <div id="login">
        <img className='logo' src={Logo} alt="Triathlete plus logo" />
        <div>
          <form id='LoginForm'>
            <h2>Login</h2>
            <input type="text" id="username" name="Username" placeholder="Username" required />

            <input type="submit" value="Login" />
          </form>
          <button id='signup-btn'>Sign Up</button>
        </div>
      </div>
    )
  }
  return null;
}

function Register() {
  return (
    <div className="box" id="signup">
      <form id='registerForm'>
        <h2>Register</h2>
        <input type="text" id="username" name="Username" placeholder="Username" required />
        <input type="text" id="fName" name="fName" placeholder="First Name" required />
        <input type="text" id="lName" name="lName" placeholder="Last Name" required />

        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

function MainPanel() {
  const loggedIn = localStorage.getItem('LoggedIn');
  if (loggedIn == 'true') {
    return (
      <>
        <main className='box' >Main</main>
      </>
    )
  }
  else {
    return null;
  }
}

function SidePanel() {
  return (
    <>
      <aside className='box' >
        <Login />
      </aside>
    </>
  )
}


function TriathlonView() {
  console.log('Update Main')
  return (
    <>
      <SidePanel />
      <MainPanel />
    </>
  )
}


export default TriathlonView
