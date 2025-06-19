import { useState, useEffect } from 'react'

// 
// Register Popup
// 

export function Register({ onHide, onSignUp }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const username = document.getElementById('registerUsername').value
        const fName = document.getElementById('fName').value
        const lName = document.getElementById('lName').value
        onSignUp(username, fName, lName)
    }
    return (
        <>
            <div id="hide" onClick={onHide}></div>
            <div className="box" id="signup">
                <div>
                    <h2>Register</h2>
                    <i id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></i>
                </div>
                <form id='registerForm' onSubmit={handleSubmit}>
                    <input type="text" id="registerUsername" name="Username" placeholder="Username" required />
                    <input type="text" id="fName" name="fName" placeholder="First Name" required />
                    <input type="text" id="lName" name="lName" placeholder="Last Name" required />
                    <input type="submit" value="Register" id='register-btn' />
                </form>
            </div>
        </>
    )
}

// 
// View Session Popup
// 

export function ViewSession({ onHide, session, onEditSession, controller, setUpdateView }) {
    const [historyCheckResult, setHistoryCheckResult] = useState(false)
    const [swimmingDistance, setSwimmingDistance] = useState(0)
    const [swimmingDuration, setSwimmingDuration] = useState(0)
    const sessionDate = new Date(session.date)
    const formattedDate = sessionDate.toLocaleDateString('en-NZ')
    const member = JSON.parse(session?.memberID || null)

    useEffect(() => {
        if (session.sportType === 'Swimming') {
            (async () => {
                let swimmingDistanceValue = await controller.swimmingSessionDistance(session.lapLength, session.lapTimes)
                let swimmingDurationValue = await controller.swimmingSessionDuration(session.lapTimes)
                setSwimmingDistance(swimmingDistanceValue)
                setSwimmingDuration(swimmingDurationValue)
                console.log('sets sessions')
            })()
        }
        async function fetchHistoryCheck() {
            try {
                const result = await controller.checkHistory(session.sessionID)
                setHistoryCheckResult(result)
            } catch (error) {
                console.error("Error checking history:", error)
            }
        }

        fetchHistoryCheck()
    }, [session, controller])

    const handleEdit = (session) => {
        onEditSession(session)
        setUpdateView(prev => !prev)
    }
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
                    <i id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></i>
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
    )
}

// 
// Settings Popup
// 

export function Settings({ onHide, controller }) {

    const [dbName, setDbName] = useState(localStorage.getItem('dbName') || 'TryathlonApp')
    const [dbVersion, setDbVersion] = useState(parseInt(localStorage.getItem('dbVersion')) || 1)
    const [databases, setDatabases] = useState([])

    useEffect(() => {
        const fetchDatabases = async () => {
            const dbs = await controller.getDatabases()
            setDatabases(dbs)
        }
        fetchDatabases()
    }, [controller])

    const handleDelete = async (dbName) => {
        await controller.deleteDatabase(dbName, onHide)
        setUpdateView(prev => !prev)
    }

    return (
        <>
            <div id="hide" onClick={onHide}></div>
            <div className="box" id="settings">
                <div>
                    <h2>Database Configuration</h2>
                    <i id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></i>
                </div>
                <p>You may need to logout and create a new user when switching/ adding databases.</p>
                <br />
                <h4>Current Databases</h4>
                <div>
                    {databases.map((db, index) => (
                        <div className='card' key={index}>{db.name}
                            <button onClick={() => controller.handleDatabaseInit(db.name, db.version, onHide)} >Connect</button>
                            <i className='icon icon-trash' onClick={() => handleDelete(db.name)}></i>
                        </div>
                    ))}
                </div>
                <br />
                <h4>Create a new Database</h4>
                <br />
                <div className="input-container">
                    <input
                        type="text"
                        id="dbName"
                        name="dbName"
                        value={dbName}
                        onChange={(e) => setDbName(e.target.value)}
                    />
                    <label htmlFor="dbName" className={`floating-label ${dbName ? 'active' : ''}`}>
                        Database Name
                    </label>
                </div>
                <div className="input-container">
                    <input
                        type="number"
                        id="dbVersion"
                        name="dbVersion"
                        value={dbVersion}
                        onChange={(e) => setDbVersion(e.target.value)}
                    />
                    <label htmlFor="dbVersion" className={`floating-label ${dbVersion ? 'active' : ''}`}>
                        Database Version
                    </label>
                </div>
                <button onClick={() => controller.handleDatabaseInit(dbName, dbVersion, onHide)}>Connect to Database</button>
                <br />
                <div>
                    <h2>Other Settings</h2>
                </div>
                <div>
                    <button onClick={() => controller.clearBadge()} >Clear Badges</button>
                </div>
            </div>
        </>
    )
}