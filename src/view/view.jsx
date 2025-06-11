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


function ViewSession({ onHide, session, onEditSession, controller, setUpdateView }) {
  const [swimmingDistance, setSwimmingDistance] = useState(0);
  const [swimmingDuration, setSwimmingDuration] = useState(0);
  const member = session.memberID
  const sessionDate = new Date(session.date)
  const formattedDate = sessionDate.toLocaleDateString('en-NZ')
  const [historyCheckResult, setHistoryCheckResult] = useState(false);

  useEffect(() => {
    if (session.sportType === 'Swimming') {
      (async () => {
        let swimmingDistanceValue = await controller.swimmingSessionDistance(session.lapLength, session.lapTimes);
        let swimmingDurationValue = await controller.swimmingSessionDuration(session.lapTimes);
        setSwimmingDistance(swimmingDistanceValue);
        setSwimmingDuration(swimmingDurationValue);
        console.log('sets sessions')
      })();
    }
    async function fetchHistoryCheck() {
      try {
        const result = await controller.checkHistory(session.sessionID);
        setHistoryCheckResult(result);
      } catch (error) {
        console.error("Error checking history:", error);
        // Handle the error appropriately (e.g., set an error state)
      }
    }

    fetchHistoryCheck();
  }, [session, controller]);

  const handleEdit = (session) => {
    onEditSession(session)
    setUpdateView(prev => !prev)
  };
  const handleDelete = async (sessionID) => {
    await controller.deleteTrainingSession(sessionID)
    setUpdateView(prev => !prev)
  }

  const handleHistory = (sessionID) => {
    controller.restoreHistory(sessionID, onHide)
    setUpdateView(prev => !prev)
  }
  return (
    <>
      <div id="hide" onClick={onHide}></div>
      <div className="box" id="session-info">
        <div>
          <div>
            <h2 className={session.sportType + ' sport-type'}><i className={'icon icon-' + session.sportType}></i> {session.sportType}</h2>
            <h4 className='session-date'>{formattedDate}</h4><br />
          </div>
          <div>
            <p>{"Session: " + session.sessionID}</p>
            <p>{"Member: " + member.memberID}</p>
          </div>
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
                <span className="distance-label">{`${swimmingDistance} Km / ${session.lapLength}m laps`}</span>
              </>
            )}
            {session.sportType !== 'Swimming' && (
              <>
                <div className="start-dot"></div>
                <div className="end-dot" style={{ left: `100%` }}></div>
                <span className="distance-label">{`${session.distance} Km`}</span>
              </>
            )}
          </div>
          <div>

          </div></div><br />
        {session.sportType === 'Swimming' ? (
          <><br />
            <div className='card'> <p>swimming time</p> <h4>{swimmingDuration} Minutes</h4></div>
            <div className='card'> <p>Total Distance</p> <h4>{swimmingDistance} Kilometers</h4></div>
            <div className='row'>
              <div className='card'> <p>Pool Length</p> <h4>{session.lapLength} Meters</h4></div>
              <div className='card'> <p>Laps</p> <h4>{session.laps}</h4></div>
            </div>
            <div className='row'>
              <div className='card'> <p>Water temperature</p> <h4>{session.waterTemp}°C</h4></div>
              <div className='card'> <p>Stroke</p> <h4>{session.strokeType}</h4></div>
            </div>
          </>
        ) : session.sportType === 'Running' ? (
          <>
            <div className='card'> <p>Duration</p> <h4>{session.duration % 1 === 0 ? session.duration : session.duration.toFixed(2)} Minutes</h4></div>
            <div className='card'> <p>Distance</p> <h4>{session.distance % 1 === 0 ? session.distance : session.distance.toFixed(2)} Kilometers</h4></div>

            <div className='row'>
              <div className='card'> <p>Temperature</p> <h4>{session.airTemp}°C</h4></div>
              <div className='card'> <p>Weather</p> <h4>{session.weather}</h4></div>
            </div>
            <div className='card'> <p>Shoes</p> <h4>{session.shoesUsed}</h4></div>
          </>
        ) : session.sportType === 'Cycling' ? (
          <>
            <div className='card'> <p>Duration</p> <h4>{session.duration % 1 === 0 ? session.duration : session.duration.toFixed(2)} Minutes</h4></div>
            <div className='card'> <p>Distance</p> <h4>{session.distance % 1 === 0 ? session.distance : session.distance.toFixed(2)} Kilometers</h4></div>
            <div className='row'>
              <div className='card'> <p>Bike</p> <h4>{session.bikeUsed}</h4></div>
              <div className='card'> <p>Terrain</p> <h4>{session.terrain}</h4></div>
            </div>
            <div className='row'>
              <div className='card'> <p>Temperature</p> <h4>{session.airTemp}°C</h4></div>
              <div className='card'> <p>Weather</p> <h4>{session.weather}</h4></div>
            </div>
          </>
        ) : (
          // Rendered if sport doesn't match any of the above
          <p>Sport details not available or unknown sport type.</p>
        )}
        <br />
        <p>Notes</p>
        <div className='card row'><p>{session.notes}</p></div>
        <br />
        <div className='row'>
          {historyCheckResult ? (
            <i className='icon icon-return' onClick={() => handleHistory(session.sessionID)}></i>
          ) : (
            null
          )}
          <div className='popup-edit'>
            <i className='icon icon-edit' onClick={() => handleEdit(session)}></i>
            <i className='icon icon-trash' onClick={() => handleDelete(session.sessionID)}></i>

          </div>
        </div>
      </div>
    </>
  );
}

function UserPage({ logout, onNewSession, firstName, controller, setTrainingSessions, updateView }) {
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('')
  const [trainingSessions, setTrainingSessionsData] = useState([]);
  const [averagePace, setAveragePace] = useState('')
  const [totalDistance, setTotalDistance] = useState('')

  useEffect(() => {

    const fetchTrainingSessions = async () => {
      let sessions = await controller.getAllTrainingSessions();
      setTrainingSessionsData(sessions);
      setAveragePace(controller.calculateAveragePace())
      setTotalDistance(controller.calculateTotalDistance())

      if (searchType && searchQuery) {
        console.log(searchType)
        sessions = await controller.searchTrainingSessions(searchType, searchQuery);
      }

      // Calculate swimming data for each session if it's a swimming session
      const sessionsWithCalculatedData = await Promise.all(sessions.map(async (entry) => {
        if (entry.sportType === 'Swimming') {
          const swimmingDistanceValue = await controller.swimmingSessionDistance(entry.lapLength, entry.lapTimes);
          const swimmingDurationValue = await controller.swimmingSessionDuration(entry.lapTimes);
          return {
            ...entry,
            calculatedSwimmingDistance: swimmingDistanceValue,
            calculatedSwimmingDuration: swimmingDurationValue,
          };
        }
        return entry;
      }));

      let sortedSessions = sessionsWithCalculatedData;
      if (sortBy) {
        switch (sortBy) {
          case 'date':
            sortedSessions = await controller.sortTrainingSessionsByDate(sortedSessions);
            break;
          case 'sport':
            sortedSessions = await controller.sortTrainingSessionsBySportType(sortedSessions);
            break;
          case 'distance':
            sortedSessions = await controller.sortTrainingSessionsByDistance(sortedSessions);
            break;
          default:
            break;
        }
        if (sortDirection === 'desc') {
          sortedSessions = sortedSessions.reverse();
        }
      }
      setTrainingSessions(sortedSessions);

    };

    fetchTrainingSessions();
  }, [controller, sortBy, sortDirection, searchType, searchQuery, updateView]);

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortDirection('asc');
    }
  };
  return (
    <div id='userPage'>
      <div>
        <img className='logo' src={Logo} alt="Triathlete plus logo" />
        <br />
        <br />
        <h4>Log a session</h4>
        <div className='center'>
          <button className='pink button-big' id='running' onClick={() => onNewSession('running')}>Running</button>
          <button className='blue button-big' id='swimming' onClick={() => onNewSession('swimming')}>Swimming</button>
          <button className='orange button-big' id='cycling' onClick={() => onNewSession('cycling')}>Cycling</button>
        </div>

        <div className='row'> <h3>Sort by: </h3>
          <button onClick={() => handleSort('date')}>Date</button>
          <button onClick={() => handleSort('sport')}>Type</button>
          <button onClick={() => handleSort('distance')}>Distance</button>
        </div>
        <form>
          <div className="input-container">
            <label htmlFor="newSearchType">
              Search Type
            </label>
            <select id="newSearchType" name="newSearchType" onChange={(e) => setSearchType(e.target.value)}>
              <option value="" disabled>Search Type</option>
              <option value="notes">Notes</option>
              <option value="bikeUsed">Bike</option>
              <option value="shoesUsed">Shoes</option>
              <option value="distance">Distance</option>
              <option value="duration">Duration</option>
              <option value="sportType">Sport</option>
            </select>
          </div>
          <input
            type="text"
            id="searchSessions"
            placeholder="Search training sessions"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div>
          <div className='card'>
            <p>Average pace</p>
            <h4>{averagePace}</h4>
          </div>
          <div className='card'>
            <p>Total Distance</p>
            <h4>{totalDistance}</h4>
          </div>
          <div className='card'>
            <p>Total Sessions</p>
            <h4>{trainingSessions.length}</h4>
          </div>

        </div>
      </div>


      <div className='row'>
        <p>{firstName}</p>
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
  const [weather, setWeather] = useState(formData?.weather || '');
  const [airTemp, setAirTemp] = useState(formData?.airTemp || '');
  const [notes, setNotes] = useState(formData?.notes || '');
  const [shoesUsed, setShoesUsed] = useState(formData?.shoesUsed || '');
  const member = formData?.memberID || null

  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedDate = date;
    let updatedDistance = distance;
    let updatedDuration = duration;
    let updatedWeather = weather;
    let updatedAirTemp = airTemp;
    let updatedNotes = notes;
    let updatedShoesUsed = shoesUsed;

    switch (id) {
      case 'newDate':
        updatedDate = value;
        setDate(value);
        break;
      case 'newDistance':
        updatedDistance = value;
        setDistance(value);
        break;
      case 'newDuration':
        updatedDuration = value;
        setDuration(value);
        break;
      case 'newWeather':
        updatedWeather = value;
        setWeather(value);
        break;
      case 'newAirTemp':
        updatedAirTemp = value;
        setAirTemp(value);
        break;
      case 'newNotes':
        updatedNotes = value;
        setNotes(value);
        break;
      case 'newShoes':
        updatedShoesUsed = value;
        setShoesUsed(value);
        break;
      default:
        break;
    }
    // Send form data to parent component with the most recent values
    onFormChange({
      sportType: 'Running',
      date: updatedDate,
      distance: updatedDistance,
      duration: updatedDuration,
      weather: updatedWeather,
      airTemp: updatedAirTemp,
      notes: updatedNotes,
      shoesUsed: updatedShoesUsed,
    });
  };

  return (
    <>
      {formData ? (
        <>
          <p>{"Session ID: " + formData.sessionID}</p>
          <p>{"Member ID: " + member.memberID}</p><br />
        </>
      ) : (<></>)
      }
      <div className="input-container">
        <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
        <label htmlFor="newDate" className={`floating-label ${date ? 'active' : ''}`}>
          Date
        </label>
      </div>
      <div className='row'>
        <div className="input-container">
          <input type="number" step="0.01" id='newDistance' min="0" value={distance} onChange={handleChange} />
          <label htmlFor="newDistance" className={`floating-label ${distance ? 'active' : ''}`}>
            Distance (km)
          </label>
        </div>

        <div className="input-container">
          <input type="number" step="0.01" id="newDuration" name="newDuration" min="0" value={duration} onChange={handleChange} />
          <label htmlFor="newDuration" className={`floating-label ${duration ? 'active' : ''}`}>
            Duration (minutes)
          </label>
        </div>
      </div>
      <div className="input-container">
        <input type="text" id="newShoes" name="newShoes" value={shoesUsed} onChange={handleChange} />
        <label htmlFor="newShoes" className={`floating-label ${shoesUsed ? 'active' : ''}`}>
          Shoes Used
        </label>
      </div>

      <div className='row'>
        <div className="input-container">
          <select id="newWeather" name="newWeather" value={weather} onChange={handleChange}>
            <option value="" disabled>Weather Condition</option>
            <option value="Sunny">Sunny</option>
            <option value="Overcast">Overcast</option>
            <option value="Rain">Rain</option>
            <option value="Misty">Misty</option>
            <option value="Stormy">Stormy</option>
          </select>
          <label htmlFor="newWeather" className={`floating-label ${weather ? 'active' : ''}`}>
            Weather Condition
          </label>
        </div>
        <div className="input-container">
          <input type="number" step="0.1" id="newAirTemp" name="newAirTemp" min="-10" max="50" value={airTemp} onChange={handleChange} />
          <label htmlFor="newAirTemp" className={`floating-label ${airTemp ? 'active' : ''}`}>
            Air temperature (°C)
          </label>
        </div>

      </div>
      <div className="input-container">
        <textarea type="text" id="newNotes" name="newNotes" value={notes} onChange={handleChange} />
        <label htmlFor="newNotes" className={`floating-label ${notes ? 'active' : ''}`}>
          Notes
        </label>
      </div>

    </>
  );
}

// SwimmingForm Component
function SwimmingForm({ onFormChange, formData }) {
  const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'));
  const [lapLength, setLapLength] = useState(formData?.lapLength || '');
  const [waterTemp, setWaterTemp] = useState(formData?.waterTemp || '');
  const [notes, setNotes] = useState(formData?.notes || '');
  const [strokeType, setStroke] = useState(formData?.strokeType || 'Freestyle');
  const [lapTimes, setLapTimes] = useState(formData?.lapTimes || ['']);
  const member = formData?.memberID || null
  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedDate = date;
    let updatedLapLength = lapLength;
    let updatedWaterTemp = waterTemp;
    let updatedNotes = notes;
    let updatedStrokeType = strokeType;
    let updatedLapTimes = lapTimes; // Lap times are handled separately

    switch (id) {
      case 'newDate':
        updatedDate = value;
        setDate(value);
        break;
      case 'newLapLength':
        updatedLapLength = value;
        setLapLength(value);
        break;
      case 'newWaterTemp':
        updatedWaterTemp = value;
        setWaterTemp(value);
        break;
      case 'newStroke':
        updatedStrokeType = value;
        setStroke(value);
        break;
      case 'newNotes':
        updatedNotes = value;
        setNotes(value);
        break;
      default:
        break;
    }
    // Send form data to parent component with the most recent values
    onFormChange({
      sportType: 'Swimming',
      date: updatedDate,
      notes: updatedNotes,
      lapLength: updatedLapLength,
      strokeType: updatedStrokeType,
      lapTimes: updatedLapTimes, // Ensure lapTimes is the current state
      waterTemp: updatedWaterTemp,
    });
  };

  const addLapTime = () => {
    setLapTimes([...lapTimes, '']);
  };

  const removeLastLapTime = () => {
    if (lapTimes.length > 1) { // Ensure there's at least one lap time to remove
      setLapTimes(lapTimes.slice(0, -1));
    } else if (lapTimes.length === 1) {
      setLapTimes(['']); // If only one lap, clear it
    }
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
      <div className="input-container">
        <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
        <label htmlFor="newDate" className={`floating-label ${date ? 'active' : ''}`}>
          Date
        </label>
      </div>
      <div className="input-container">
        <input type="number" step="0.01" id='newLapLength' name='newLapLength' min="0" value={lapLength} onChange={handleChange} />
        <label htmlFor="newLapLength" className={`floating-label ${lapLength ? 'active' : ''}`}>
          Pool Length (meters)
        </label>
      </div>
      <div className='row'>
        <div className="input-container">
          <select id="newStroke" name="newStroke" value={strokeType} onChange={handleChange}>
            <option value="" disabled>Stroke Type</option>
            <option value="Freestyle">Freestyle</option>
            <option value="Backstroke">Backstroke</option>
            <option value="Breaststroke">Breaststroke</option>
            <option value="Butterfly">Butterfly</option>
            <option value="Sidestroke">Sidestroke</option>
            <option value="Dog Paddle">Dog Paddle</option>
          </select>
          <label htmlFor="newStroke" className={`floating-label ${strokeType ? 'active' : ''}`}>
            Stroke Type
          </label>
        </div>
        <div className="input-container">
          <input type="number" step="0.1" id="newWaterTemp" name="newWaterTemp" min="-10" max="50" value={waterTemp} onChange={handleChange} />
          <label htmlFor="newWaterTemp" className={`floating-label ${waterTemp ? 'active' : ''}`}>
            Water temperature (°C)
          </label>
        </div>
      </div>
      <div className='row'>
        <div>
          {lapTimes.map((lapTime, index) => (
            <div className="input-container" key={index}>
              <input
                type="number"
                id={`lapTime-${index}`}
                value={lapTime}
                onChange={(e) => handleLapTimeChange(index, e.target.value)}
              />
              <label htmlFor={`lapTime-${index}`} className={`floating-label ${lapTime ? 'active' : ''}`}>
                Lap Time {index + 1} (seconds)
              </label>
            </div>
          ))}
        </div>
        <div style={{ width: 'auto' }} >
          <i onClick={addLapTime} className='icon icon-add'></i>
          <i onClick={removeLastLapTime} className='icon icon-return'></i>
        </div>

      </div >
      <div className="input-container">
        <textarea type="text" id="newNotes" name="newNotes" value={notes} onChange={handleChange} />
        <label htmlFor="newNotes" className={`floating-label ${notes ? 'active' : ''}`}>
          Notes
        </label>
      </div>
    </>
  );
}

// CyclingForm Component
function CyclingForm({ onFormChange, formData }) {
  const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'));
  const [distance, setDistance] = useState(formData?.distance || '');
  const [duration, setDuration] = useState(formData?.duration || '');
  const [weather, setWeather] = useState(formData?.weather || '');
  const [airTemp, setAirTemp] = useState(formData?.airTemp || '');
  const [notes, setNotes] = useState(formData?.notes || '');
  const [bikeUsed, setBikeUsed] = useState(formData?.bikeUsed || '');
  const [terrain, setTerrain] = useState(formData?.terrain || '');

  const member = formData?.memberID || null

  const handleChange = (e) => {
    const { id, value } = e.target;
    let updatedDate = date;
    let updatedDistance = distance;
    let updatedDuration = duration;
    let updatedWeather = weather;
    let updatedAirTemp = airTemp;
    let updatedNotes = notes;
    let updatedBikeUsed = bikeUsed;
    let updatedTerrain = terrain;

    switch (id) {
      case 'newDate':
        updatedDate = value;
        setDate(value);
        break;
      case 'newDistance':
        updatedDistance = value;
        setDistance(value);
        break;
      case 'newDuration':
        updatedDuration = value;
        setDuration(value);
        break;
      case 'newTerrain':
        updatedTerrain = value;
        setTerrain(value);
        break;
      case 'newWeather':
        updatedWeather = value;
        setWeather(value);
        break;
      case 'newAirTemp':
        updatedAirTemp = value;
        setAirTemp(value);
        break;
      case 'newNotes':
        updatedNotes = value;
        setNotes(value);
        break;
      case 'newBikeUsed':
        updatedBikeUsed = value;
        setBikeUsed(value);
        break;
      default:
        break;
    }
    // Send form data to parent component with the most recent values
    onFormChange({
      sportType: 'Cycling',
      date: updatedDate,
      notes: updatedNotes,
      distance: updatedDistance,
      duration: updatedDuration,
      terrain: updatedTerrain,
      bikeUsed: updatedBikeUsed,
      airTemp: updatedAirTemp,
      weather: updatedWeather,
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
      <div className="input-container">
        <input type="date" id="newDate" name="newDate" value={date} onChange={handleChange} />
        <label htmlFor="newDate" className={`floating-label ${date ? 'active' : ''}`}>
          Date
        </label>
      </div>
      <div className='row'>
        <div className="input-container">
          <input type="number" step="0.01" id='newDistance' min="0" value={distance} onChange={handleChange} />
          <label htmlFor="newDistance" className={`floating-label ${distance ? 'active' : ''}`}>
            Distance (km)
          </label>
        </div>
        <div className="input-container">
          <input type="number" step="0.01" id="newDuration" name="newDuration" min="0" value={duration} onChange={handleChange} />
          <label htmlFor="newDuration" className={`floating-label ${duration ? 'active' : ''}`}>
            Duration (minutes)
          </label>
        </div>
      </div>
      <div className='row'>
        <div className="input-container">
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
          <label htmlFor="newTerrain" className={`floating-label ${terrain ? 'active' : ''}`}>
            Terrain
          </label>
        </div>
        <div className="input-container">
          <input type="text" id="newBikeUsed" name="newBikeUsed" value={bikeUsed} onChange={handleChange} />
          <label htmlFor="newBikeUsed" className={`floating-label ${bikeUsed ? 'active' : ''}`}>
            Bike Used
          </label>
        </div>
      </div>
      <div className='row'>
        <div className="input-container">
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
          <label htmlFor="newWeather" className={`floating-label ${weather ? 'active' : ''}`}>
            Weather Condition
          </label>
        </div>
        <div className="input-container">
          <input type="number" step="0.1" id="newAirTemp" name="newAirTemp" min="-10" max="50" value={airTemp} onChange={handleChange} />
          <label htmlFor="newAirTemp" className={`floating-label ${airTemp ? 'active' : ''}`}>
            Air temperature (°C)
          </label>
        </div>
      </div>
      <div className="input-container">
        <textarea type="text" id="newNotes" name="newNotes" value={notes} onChange={handleChange} />
        <label htmlFor="newNotes" className={`floating-label ${notes ? 'active' : ''}`}>
          Notes
        </label>
      </div>
    </>
  );
}

function NewSession({ onHide, controller, setNewSession, session, sessionData, setUpdateView }) {
  const [selectedSport, setSelectedSport] = useState(session);
  const [formData, setFormData] = useState(sessionData || {});
  console.log("Session: " + session)

  useEffect(() => {
    if (sessionData && sessionData.sessionID && session == true) {
      console.log("EDITING")
      // EDITING MODE: sessionData is present and has a sessionID
      setSelectedSport(sessionData.sportType.toLowerCase());
      setFormData(sessionData); // Populate formData with a copy of sessionData
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sessionData) {
      // Editing existing session
      await controller.editTrainingSession(sessionData.sessionID, formData, setNewSession);
    } else {
      // Creating a new session
      await controller.handleNewSession(formData, setNewSession);
    }
    setUpdateView(prev => !prev)
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

function MainPanel({ controller, onEditSession, onViewSession, trainingSessions, setUpdateView }) {

  const handleEdit = (session) => {
    onEditSession(session)
    setUpdateView(prev => !prev)
  };
  const handleDelete = async (sessionID) => {
    await controller.deleteTrainingSession(sessionID)
    setUpdateView(prev => !prev)
  }
  const handleView = (session) => {
    onViewSession(session)
    setUpdateView(prev => !prev)
  }
  return (
    <>
      <main>
        <div className='box' >
          <div>
            <h2>Training Sessions</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sport</th>
                <th>Date</th>
                <th>Distance & Duration</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trainingSessions.map((entry, index) => {
                const sessionDate = new Date(entry.date)
                const formattedDate = sessionDate.toLocaleDateString('en-NZ')
                return (
                  <tr key={index} data-sport={entry.sportType}>
                    <td className={entry.sportType + ' sport-type'}><i className={'icon icon-' + entry.sportType}></i> {entry.sportType}</td>
                    <td>{formattedDate}</td>
                    <td>
                      <div className="distance-duration-visual">
                        {Array.isArray(entry.lapTimes) && (
                          <>
                            {entry.lapTimes.map((lapTime, lapIndex) => (
                              <div key={lapIndex}>
                                <div
                                  className="lap-dot"
                                  style={{ left: `${(lapIndex + 1) * (100 / entry.lapTimes.length)}%` }}
                                ></div>
                                <div
                                  className="lap-time-label"
                                  style={{ left: `${(lapIndex + 1) * (100 / entry.lapTimes.length)}%` }}
                                >{lapTime + 's'}</div>
                              </div>
                            ))}
                            <div className="end-dot"></div>
                            <span className="distance-label">{`${entry.calculatedSwimmingDistance} Km / ${entry.lapLength}m laps`}</span>
                          </>
                        )}
                        {entry.sportType !== 'Swimming' && (
                          <>
                            <div className="start-dot"></div>
                            <div className="end-dot" style={{ left: `100%` }}></div>
                            <span className="distance-label">{`${entry.distance} Km`}</span>
                          </>
                        )}
                      </div>
                    </td><td>
                      {entry.sportType === 'Swimming' && (
                        <>
                          <span className='end-label'>{entry.calculatedSwimmingDuration} min</span>
                        </>
                      )
                      }
                      {entry.sportType !== 'Swimming' && (
                        <>
                          <span className='end-label'>{entry.duration % 1 === 0 ? entry.duration : entry.duration.toFixed(2)} min</span>
                        </>
                      )
                      }
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
      </main>
    </>
  );
}

function SidePanel({ onRegister, onSubmit, loggedIn, logout, onNewSession, firstName, controller, setTrainingSessions, updateView }) {
  return (
    <>
      <aside className='box' >
        {loggedIn ? <UserPage setTrainingSessions={setTrainingSessions} controller={controller} logout={logout} onNewSession={onNewSession} firstName={firstName} updateView={updateView} /> : <Login onRegister={onRegister} onSubmit={onSubmit} />}
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
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [updateView, setUpdateView] = useState(false);

  const handleRegister = () => {
    setShowRegister(true);
  };

  const handleHide = () => {
    setShowRegister(false)
    setNewSession(false)
    setViewSession(null)
    setUpdateView(prev => !prev)

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


  // For opening NewSession in 'new' mode
  const handleOpenNewSessionModal = (sessionType) => {
    setNewSessionData(null); // Clears data if there is any
    setNewSession(sessionType); // e.g., 'running'
  };

  // For opening NewSession in 'edit' mode
  const handleOpenEditModal = (sessionData) => {
    setNewSessionData(sessionData); // The full session object
    setViewSession(null) // hides the session view if its open
    setNewSession(true); // e.g., 'running'
  };

  const handleViewSession = (session) => {
    setViewSession(session)
  }

  const handleSetTrainingSessions = (session) => {
    setTrainingSessions(session)
  }

  return (
    <>
      {/* Toaster Notifications */}
      <Toaster richColors position="top-center" />

      {/* Popups */}
      {newSession ? (<NewSession onHide={handleHide} controller={controller} setNewSession={setNewSession} session={newSession} sessionData={newSessionData} setUpdateView={setUpdateView} />) : null}
      {showRegister ? <Register onHide={handleHide} onSignUp={handleSignUp} /> : null}
      {viewSessionData ? (<ViewSession session={viewSessionData} onHide={handleHide} controller={controller} onEditSession={handleOpenEditModal} setUpdateView={setUpdateView} />) : null}

      {/* Main view */}
      <SidePanel setTrainingSessions={handleSetTrainingSessions} onRegister={handleRegister} onSubmit={handleSubmit} loggedIn={loggedIn} logout={handlelogout} onNewSession={handleOpenNewSessionModal} firstName={firstName} controller={controller} updateView={updateView} />
      {loggedIn ? (<MainPanel trainingSessions={trainingSessions} controller={controller} onEditSession={handleOpenEditModal} onViewSession={handleViewSession} setUpdateView={setUpdateView} />) : null}
    </>
  );
}

export default TriathlonView
