import { useState, useEffect } from 'react'
import { format } from 'date-fns'

// RunningForm Component
function RunningForm({ onFormChange, formData }) {
    const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'))
    const [distance, setDistance] = useState(formData?.distance || '')
    const [duration, setDuration] = useState(formData?.duration || '')
    const [weather, setWeather] = useState(formData?.weather || '')
    const [airTemp, setAirTemp] = useState(formData?.airTemp || '')
    const [notes, setNotes] = useState(formData?.notes || '')
    const [shoesUsed, setShoesUsed] = useState(formData?.shoesUsed || '')

    const member = JSON.parse(formData?.memberID || null)

    const handleChange = (e) => {
        const { id, value } = e.target
        let updatedDate = date
        let updatedDistance = distance
        let updatedDuration = duration
        let updatedWeather = weather
        let updatedAirTemp = airTemp
        let updatedNotes = notes
        let updatedShoesUsed = shoesUsed

        switch (id) {
            case 'newDate':
                updatedDate = value
                setDate(value)
                break
            case 'newDistance':
                updatedDistance = value
                setDistance(value)
                break
            case 'newDuration':
                updatedDuration = value
                setDuration(value)
                break
            case 'newWeather':
                updatedWeather = value
                setWeather(value)
                break
            case 'newAirTemp':
                updatedAirTemp = value
                setAirTemp(value)
                break
            case 'newNotes':
                updatedNotes = value
                setNotes(value)
                break
            case 'newShoes':
                updatedShoesUsed = value
                setShoesUsed(value)
                break
            default:
                break
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
        })
    }

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
                        <option value="Headwind">Headwind</option>
                        <option value="Tailwind">Tailwind</option>
                        <option value="Crosswind">Crosswind</option>
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
    )
}

// SwimmingForm Component
function SwimmingForm({ onFormChange, formData }) {
    const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'))
    const [lapLength, setLapLength] = useState(formData?.lapLength || '')
    const [waterTemp, setWaterTemp] = useState(formData?.waterTemp || '')
    const [notes, setNotes] = useState(formData?.notes || '')
    const [strokeType, setStroke] = useState(formData?.strokeType || 'Freestyle')
    const [lapTimes, setLapTimes] = useState(formData?.lapTimes || [''])
    const member = JSON.parse(formData?.memberID || null)
    const handleChange = (e) => {
        const { id, value } = e.target
        let updatedDate = date
        let updatedLapLength = lapLength
        let updatedWaterTemp = waterTemp
        let updatedNotes = notes
        let updatedStrokeType = strokeType
        let updatedLapTimes = lapTimes // Lap times are handled separately

        switch (id) {
            case 'newDate':
                updatedDate = value
                setDate(value)
                break
            case 'newLapLength':
                updatedLapLength = value
                setLapLength(value)
                break
            case 'newWaterTemp':
                updatedWaterTemp = value
                setWaterTemp(value)
                break
            case 'newStroke':
                updatedStrokeType = value
                setStroke(value)
                break
            case 'newNotes':
                updatedNotes = value
                setNotes(value)
                break
            default:
                break
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
        })
    }

    const addLapTime = () => {
        setLapTimes([...lapTimes, ''])
    }

    const removeLastLapTime = () => {
        if (lapTimes.length > 1) { // Ensure there's at least one lap time to remove
            setLapTimes(lapTimes.slice(0, -1))
        } else if (lapTimes.length === 1) {
            setLapTimes(['']) // If only one lap, clear it
        }
        onFormChange({
            sportType: 'Swimming',
            date: date,
            notes: notes,
            lapLength: lapLength,
            strokeType: strokeType,
            lapTimes: lapTimes, // Ensure lapTimes is the current state
            waterTemp: waterTemp,
        });
    }

    const handleLapTimeChange = (index, value) => {
        const newLapTimes = [...lapTimes]
        newLapTimes[index] = value
        setLapTimes(newLapTimes);
        onFormChange({
            sportType: 'Swimming',
            date: date,
            notes: notes,
            lapLength: lapLength,
            strokeType: strokeType,
            lapTimes: newLapTimes, // Ensure lapTimes is the current state
            waterTemp: waterTemp,
        });
    }

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
    )
}

// CyclingForm Component
function CyclingForm({ onFormChange, formData }) {
    const [date, setDate] = useState(formData?.date || format(new Date(), 'yyyy-MM-dd'))
    const [distance, setDistance] = useState(formData?.distance || '')
    const [duration, setDuration] = useState(formData?.duration || '')
    const [weather, setWeather] = useState(formData?.weather || '')
    const [airTemp, setAirTemp] = useState(formData?.airTemp || '')
    const [notes, setNotes] = useState(formData?.notes || '')
    const [bikeUsed, setBikeUsed] = useState(formData?.bikeUsed || '')
    const [terrain, setTerrain] = useState(formData?.terrain || '')

    const member = JSON.parse(formData?.memberID || null)

    const handleChange = (e) => {
        const { id, value } = e.target
        let updatedDate = date
        let updatedDistance = distance
        let updatedDuration = duration
        let updatedWeather = weather
        let updatedAirTemp = airTemp
        let updatedNotes = notes
        let updatedBikeUsed = bikeUsed
        let updatedTerrain = terrain

        switch (id) {
            case 'newDate':
                updatedDate = value
                setDate(value)
                break
            case 'newDistance':
                updatedDistance = value
                setDistance(value)
                break
            case 'newDuration':
                updatedDuration = value
                setDuration(value)
                break
            case 'newTerrain':
                updatedTerrain = value
                setTerrain(value)
                break
            case 'newWeather':
                updatedWeather = value
                setWeather(value)
                break
            case 'newAirTemp':
                updatedAirTemp = value
                setAirTemp(value)
                break
            case 'newNotes':
                updatedNotes = value
                setNotes(value)
                break
            case 'newBikeUsed':
                updatedBikeUsed = value
                setBikeUsed(value)
                break
            default:
                break
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
        })
    }

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
    )
}

function NewSession({ onHide, controller, setNewSession, session, sessionData, setUpdateView }) {
    const [selectedSport, setSelectedSport] = useState(session)
    const [formData, setFormData] = useState(sessionData || {})
    const [historyCheckResult, setHistoryCheckResult] = useState(false)
    console.log("Session: " + session)

    useEffect(() => {
        if (sessionData && sessionData.sessionID && session == true) {
            console.log("EDITING")
            // EDITING MODE: sessionData is present and has a sessionID
            setSelectedSport(sessionData.sportType.toLowerCase())
            setFormData(sessionData) // Populate formData with a copy of sessionData
        } else {
            console.log("NEW")
            // NEW SESSION MODE: sessionData is null or doesn't indicate an existing session
            setSelectedSport(session)
            setFormData({}) // Initialize for new, include default date
        }
        async function fetchHistoryCheck() {
            try {
                const result = await controller.checkHistory(sessionData.sessionID)
                setHistoryCheckResult(result)
            } catch (error) {
                console.error("Error checking history:", error)
            }
        }

        fetchHistoryCheck()
    }, [session, sessionData, controller]) // Re-run this effect if 'session' or 'sessionData' props change

    const handleFormChange = (dataFromChildForm) => {
        setFormData(prevData => ({
            ...prevData, // Keep existing data (like sessionID if editing)
            ...dataFromChildForm // Overwrite with new data from the specific sport form
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (sessionData) {
            // Editing existing session
            await controller.editTrainingSession(sessionData.sessionID, formData, setNewSession)
        } else {
            // Creating a new session
            await controller.handleNewSession(formData, setNewSession)
        }
        setUpdateView(prev => !prev)
    }
    const handleHistory = (sessionID) => {
        controller.restoreHistory(sessionID, onHide)
        setUpdateView(prev => !prev)
    }

    return (
        <>
            <div id="hide" onClick={onHide}></div>
            <div className="box" id="newSession">
                <div>
                    <h2>{sessionData ? 'Edit ' + sessionData.sportType + ' Session' : 'New ' + session + ' Session'}</h2>
                    <i id="closeNewUser" className="icon icon-close" alt="Close" onClick={onHide}></i>
                </div>
                <form id='newSessionForm' onSubmit={handleSubmit}>
                    {selectedSport === 'running' && <RunningForm onFormChange={handleFormChange} formData={sessionData} />}
                    {selectedSport === 'swimming' && <SwimmingForm onFormChange={handleFormChange} formData={sessionData} />}
                    {selectedSport === 'cycling' && <CyclingForm onFormChange={handleFormChange} formData={sessionData} />}

                    <div className='row'>
                        {historyCheckResult ? (
                            <i className='icon icon-return' onClick={() => handleHistory(sessionData.sessionID)}></i>
                        ) : (
                            null
                        )}
                        <input type="submit" value={sessionData ? 'Save ' : 'Submit'} id='register-btn' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewSession