import { useState } from 'react';
// Import views
import './glowView'
// Import assets
import Logo from '../../assets/Logo.webp'

function Login({ onRegister, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    onSubmit(username);
  };
  return (
    <div id="login">
      <img className='logo' src={Logo} alt="Triathlete plus logo" />
      <div>
        <form id='LoginForm' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input type="text" id="username" name="Username" placeholder="Username" required />
          <input type="submit" value="Login" />
        </form>
        <button id='signup-btn' onClick={onRegister}>Sign Up</button>
      </div>
    </div>
  );
}
function Register({ onHide, onSignUp }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    onSignUp(username, fName, lName);
  };
  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="signup">
        <div>
          <h2>Register</h2>
          <button id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></button>
        </div>
        <form id='registerForm' onSubmit={handleSubmit}>
          <input type="text" id="registerUsername" name="Username" placeholder="Username" required />
          <input type="text" id="fName" name="fName" placeholder="First Name" required />
          <input type="text" id="lName" name="lName" placeholder="Last Name" required />
          <input type="submit" value="Register" id='register-btn' />
        </form>
      </div>
    </>
  );
}
function Settings({ onHide }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    onSignUp(username, fName, lName);
  };
  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="settings">
        <div>
          <h2>User Settings</h2>
          <button id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></button>
        </div>
        <form id='registerForm' onSubmit={handleSubmit}>
          <input type="text" id="registerUsername" name="Username" placeholder="Username" required />
          <input type="text" id="fName" name="fName" placeholder="First Name" required />
          <input type="text" id="lName" name="lName" placeholder="Last Name" required />
          <input type="submit" value="Save" id='settings-btn' />
        </form>
      </div>
    </>
  );
}
function UserPage({ logout, onNewSession, firstName, settings }) {
  return (
    <div id='userPage'>
      <div>
        <img className='logo' src={Logo} alt="Triathlete plus logo" />
        <p>User</p>
        <button onClick={onNewSession}>New Session</button>
        <form>
          <input type="text" id="searchSessions" placeholder="Search training sessions" />
        </form>
      </div>
      <div className='row'>
        <p>{firstName}</p>
        <button onClick={settings} className='icon icon-settings'></button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
function NewSession({ onHide, onSignUp }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    CreateRunningSession(date, notes, distance, duration, shoesUsed, airTemperature, weatherCondition);
  };
  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="newSession">
        <div>
          <h2>New Session</h2>
          <button id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></button>
        </div>
        <div><button id='running'>Running</button><button id='swimming'>Swimming</button><button id='cycling'>Cycling</button></div>
        <form id='registerForm' onSubmit={handleSubmit}>
          <input type="date" id="newDate" name="newDate" placeholder="01/01/2025" />
          <input type="number" id='newDistance' placeholder="Distance (km)" min="0" />
          <input type="number" id="newDuration" name="newDuration" placeholder="Duration (minutes)" min="0" />
          <div className='row'>
            <select id="newWeather" name="newWeather">
              <option value="" disabled selected>Weather Condition</option>
              <option value="Sunny">Sunny</option>
              <option value="Overcast">Overcast</option>
              <option value="Rain">Rain</option>
              <option value="Misty">Misty</option>
              <option value="Stormy">Stormy</option>
            </select>
            <input type="number" id="newAirTemp" name="newAirTemp" placeholder="Air temperature (°C)" min="-10" max="50" />
          </div>
          <textarea type="text" id="newNotes" name="newNotes" placeholder="Notes" />
          <input type="submit" value="Submit" id='register-btn' />
        </form>
      </div>
    </>
  );
}
function MainPanel({ newSession, onHide }) {
  return (
    <>

      <main>
        <div className='box' >
          <div>
            <h2>Training Sessions</h2>
            <div className='row'> <h3>Sort by: </h3> <button>Date</button><button>Type</button><button>Distance</button></div>
          </div>
          <table>
            <thead>
              <tr>
                <td>Table Head</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Table Data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='box' >
          <div>
            <h2>Training Data</h2>
          </div>
        </div>
      </main>
    </>
  );
}
function SidePanel({onRegister, onSubmit, loggedIn, logout, onNewSession, firstName, settings }) {
  return (
    <>
      <aside className='box' >
        {loggedIn ? <UserPage logout={logout} onNewSession={onNewSession} firstName={firstName} settings={settings} /> : <Login onRegister={onRegister} onSubmit={onSubmit} />}
      </aside>
    </>
  );
}
function Notification({ message, type }) {

  return (
    <div id='notification' className={`${type} ${type ? 'show' : ''}`}>
      <div>
        <i className="icon icon-info"></i>
        <p>{message}</p>
      </div>
    </div>
  );
}
function TriathlonView({ controller }) {
  const userDetails = controller.HandleGettingUserDetails() // Gets user details
  const [showRegister, setShowRegister] = useState(false);
  const [newSession, setNewSession] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LoggedIn') === 'true');
  const [firstName, setFirstName] = useState(userDetails ? userDetails.fName : ""); // Trys to show users name 
  const [notification, setNotification] = useState({ message: '', type: '' }); // State for notification
  const [changeSettings, setChangeSettings] = useState(false);


  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleHide = () => {
    setShowRegister(false);
    setNewSession(false);
    setChangeSettings(false);
  };
  const handleSignUp = (username, fName, lName) => {
    controller.handleSignUp(username, fName, lName, showNotification, setShowRegister); // Pass showNotification
  };
  const handleSubmit = async (username) => {
    controller.handleLogin(username, showNotification, setLoggedIn, setFirstName); // Pass showNotification
  };
  const handlelogout = () => {
    controller.handleLogout(showNotification, setLoggedIn)
  }
  const handleChangeSettings = () => {
    setChangeSettings(true);
  }

    const handleNewSession = () => {
    setNewSession(true);
  }

  // Displays notifications
  const showNotification = (message, type) => {
    setNotification({ message, type });
    // triggers notification to slide down
    setTimeout(() => {
      setNotification({ message, type: '' });
    }, 8500);
  };

  return (
    <>
    {/* Popups */}
      {changeSettings ? (<Settings onHide={handleHide} />) : null}
      {newSession ? (<NewSession onHide={handleHide} />) : null}
      <Notification message={notification.message} type={notification.type} />
      {showRegister ? <Register onHide={handleHide} onSignUp={handleSignUp} /> : <></>}

    {/* Main view */}
      <SidePanel onRegister={handleRegister} onSubmit={handleSubmit} loggedIn={loggedIn} logout={handlelogout} onNewSession={handleNewSession} firstName={firstName} settings={handleChangeSettings} />
      {loggedIn ? (<MainPanel />) : null}
    </>
  );
}

export default TriathlonView