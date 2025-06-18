import { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner'

// Import views
import NewSession from './createSessionView'
import { Settings, ViewSession, Register } from './popupsView'
import './glowView'

// Import assets
import Logo from '../../assets/Logo.webp'


function Login({ onRegister, onSubmit, settings }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    onSubmit(username)
  }
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
        <div className='row'>
          <button onClick={settings} className='icon icon-settings'></button>
        </div>
      </div>
    </div>
  )
}

function UserPage({ logout, onNewSession, firstName, controller, setTrainingSessions, updateView, settings }) {
  const [sortBy, setSortBy] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchType, setSearchType] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [trainingSessions, setTrainingSessionsData] = useState([])
  const [averagePace, setAveragePace] = useState('')
  const [totalDistance, setTotalDistance] = useState('')
  const [totalMembers, setTotalMembers] = useState(0)
  const [runningSessions, setRunningSessions] = useState(0)
  const [swimmingSessions, setSwimmingSessions] = useState(0)
  const [cyclingSessions, setCyclingSessions] = useState(0)

  useEffect(() => {

    const fetchTrainingSessions = async () => {
      let sessions = await controller.getAllTrainingSessions()
      setTrainingSessionsData(sessions)
      setAveragePace(controller.calculateAveragePace())
      setTotalDistance(controller.calculateTotalDistance())
      setTotalMembers(controller.calculateTotalMembers())
      setRunningSessions(controller.calculateRunningSessions())
      setSwimmingSessions(controller.calculateSwimmingSessions())
      setCyclingSessions(controller.calculateCyclingSessions())

      if (searchQuery) {
        sessions = await controller.searchTrainingSessions(searchType, searchQuery)
      }

      // Calculate swimming data for each session if it's a swimming session
      const sessionsWithCalculatedData = await Promise.all(sessions.map(async (entry) => {
        if (entry.sportType === 'Swimming') {
          const swimmingDistanceValue = await controller.swimmingSessionDistance(entry.lapLength, entry.lapTimes)
          const swimmingDurationValue = await controller.swimmingSessionDuration(entry.lapTimes)
          return {
            ...entry,
            calculatedSwimmingDistance: swimmingDistanceValue,
            calculatedSwimmingDuration: swimmingDurationValue,
          }
        }
        return entry
      }))

      let sortedSessions = sessionsWithCalculatedData
      if (sortBy) {
        switch (sortBy) {
          case 'date':
            sortedSessions = await controller.sortTrainingSessionsByDate(sortedSessions)
            break
          case 'sport':
            sortedSessions = await controller.sortTrainingSessionsBySportType(sortedSessions)
            break
          case 'distance':
            sortedSessions = await controller.sortTrainingSessionsByDistance(sortedSessions)
            break
          default:
            break
        }
        if (sortDirection === 'desc') {
          sortedSessions = sortedSessions.reverse()
        }
      }
      setTrainingSessions(sortedSessions)

    }

    fetchTrainingSessions()
  }, [controller, sortBy, sortDirection, searchType, searchQuery, updateView])

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(type)
      setSortDirection('asc')
    }
  }
  return (
    <div id='userPage'>
      <div>
        <img className='logo' src={Logo} alt="Triathlete plus logo" />
        <br />
        <br />
        <h3>Log a session</h3>
        <div className='center'>
          <button className='pink button-big' id='running' onClick={() => onNewSession('running')}>Running</button>
          <button className='blue button-big' id='swimming' onClick={() => onNewSession('swimming')}>Swimming</button>
          <button className='orange button-big' id='cycling' onClick={() => onNewSession('cycling')}>Cycling</button>
        </div>
        <br />
        <form>
          <div className="row">
            <input
              type="text"
              id="searchSessions"
              placeholder="Search training sessions"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select id="newSearchType" name="newSearchType" onChange={(e) => setSearchType(e.target.value)}>
              <option value="" selected disabled>Filter by</option>
              <option value="notes">Notes</option>
              <option value="date">Date</option>
              <option value="bikeUsed">Bike</option>
              <option value="shoesUsed">Shoes</option>
              <option value="distance">Distance</option>
              <option value="duration">Duration</option>
              <option value="sportType">Sport</option>
            </select>
          </div>
        </form>
        <div className='row'> <h4>Sort by: </h4>
          <button onClick={() => handleSort('date')}>Date</button>
          <button onClick={() => handleSort('sport')}>Type</button>
          <button onClick={() => handleSort('distance')}>Distance</button>
        </div>
        <br />
        <div>
          <div className='card'>
            <p>Average pace</p>
            <h4>{averagePace}</h4>
          </div>
          <div className='card'>
            <p>Total Distance</p>
            <h4>{totalDistance}</h4>
          </div>
        </div>
      </div>
      <div>
        <div className='row'>
          <div className='card'>
            <p>Total Members</p>
            <h4>{totalMembers}</h4>
          </div>
          <div className='card'>
            <p>Total Sessions</p>
            <h4>{trainingSessions.length}</h4>
          </div>
        </div>
        <div className='row'>
          <div className='card'>
            <p>Running</p>
            <h4>{runningSessions}</h4>
          </div>
          <div className='card'>
            <p>Swimming</p>
            <h4>{swimmingSessions}</h4>
          </div>
          <div className='card'>
            <p>Cycling</p>
            <h4>{cyclingSessions}</h4>
          </div>
        </div>
        <div className='row'>
          <p>{firstName}</p>
          <button onClick={settings} className='icon icon-settings'></button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

function MainPanel({ controller, onEditSession, onViewSession, trainingSessions, setUpdateView }) {

  const handleEdit = (session) => {
    onEditSession(session)
    setUpdateView(prev => !prev)
  }
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
              {trainingSessions && trainingSessions.length > 0 ? (
                trainingSessions.map((entry, index) => {
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
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No training sessions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

function SidePanel({ onRegister, onSubmit, loggedIn, logout, onNewSession, firstName, controller, setTrainingSessions, updateView, settings }) {
  return (
    <>
      <aside className='box' >
        {loggedIn ? <UserPage setTrainingSessions={setTrainingSessions} controller={controller} logout={logout} onNewSession={onNewSession} firstName={firstName} updateView={updateView} settings={settings} /> : <Login onRegister={onRegister} onSubmit={onSubmit} settings={settings} />}
      </aside>
    </>
  )
}

function TriathlonView({ controller }) {
  const userDetails = controller.HandleGettingUserDetails() // Gets user details
  const [firstName, setFirstName] = useState(userDetails ? userDetails.fName : "") // Show users name
  const [showRegister, setShowRegister] = useState(false)
  const [newSession, setNewSession] = useState(false)
  const [changeSettings, setChangeSettings] = useState(false)
  const [viewSessionData, setViewSession] = useState(null)
  const [newSessionData, setNewSessionData] = useState(null)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LoggedIn') === 'true')
  const [trainingSessions, setTrainingSessions] = useState([])
  const [updateView, setUpdateView] = useState(false)

  const handleRegister = () => {
    setShowRegister(true)
  }

  const handleHide = () => {
    setShowRegister(false)
    setNewSession(false)
    setViewSession(null)
    setChangeSettings(false)
    setUpdateView(prev => !prev)

  }

  const handleChangeSettings = () => {
    setChangeSettings(true)
  }

  const handleSignUp = (username, fName, lName) => {
    controller.handleSignUp(username, fName, lName, setShowRegister)
  }
  const handleSubmit = async (username) => {
    controller.handleLogin(username, setLoggedIn, setFirstName)
  }
  const handlelogout = () => {
    controller.handleLogout(setLoggedIn)
  }


  // For opening NewSession in 'new' mode
  const handleOpenNewSessionModal = (sessionType) => {
    setNewSessionData(null) // Clears data if there is any
    setNewSession(sessionType) // e.g., 'running'
  }

  // For opening NewSession in 'edit' mode
  const handleOpenEditModal = (sessionData) => {
    setNewSessionData(sessionData) // The full session object
    setViewSession(null) // hides the session view if its open
    setNewSession(true) // e.g., 'running'
  }

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
      {changeSettings ? (<Settings onHide={handleHide} controller={controller} />) : null}
      {showRegister ? <Register onHide={handleHide} onSignUp={handleSignUp} /> : null}
      {viewSessionData ? (<ViewSession session={viewSessionData} onHide={handleHide} controller={controller} onEditSession={handleOpenEditModal} setUpdateView={setUpdateView} />) : null}

      {/* New Session Popup */}
      {newSession ? (<NewSession onHide={handleHide} controller={controller} setNewSession={setNewSession} session={newSession} sessionData={newSessionData} setUpdateView={setUpdateView} />) : null}

      {/* Main view */}
      <SidePanel setTrainingSessions={handleSetTrainingSessions} onRegister={handleRegister} onSubmit={handleSubmit} loggedIn={loggedIn} logout={handlelogout} onNewSession={handleOpenNewSessionModal} firstName={firstName} controller={controller} updateView={updateView} settings={handleChangeSettings} />
      {loggedIn ? (<MainPanel trainingSessions={trainingSessions} controller={controller} onEditSession={handleOpenEditModal} onViewSession={handleViewSession} setUpdateView={setUpdateView} />) : null}
    </>
  )
}

export default TriathlonView
