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


function ViewSession({ onHide, session, onEditSession, controller }) {
    const [swimmingDistance, setSwimmingDistance] = useState(0);
    const [swimmingDuration, setSwimmingDuration] = useState(0);
    const member = session.memberID
    const sessionDate = new Date(session.date)
    const formattedDate = sessionDate.toLocaleDateString('en-NZ')

    useEffect(() => {
        if (session.sportType === 'Swimming') {
            (async () => {
                let swimmingDistanceValue = await controller.swimmingSessionDistance(session.lapLength, session.laps);
                let swimmingDurationValue = await controller.swimmingSessionDuration(session.lapTimes);
                setSwimmingDistance(swimmingDistanceValue);
                setSwimmingDuration(swimmingDurationValue);
                console.log('sets sessions')
            })();
        }
    }, [session, controller]);

    const handleEdit = (session) => {
        onEditSession(session); // Call the passed prop to open modal in TriathlonView
    };
    const handleDelete = (sessionID) => {
        controller.deleteTrainingSession(sessionID)
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
                        {session.sportType === 'Swimming' && (
                            <>
                                <span className='end-label'>{swimmingDuration} min</span>
                            </>
                        )
                        }
                        {session.sportType !== 'Swimming' && (
                            <>
                                <span className='end-label'>{session.duration % 1 === 0 ? session.duration : session.duration.toFixed(2)} min</span>
                            </>
                        )
                        }
                    </div></div><br />

                {session.sportType === 'Swimming' ? (
                    <>
                        <h4>Pool Length: </h4> <p>{session.lapLength + "m"}</p><br />
                        <h4>Laps: </h4> <p>{session.laps}</p><br />
                        <h4>Total Distance: </h4> <p>{session.duration}</p><br />
                        <h4>Stroke Type: </h4> <p>{session.strokeType}</p><br />
                        <h4>Stroke Type: </h4> <p>{session.strokeType}</p><br />
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
                <h4>Notes:</h4> <p>{session.notes}</p>
                <br />
                <div className='popup-edit'>
                    <i className='icon icon-edit' onClick={() => handleEdit(session)}></i>
                    <i className='icon icon-trash' onClick={() => handleDelete(session.sessionID)}></i>
                </div>
            </div>
        </>
    );
}
function AllSessionData({ controller }) {
    const [trainingSessions, setTrainingSessions] = useState([]);
    const [averagePace, setAveragePace] = useState('')
    const [totalDistance, setTotalDistance] = useState('')


    useEffect(() => {
        const fetchTrainingSessions = async () => {
            let sessions = await controller.getAllTrainingSessions();
            setTrainingSessions(sessions);
            setAveragePace(controller.calculateAveragePace())
            setTotalDistance(controller.calculateTotalDistance())
        };

        fetchTrainingSessions();
    }, [controller]);

    return (
        <div id='userPage'>
            <div className='card'>
                <p className='card-header'>Average pace</p>
                <p className='card-text'>{averagePace}</p>
            </div>
            <div className='card'>
                <p className='card-header'>Total Distance</p>
                <p className='card-text'>{totalDistance}</p>
            </div>

        </div>
    );
}

function UserPage({ logout, onNewSession, firstName, settings, controller }) {

    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [trainingSessions, setTrainingSessions] = useState([]);

    useEffect(() => {
        const fetchTrainingSessions = async () => {
            let sessions = await controller.getAllTrainingSessions();

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
    }, [controller, sortBy, sortDirection]);

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

                {/* Sort by should be here */}
                <div className='row'> <h3>Sort by: </h3>
                    <button onClick={() => handleSort('date')}>Date</button>
                    <button onClick={() => handleSort('sport')}>Type</button>
                    <button onClick={() => handleSort('distance')}>Distance</button>
                </div>
                <form>
                    <div className="input-container">
                        <label htmlFor="newWeather">
                            Search Type
                        </label>
                        <select id="newWeather" name="newWeather">
                            <option value="" disabled>Search Type</option>
                            <option value="notes">Notes</option>
                            <option value="bikeUsed">Bike</option>
                            <option value="shoesUsed">Shoes</option>
                            <option value="distance">Distance</option>
                            <option value="duration">Duration</option>
                            <option value="sportType">Sport</option>
                        </select>
                    </div>
                    <input type="text" id="searchSessions" placeholder="Search training sessions" />

                </form>
                <AllSessionData controller={controller} trainingSessions={trainingSessions} />
            </div>


            <div className='row'>
                <p>{firstName}</p>
                {/* <button onClick={settings} className='icon icon-settings'></button> */}
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
            sport: 'running',
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
    const [waterTemp, setWaterTemp] = useState(formData?.waterTemperature || '');
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
            sport: 'swimming',
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
    const [weather, setWeather] = useState(formData?.weatherCondition || '');
    const [airTemp, setAirTemp] = useState(formData?.airTemperature || '');
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
            sport: 'cycling',
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

function NewSession({ onHide, controller, setNewSession, session, sessionData }) {
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

function MainPanel({ controller, onEditSession, onViewSession, trainingSessions }) {

    const handleEdit = (session) => {
        onEditSession(session); // Call the passed prop to open modal in TriathlonView
    };
    const handleDelete = (sessionID) => {
        controller.deleteTrainingSession(sessionID)
    }
    const handleView = (session) => {
        onViewSession(session)
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

function SidePanel({ onRegister, onSubmit, loggedIn, logout, onNewSession, firstName, settings, controller }) {
    return (
        <>
            <aside className='box' >
                {loggedIn ? <UserPage logout={logout} onNewSession={onNewSession} firstName={firstName} settings={settings} controller={controller} /> : <Login onRegister={onRegister} onSubmit={onSubmit} />}
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
    const [trainingSessions, setTrainingSessions] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

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
        setViewSession(null) // hides the session view if its open
        setNewSession(true); // e.g., 'running'
    };

    const handleViewSession = (session) => {
        setViewSession(session)
    }

    const handleSort = (type) => {
        if (sortBy === type) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(type);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        const fetchTrainingSessions = async () => {
            let sessions = await controller.getAllTrainingSessions();

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
    }, [controller, sortBy, sortDirection]);

    return (
        <>
            {/* Toaster Notifications */}
            <Toaster richColors position="top-center" />

            {/* Popups */}
            {changeSettings ? (<Settings onHide={handleHide} />) : null}
            {newSession ? (<NewSession onHide={handleHide} controller={controller} setNewSession={setNewSession} session={newSession} sessionData={newSessionData} />) : null}
            {showRegister ? <Register onHide={handleHide} onSignUp={handleSignUp} /> : null}
            {viewSessionData ? (<ViewSession session={viewSessionData} onHide={handleHide} controller={controller} onEditSession={handleOpenEditModal} />) : null}

            {/* Main view */}
            <SidePanel
                onRegister={handleRegister}
                onSubmit={handleSubmit}
                loggedIn={loggedIn}
                logout={handlelogout}
                onNewSession={handleOpenNewSessionModal}
                firstName={firstName}
                settings={handleChangeSettings}
                controller={controller}
            />
            {loggedIn ? (<MainPanel trainingSessions={trainingSessions} controller={controller} onEditSession={handleOpenEditModal} onViewSession={handleViewSession} />) : null}
        </>
    );
}

export default TriathlonView