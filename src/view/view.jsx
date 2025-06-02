import { useState, useEffect } from 'react';

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


function ViewSession({ onHide, session }) {
  const member = session.memberID
  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="settings">
        <div>
          <h2 className={session.sportType + ' sport-type'}><i className={'icon icon-' + session.sportType}></i> {session.sportType}</h2>
          <button id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></button>
        </div>
        <div className='dataView'>
          <div className="distance-duration-visual">
            {Array.isArray(session.lapTimes) && (
              <>
                {session.lapTimes.map((lapTime, lapIndex) => (
                  <div key={lapIndex}>
                    <div
                      className="lap-dot"
                      style={{ left: `${(lapIndex + 1) * (100 / session.lapTimes.length)}%` }}
                    ></div>
                    <div
                      className="lap-time-label"
                      style={{ left: `${(lapIndex + 1) * (100 / session.lapTimes.length)}%` }}
                    >{lapTime + 's'}</div>
                  </div>
                ))}
                <div className="end-dot"></div>
                <span className='end-label'>{session.duration % 1 === 0 ? session.duration : session.duration.toFixed(2)}min</span>
                <span className="distance-label">{`${session.distance}m / ${session.lapLength}m laps`}</span>
              </>
            )}
            {!Array.isArray(session.lapTimes) && (
              <>
                <div className="start-dot"></div>
                <div className="end-dot" style={{ left: `100%` }}></div>
                <span className='end-label'>{session.duration % 1 === 0 ? session.duration : session.duration.toFixed(2)}min</span>
                <span className="distance-label">{`${(session.distance)} Km`}</span>
              </>
            )}

          </div></div><br />

        {session.sportType === 'Swimming' ? (
          <>
            <h4>Pool Length: </h4> <p>{session.lapLength + "m"}</p><br />
            <h4>Laps: </h4> <p>{session.laps}</p><br />
            <h4>Total Distance: </h4> <p>{session.duration}</p><br />
          </>
        ) : session.sportType === 'Running' ? (
          <>
            <p>Shoes Used: {session.shoesUsed}</p>
            <p>Route: {session.route}</p>
          </>
        ) : session.sportType === 'Cycling' ? (
          <>
            <p>Bike Used: {session.bikeUsed}</p>
            <p>Terrain: {session.terrain}</p>
          </>
        ) : (
          // Optional: What to render if sport doesn't match any of the above
          <p>Sport details not available or unknown sport type.</p>
        )}
        <p>{"Session ID: " + session.sessionID}</p>
        <p>{"Member ID: " + member.memberID}</p><br />
        <h4>Date of session:</h4> <p>{session.date}</p><br />
        <h4>Notes:</h4> <p>{session.notes}</p>
        <br />

        <i className='icon icon-edit' onClick={() => handleEdit(session)}></i>
        <i className='icon icon-trash' onClick={() => handleDelete(session.sessionID)}></i>
      </div>
    </>
  );
}
function UserPage({ logout, onNewSession, firstName, settings }) {
  return (
    <div id='userPage'>
      <div>
        <img className='logo' src={Logo} alt="Triathlete plus logo" />
        <br />
        <br />
        <p>Create a new training session</p>
        <button className='pink' id='running' onClick={() => onNewSession('running')}>Running</button>
        <button className='blue' id='swimming' onClick={() => onNewSession('swimming')}>Swimming</button>
        <button className='orange' id='cycling' onClick={() => onNewSession('cycling')}>Cycling</button>
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
function RunningForm({ onFormChange, formData }) {
  const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'));
  const [distance, setDistance] = useState(formData?.distance || '');
  const [duration, setDuration] = useState(formData?.duration || '');
  const [weather, setWeather] = useState(formData?.weatherCondition || '');
  const [airTemp, setAirTemp] = useState(formData?.airTemperature || '');
  const [notes, setNotes] = useState(formData?.notes || '');
  const [shoesUsed, setShoesUsed] = useState(formData?.shoesUsed || '');
  const member = formData?.memberID || null

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
      {formData ? (
        // What to render if formData is true
        <>
          <p>{"Session ID: " + formData.sessionID}</p>
          <p>{"Member ID: " + member.memberID}</p><br />
        </>
      ) : (<></>)
      }
      <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
      <input type="number" step="0.01" id='newDistance' placeholder="Distance (km)" min="0" value={distance} onChange={handleChange} />
      <input type="number" step="0.01" id="newDuration" name="newDuration" placeholder="Duration (minutes)" min="0" value={duration} onChange={handleChange} />
      <div className='row'>
        <select id="newWeather" name="newWeather" value={weather} onChange={handleChange}>
          <option value="" disabled>Weather Condition</option>
          <option value="Sunny">Sunny</option>
          <option value="Overcast">Overcast</option>
          <option value="Rain">Rain</option>
          <option value="Misty">Misty</option>
          <option value="Stormy">Stormy</option>
        </select>
        <input type="number" step="0.1" id="newAirTemp" name="newAirTemp" placeholder="Air temperature (°C)" min="-10" max="50" value={airTemp} onChange={handleChange} />
      </div>
      <textarea type="text" id="newNotes" name="newNotes" placeholder="Notes" value={notes} onChange={handleChange} />
      <input type="text" id="newShoes" name="newShoes" placeholder="Shoes Used" value={shoesUsed} onChange={handleChange} />
    </>
  );
}

// SwimmingForm Component
function SwimmingForm({ onFormChange, formData }) {
  const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'));
  const [lapLength, setLapLength] = useState(formData?.lapLength || '');
  const [waterTemp, setWaterTemp] = useState(formData?.waterTemperature || '');
  const [notes, setNotes] = useState(formData?.notes || '');
  const [strokeType, setStroke] = useState(formData?.strokeType || 'Freestyle');
  const [lapTimes, setLapTimes] = useState(formData?.lapTimes || ['']);
  const member = formData?.memberID || null
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
  };

  return (
    <>
      {formData ? (
        // What to render if formData is true
        <>
          <p>{"Session ID: " + formData.sessionID}</p>
          <p>{"Member ID: " + member.memberID}</p><br />
        </>
      ) : (<></>)
      }
      <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
      <input type="number" step="0.01" id='newLapLength' name='newLapLength' placeholder="Pool Length (meters)" min="0" value={lapLength} onChange={handleChange} />
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
        <input type="number" step="0.1" id="newWaterTemp" name="newWaterTemp" placeholder="Water temperature (°C)" min="-10" max="50" value={waterTemp} onChange={handleChange} />
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
        <i onClick={addLapTime} className='icon icon-add'></i>
        <i onClick={addLapTime} className='icon icon-minus'></i>
      </div>
    </>
  );
}

// CyclingForm Component
function CyclingForm({ onFormChange, formData }) {
  const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'));
  const [distance, setDistance] = useState(formData?.distance || '');
  const [duration, setDuration] = useState(formData?.duration || '');
  const [weather, setWeather] = useState(formData?.weatherCondition || '');
  const [airTemp, setAirTemp] = useState(formData?.airTemperature || '');
  const [notes, setNotes] = useState(formData?.notes || '');
  const [bikeUsed, setBikeUsed] = useState(formData?.bikeUsed || '');
  const [terrain, setTerrain] = useState(formData?.terrain || '');

  const member = formData?.memberID || null
  console.log(formData)

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
      {formData ? (
        // What to render if formData is true
        <>
          <p>{"Session ID: " + formData.sessionID}</p>
          <p>{"Member ID: " + member.memberID}</p><br />
        </>
      ) : (<></>)
      }
      <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
      <div className='row'>
        <input type="number" step="0.01" id='newDistance' placeholder="Distance (km)" min="0" value={distance} onChange={handleChange} />
        <input type="number" step="0.01" id="newDuration" name="newDuration" placeholder="Duration (minutes)" min="0" value={duration} onChange={handleChange} />
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
        <input type="number" step="0.1" id="newAirTemp" name="newAirTemp" placeholder="Air temperature (°C)" min="-10" max="50" value={airTemp} onChange={handleChange} />
      </div>
      <textarea type="text" id="newNotes" name="newNotes" placeholder="Notes" value={notes} onChange={handleChange} />
    </>
  );
}

function NewSession({ onHide, controller, setNewSession, session, sessionData }) {
  const [selectedSport, setSelectedSport] = useState(session);
  const [formData, setFormData] = useState(sessionData || {});
  console.log("Session: " + session)
  console.log(sessionData)

  useEffect(() => {
    if (sessionData && sessionData.sessionID && session == true) {
      console.log("EDITING")
      // EDITING MODE: sessionData is present and has a sessionID
      setSelectedSport(sessionData.sportType.toLowerCase());
      setFormData({ sessionData }); // Populate formData with a copy of sessionData
    } else {
      console.log("NEW")
      // NEW SESSION MODE: sessionData is null or doesn't indicate an existing session
      setSelectedSport(session);
      setFormData({}); // Initialize for new, include default date
    }
  }, [session, sessionData]); // Re-run this effect if 'session' or 'sessionData' props change

  const handleFormChange = (dataFromChildForm) => {
    setFormData(prevData => ({
      ...prevData, // Keep existing data (like sessionID if editing)
      ...dataFromChildForm // Overwrite with new data from the specific sport form
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sessionData) {
      // Editing existing session
      controller.editTrainingSession(sessionData.sessionID, formData, setNewSession);
    } else {
      // Creating a new session
      controller.handleNewSession(formData, setNewSession);
    }
  };

  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="newSession">
        <div>
          <h2>{sessionData ? 'Edit ' + sessionData.sportType + ' Session' : 'New ' + session + ' Session'}</h2>
          <button id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></button>
        </div>
        <form id='newSessionForm' onSubmit={handleSubmit}>
          {selectedSport === 'running' && <RunningForm onFormChange={handleFormChange} formData={sessionData} />}
          {selectedSport === 'swimming' && <SwimmingForm onFormChange={handleFormChange} formData={sessionData} />}
          {selectedSport === 'cycling' && <CyclingForm onFormChange={handleFormChange} formData={sessionData} />}
          <input type="submit" value={sessionData ? 'Save ' : 'Submit'} id='register-btn' />
        </form>
      </div>
    </>
  );
}

function MainPanel({ controller, onEditSession, onViewSession }) {
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchTrainingSessions = async () => {
      let sessions = await controller.getAllTrainingSessions();
      if (sortBy) {
        switch (sortBy) {
          case 'date':
            sessions = await controller.sortTrainingSessionsByDate(sessions);
            break;
          case 'sport':
            sessions = await controller.sortTrainingSessionsBySportType(sessions);
            break;
          case 'distance':
            sessions = await controller.sortTrainingSessionsByDistance(sessions);
            break;
          default:
            break;
        }
        if (sortDirection === 'desc') {
          sessions = sessions.reverse();
        }
      }
      setTrainingSessions(sessions);
    };

    fetchTrainingSessions();
  }, [controller, sortBy, sortDirection]);

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortDirection('asc');
    }
  };

  const handleEdit = (session) => {
    onEditSession(session); // Call the passed prop to open modal in TriathlonView
  };
  const handleDelete = (sessionID) => {
    controller.deleteTrainingSession(sessionID)
  }
  const handleView = (session) => {
    onViewSession(session)
    // controller.deleteTrainingSession(session)
  }

  return (
    <>
      <main>
        <div className='box' >
          <div>
            <h2>Training Sessions</h2>
            <div className='row'> <h3>Sort by: </h3>
              <button onClick={() => handleSort('date')}>Date</button>
              <button onClick={() => handleSort('sport')}>Type</button>
              <button onClick={() => handleSort('distance')}>Distance</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sport</th>
                <th>Date</th>
                <th>Distance & Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trainingSessions.map((entry, index) => {
                // const visualData = getVisualDataForEntry(entry);
                return (
                  <tr key={index} data-sport={entry.sportType}>
                    <td className={entry.sportType + ' sport-type'}><i className={'icon icon-' + entry.sportType}></i> {entry.sportType}</td>
                    <td>{entry.date}</td>
                    <td>
                      <div className="distance-duration-visual">
                        {Array.isArray(entry.lapTimes) && (
                          <>
                            {entry.lapTimes.map((lapTime, lapIndex) => (
                              <div key={lapIndex}>
                                <div
                                  // key={`lap-dot-${lapIndex}`}
                                  className="lap-dot"
                                  style={{ left: `${(lapIndex + 1) * (100 / entry.lapTimes.length)}%` }}
                                ></div>
                                <div
                                  // key={`lap-time-${lapIndex}`}
                                  className="lap-time-label"
                                  style={{ left: `${(lapIndex + 1) * (100 / entry.lapTimes.length)}%` }}
                                >{lapTime + 's'}</div>
                              </div>
                            ))}
                            <div className="end-dot"></div>
                            <span className="distance-label">{`${entry.distance}m / ${entry.lapLength}m laps`}</span>
                          </>
                        )}
                        {!Array.isArray(entry.lapTimes) && (
                          <>
                            <div className="start-dot"></div>
                            <div className="end-dot" style={{ left: `100%` }}></div>
                            <span className="distance-label">{`${(entry.distance)} Km`}</span>
                          </>
                        )}
                        <span className='end-label'>{entry.duration % 1 === 0 ? entry.duration : entry.duration.toFixed(2)}min</span>
                      </div>
                    </td>
                    <td className="more-cell">
                      <i className='icon icon-info' onClick={() => handleView(entry)}></i>
                      <i className='icon icon-edit' onClick={() => handleEdit(entry)}></i>
                      <i className='icon icon-trash' onClick={() => handleDelete(entry.sessionID)}></i>
                    </td>
                  </tr>
                );
              })}
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
  const [viewSessionData, setViewSession] = useState(null);
  const [newSessionData, setNewSessionData] = useState(null);
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
    setViewSession(null)
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


  // For opening NewSession in 'new' mode
  const handleOpenNewSessionModal = (sessionType) => {
    setNewSessionData(null); // Clears data if there is any
    setNewSession(sessionType); // e.g., 'running'
  };

  // For opening NewSession in 'edit' mode
  const handleOpenEditModal = (sessionData) => {
    setNewSessionData(sessionData); // The full session object
    setNewSession(true); // e.g., 'running'
  };

  const handleViewSession = (session) => {
    setViewSession(session)
  }

  return (
    <>
      {/* Toaster Notifications */}
      <Toaster richColors position="top-center" />

      {/* Popups */}
      {changeSettings ? (<Settings onHide={handleHide} />) : null}
      {newSession ? (<NewSession onHide={handleHide} controller={controller} setNewSession={setNewSession} session={newSession} sessionData={newSessionData} />) : null}
      {showRegister ? <Register onHide={handleHide} onSignUp={handleSignUp} /> : null}
      {viewSessionData ? (<ViewSession session={viewSessionData} onHide={handleHide} />) : null}

      {/* Main view */}
      <SidePanel onRegister={handleRegister} onSubmit={handleSubmit} loggedIn={loggedIn} logout={handlelogout} onNewSession={handleOpenNewSessionModal} firstName={firstName} settings={handleChangeSettings} />
      {loggedIn ? (<MainPanel controller={controller} onEditSession={handleOpenEditModal} onViewSession={handleViewSession} />) : null}
    </>
  );
}

export default TriathlonView
