import { useState } from 'react';

import { Toaster, toast } from 'sonner'
import { format } from 'date-fns';

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
// RunningForm Component
function RunningForm({ onFormChange }) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [weather, setWeather] = useState('');
  const [airTemp, setAirTemp] = useState('');
  const [notes, setNotes] = useState('');
  const [shoesUsed, setShoesUsed] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'newDate':
        setDate(value);
        break;
      case 'newDistance':
        setDistance(value);
        break;
      case 'newDuration':
        setDuration(value);
        break;
      case 'newWeather':
        setWeather(value);
        break;
      case 'newAirTemp':
        setAirTemp(value);
        break;
      case 'newNotes':
        setNotes(value);
        break;
      case 'newShoes':
        setShoesUsed(value);
        break;
      default:
        break;
    }
    // Send form data to parent component
    onFormChange({
      sport: 'running',
      date,
      distance,
      duration,
      weather,
      airTemp,
      notes,
      shoesUsed,
    });
  };

  return (
    <>
      <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
      <input type="number" id='newDistance' placeholder="Distance (km)" min="0" value={distance} onChange={handleChange} />
      <input type="number" id="newDuration" name="newDuration" placeholder="Duration (minutes)" min="0" value={duration} onChange={handleChange} />
      <div className='row'>
        <select id="newWeather" name="newWeather" value={weather} onChange={handleChange}>
          <option value="" disabled>Weather Condition</option>
          <option value="Sunny">Sunny</option>
          <option value="Overcast">Overcast</option>
          <option value="Rain">Rain</option>
          <option value="Misty">Misty</option>
          <option value="Stormy">Stormy</option>
        </select>
        <input type="number" id="newAirTemp" name="newAirTemp" placeholder="Air temperature (°C)" min="-10" max="50" value={airTemp} onChange={handleChange} />
      </div>
      <textarea type="text" id="newNotes" name="newNotes" placeholder="Notes" value={notes} onChange={handleChange} />
      <input type="text" id="newShoes" name="newShoes" placeholder="Shoes Used" value={shoesUsed} onChange={handleChange} />
    </>
  );
}

// SwimmingForm Component
function SwimmingForm({ onFormChange }) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [lapLength, setLapLength] = useState('');
  const [waterTemp, setWaterTemp] = useState('');
  const [notes, setNotes] = useState('');
  const [strokeType, setStroke] = useState('Freestyle');
  const [lapTimes, setLapTimes] = useState(['']);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'newDate':
        setDate(value);
        break;
      case 'newLapLength':
        setLapLength(value);
        break;
      case 'newWaterTemp':
        setWaterTemp(value);
        break;
      case 'newStroke':
        setStroke(value);
        break;
      case 'newNotes':
        setNotes(value);
        break;
      default:
        break;
    }
    // Send form data to parent component
    onFormChange({
      sport: 'swimming',
      date,
      notes,
      lapLength,
      strokeType,
      lapTimes,
      waterTemp,
    });
  };

  const addLapTime = () => {
    setLapTimes([...lapTimes, '']);
  };

  const handleLapTimeChange = (index, value) => {
    const newLapTimes = [...lapTimes];
    newLapTimes[index] = value;
    setLapTimes(newLapTimes);
    // No need to call handleChange here.  The parent component
    // will receive the updated lapTimes when the form is submitted.
  };

  return (
    <>
      <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
      <input type="number" id='newLapLength' name='newLapLength' placeholder="Pool Length (meters)" min="0" value={lapLength} onChange={handleChange} />
      <div className='row'>
        <select id="newStroke" name="newStroke" value={strokeType} onChange={handleChange}>
          <option value="" disabled>Stroke Type</option>
          <option value="Freestyle">Freestyle</option>
          <option value="Backstroke">Backstroke</option>
          <option value="Breaststroke">Breaststroke</option>
          <option value="Butterfly">Butterfly</option>
          <option value="Sidestroke">Sidestroke</option>
          <option value="Dog Paddle">Dog Paddle</option>
        </select>
        <input type="number" id="newWaterTemp" name="newWaterTemp" placeholder="Water temperature (°C)" min="-10" max="50" value={waterTemp} onChange={handleChange} />
      </div>
      <textarea type="text" id="newNotes" name="newNotes" placeholder="Notes" value={notes} onChange={handleChange} />
      <div className='row'>
        <div>
          {lapTimes.map((lapTime, index) => (
            <input
              key={index}
              type="number"
              placeholder={`Lap Time ${index + 1} (seconds)`}
              value={lapTime}
              onChange={(e) => handleLapTimeChange(index, e.target.value)}
            />
          ))}
        </div>
        <button type="button" onClick={addLapTime}>
          New Lap
        </button>
      </div>
    </>
  );
}

// CyclingForm Component
function CyclingForm({ onFormChange }) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [weather, setWeather] = useState('');
  const [airTemp, setAirTemp] = useState('');
  const [notes, setNotes] = useState('');
  const [bikeUsed, setBikeUsed] = useState('');
  const [terrain, setTerrain] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'newDate':
        setDate(value);
        break;
      case 'newDistance':
        setDistance(value);
        break;
      case 'newDuration':
        setDuration(value);
        break;
      case 'newTerrain':
        setTerrain(value);
        break;
      case 'newWeather':
        setWeather(value);
        break;
      case 'newAirTemp':
        setAirTemp(value);
        break;
      case 'newNotes':
        setNotes(value);
        break;
      case 'newBikeUsed':
        setBikeUsed(value);
        break;
      default:
        break;
    }
    // Send form data to parent component
    onFormChange({
      sport: 'cycling',
      date,
      notes,
      distance,
      duration,
      terrain,
      bikeUsed,
      airTemp,
      weather,
    });
  };

  return (
    <>
      <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
      <div className='row'>
        <input type="number" id='newDistance' placeholder="Distance (km)" min="0" value={distance} onChange={handleChange} />
        <input type="number" id="newDuration" name="newDuration" placeholder="Duration (minutes)" min="0" value={duration} onChange={handleChange} />
      </div>
      <div className='row'>
        <select id="newTerrain" name="newTerrain" value={terrain} onChange={handleChange}>
          <option value="" disabled>Terrain</option>
          <option disabled>--- Paved Surfaces ---</option>
          <option value="Flat Road">Flat Road</option>
          <option value="Rolling Hills">Rolling Hills</option>
          <option value="Hilly Road">Hilly Road</option>
          <option value="Smooth Pavement">Smooth Pavement</option>
          <option value="Rough Pavement">Rough Pavement</option>
          <option value="Bike Path">Bike Path</option>
          <option disabled>--- Unpaved Surfaces ---</option>
          <option value="Gravel Road">Gravel Road</option>
          <option value="Dirt Road">Dirt Road</option>
          <option value="Singletrack (MTB)">Singletrack (MTB)</option>
          <option disabled>--- Specialised/Mixed ---</option>
          <option value="Cobblestone">Cobblestone</option>
          <option value="Mixed Terrain">Mixed Terrain</option>
        </select>
        <input type="text" id="newBikeUsed" name="newBikeUsed" placeholder="Bike Used" value={bikeUsed} onChange={handleChange} />
      </div>
      <div className='row'>
        <select id="newWeather" name="newWeather" value={weather} onChange={handleChange}>
          <option value="" disabled>Weather Condition</option>
          <option value="Sunny">Sunny</option>
          <option value="Overcast">Overcast</option>
          <option value="Rain">Rain</option>
          <option value="Misty">Misty</option>
          <option value="Headwind">Headwind</option>
          <option value="Tailwind">Tailwind</option>
          <option value="Crosswind">Crosswind</option>
        </select>
        <input type="number" id="newAirTemp" name="newAirTemp" placeholder="Air temperature (°C)" min="-10" max="50" value={airTemp} onChange={handleChange} />
      </div>
      <textarea type="text" id="newNotes" name="newNotes" placeholder="Notes" value={notes} onChange={handleChange} />
    </>
  );
}

function NewSession({ onHide, controller, setNewSession }) {
  const [selectedSport, setSelectedSport] = useState('');
  const [formData, setFormData] = useState({});

  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  };

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSport && controller && formData) {
      controller.handleNewSession(formData, setNewSession);
    }
  };

  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="newSession">
        <div>
          <h2>New Session</h2>
          <button id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></button>
        </div>
        <div>
          <button id='running' onClick={() => handleSportClick('running')}>Running</button>
          <button id='swimming' onClick={() => handleSportClick('swimming')}>Swimming</button>
          <button id='cycling' onClick={() => handleSportClick('cycling')}>Cycling</button>
        </div>
        <form id='newSessionForm' onSubmit={handleSubmit}>
          {selectedSport === 'running' && <RunningForm onFormChange={handleFormChange} />}
          {selectedSport === 'swimming' && <SwimmingForm onFormChange={handleFormChange} />}
          {selectedSport === 'cycling' && <CyclingForm onFormChange={handleFormChange} />}
          <input type="submit" value="Submit" id='register-btn' />
        </form>
      </div>
    </>
  );
}

function MainPanel({ controller }) {
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
function SidePanel({ onRegister, onSubmit, loggedIn, logout, onNewSession, firstName, settings }) {
  return (
    <>
      <aside className='box' >
        {loggedIn ? <UserPage logout={logout} onNewSession={onNewSession} firstName={firstName} settings={settings} /> : <Login onRegister={onRegister} onSubmit={onSubmit} />}
      </aside>
    </>
  );
}

function TriathlonView({ controller }) {
  const userDetails = controller.HandleGettingUserDetails() // Gets user details
  const [showRegister, setShowRegister] = useState(false);
  const [newSession, setNewSession] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LoggedIn') === 'true');
  const [firstName, setFirstName] = useState(userDetails ? userDetails.fName : ""); // Show users name
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
    controller.handleSignUp(username, fName, lName, setShowRegister);
  };
  const handleSubmit = async (username) => {
    controller.handleLogin(username, setLoggedIn, setFirstName);
  };
  const handlelogout = () => {
    controller.handleLogout(setLoggedIn)
  }
  const handleChangeSettings = () => {
    setChangeSettings(true);
  }

  const handleNewSession = () => {
    setNewSession(true);
  }

  return (
    <>
      {/* Toaster Notifications */}
      <Toaster richColors position="top-center" />

      {/* Popups */}
      {changeSettings ? (<Settings onHide={handleHide} />) : null}
      {newSession ? (<NewSession onHide={handleHide} controller={controller} setNewSession={setNewSession} />) : null}
      {showRegister ? <Register onHide={handleHide} onSignUp={handleSignUp} /> : null}

      {/* Main view */}
      <SidePanel onRegister={handleRegister} onSubmit={handleSubmit} loggedIn={loggedIn} logout={handlelogout} onNewSession={handleNewSession} firstName={firstName} settings={handleChangeSettings} />
      {loggedIn ? (<MainPanel controller={controller} />) : null}
    </>
  );
}

export default TriathlonView
