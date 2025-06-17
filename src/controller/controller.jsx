import { toast } from 'sonner'

class TriathlonController {
    constructor(triathlonData, member) {
        this.triathlonData = triathlonData
        this.member = member

        this.setupDatabase();

        this.findTrainingSessionByID = this.findTrainingSessionByID.bind(this)
        this.editTrainingSession = this.editTrainingSession.bind(this)
        this.HandleGettingUserDetails = this.HandleGettingUserDetails.bind(this)
    }

    async setupDatabase() {
        try {
            let dbName = localStorage.getItem('dbName')
            if (!dbName) {
                dbName = 'TryathlonApp'
                localStorage.setItem('dbName', dbName)
            }
            let dbVersion = localStorage.getItem('dbVersion')
            if (!dbVersion) {
                dbVersion = 1
                localStorage.setItem('dbVersion', dbVersion)
            } else {
                dbVersion = parseInt(dbVersion)
            }
            await this.triathlonData.initialiseAndLoad(dbName, dbVersion)
            console.log('setup good')
            // toast.success('Connected to Database')
        } catch (error) {
            console.error('Error setting up:', error)
            toast.error(error.message)
        }
    }

    async getAllTrainingSessions() {
        try {
            const trainingSessions = await this.triathlonData.getAllTrainingSessions()
            return trainingSessions
        } catch (error) {
            console.error("Error fetching training sessions:", error)
            toast('Failed to load training sessions. Refresh to try again.', {
                action: {
                    label: 'Refresh',
                    onClick: () => window.location.reload()
                }
            })
            return []
        }
    }

    async sortTrainingSessionsByDate(trainingSessions) {
        return await this.triathlonData.sortTrainingSessionsByDate(trainingSessions)
    }

    async sortTrainingSessionsBySportType(trainingSessions) {
        return await this.triathlonData.sortTrainingSessionsBySportType(trainingSessions)
    }

    async sortTrainingSessionsByDistance(trainingSessions) {
        return await this.triathlonData.sortTrainingSessionsByDistance(trainingSessions)
    }

    async searchTrainingSessions(searchType, searchQuery) {
        return await this.triathlonData.searchTrainingSessions(searchType, searchQuery)
    }

    async handleLogin(username, setLoggedIn, setFirstName) {
        try {
            const loginResult = await this.member.login(username)
            if (!loginResult) {
                throw new Error('Invalid username')
            }
            console.log('User Logged in')
            toast.success('Logged in')
            setLoggedIn(true)
            setFirstName(loginResult.fName)
            return loginResult
        } catch (error) {
            console.error('Error Logging in user:', error)
            toast.error(error.message)
            return
        }
    }
    async handleSignUp(userName, fName, lName, setShowRegister) {
        try {
            await this.member.createMember(userName, fName, lName)
            console.log('User registered successfully')
            toast.success('Registration successful!')

            setShowRegister(false)
        } catch (error) {
            console.error('Error registering user:', error)
            toast.error(error.message)
        }
    }
    async handleLogout(setLoggedIn) {
        try {
            await this.member.logout()
            toast.success('Logged out')
            this.clearBadge() // Clears badge count on logout
            setLoggedIn(false)
            return true
        } catch (error) {
            console.error('Error logging out user:', error)
            toast.error('Logout failed.')
            return false
        }
    }
    //User Testing
    HandleGettingUserDetails() {
        const currentUser = window.localStorage.getItem("currentUser")
        if (currentUser) {
            const user = JSON.parse(currentUser)
            return user
        }
    }

    async calculateAveragePace() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions()
        console.log(trainingSessions)
        return await this.triathlonData.calculateAveragePace(trainingSessions)
    }

    async calculateTotalDistance() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions()
        console.log(trainingSessions)
        return await this.triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions)
    }

    async calculateTotalMembers() {
        let result = await this.member.getAllMembers()
        return parseInt(result.length)
    }

    async calculateRunningSessions() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions()
        return trainingSessions.filter(session => session.sportType === 'Running').length
    }

    async calculateSwimmingSessions() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions()
        return trainingSessions.filter(session => session.sportType === 'Swimming').length
    }

    async calculateCyclingSessions() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions()
        return trainingSessions.filter(session => session.sportType === 'Cycling').length
    }

    async handleNewSession(formData, setNewSession) {
        try {
            if (formData.sportType === 'Swimming') {
                const parsedLapLength = parseFloat(formData.lapLength)
                const parsedWaterTemp = parseFloat(formData.waterTemp)
                const parsedLapTimes = formData.lapTimes.map(lapTime => parseFloat(lapTime))
                console.log(formData.notes + formData.strokeType)
                await this.triathlonData.CreateSwimmingSession(formData.date, formData.notes, parsedLapLength, formData.strokeType, parsedLapTimes, parsedWaterTemp)
                console.log('Swimming session created successfully')
                toast.success('Swimming Session Created')
                this.addBadge()
                setNewSession(false)
            } else if (formData.sportType === 'Cycling') {
                const { date, notes, distance, duration, terrain, bikeUsed, airTemp, weather, } = formData
                const parsedDistance = parseFloat(distance)
                const parsedDuration = parseFloat(duration)
                const parsedAirTemp = parseFloat(airTemp)
                await this.triathlonData.CreateCyclingSession(date, notes, parsedDistance, parsedDuration, terrain, bikeUsed, parsedAirTemp, weather)
                console.log('Cycling session created successfully')
                toast.success('Cycling Session Created')
                this.addBadge()
                setNewSession(false)
            } else if (formData.sportType === 'Running') {
                const { date, notes, distance, duration, shoesUsed, weather, airTemp } = formData
                const parsedDistance = parseFloat(distance)
                const parsedDuration = parseFloat(duration)
                const parsedAirTemp = parseFloat(airTemp)
                await this.triathlonData.CreateRunningSession(date, notes, parsedDistance, parsedDuration, shoesUsed, parsedAirTemp, weather)
                console.log('Running session created successfully')
                toast.success('Running Session Created')
                this.addBadge()
                setNewSession(false)
            } else {
                console.log('Invalid sport type')
                toast.error('Invalid sport type')
            }
        } catch (error) {
            console.error('Error creating session:', error)
            toast.error(error.message)
        }
    }

    async findTrainingSessionByID(sessionID) {
        try {
            const sessionData = await this.triathlonData.findTrainingSessionByID(sessionID)
            return sessionData
        } catch (error) {
            console.error('Error finding training session:', error)
            toast.error(error.message)
            return null
        }
    }

    async swimmingSessionDistance(lapLength, lapTimes) {
        return this.triathlonData.getTotalDistance(lapLength, lapTimes)
    }
    async swimmingSessionDuration(lapTimes) {
        return this.triathlonData.getTotalDuration(lapTimes)
    }

    async checkHistory(sessionID) {
        return this.triathlonData.checkHistory(sessionID)
    }

    async restoreHistory(sessionID, onHide) {
        try {
            const history = await this.triathlonData.restoreTrainingSession(sessionID)
            toast.success('Training Session Restored.')
            this.addBadge()
            onHide(true)
            return history
        } catch (error) {
            console.error('Error restoring training session:', error)
            toast.error(error.message)
            return null
        }
    }

    async editTrainingSession(sessionID, updatedSession, setNewSession) {
        try {
            await this.triathlonData.editTrainingSession(sessionID, updatedSession)
            console.log('Training session edited successfully')
            toast.success('Training session edited successfully')
            setNewSession(false)
            this.addBadge()
        } catch (error) {
            console.error('Error editing training session:', error)
            toast.error(error.message)
        }
    }
    async deleteTrainingSession(sessionID) {
        try {
            await this.triathlonData.deleteTrainingSession(sessionID)
            console.log('Training session deleted successfully')
            toast.success('Training session deleted successfully')
            this.addBadge()
        } catch (error) {
            console.error('Error deleting training session:', error)
            toast.error(error.message)
        }
    }

    async handleDatabaseInit(dbName, version, onHide) {
        try {
            await this.triathlonData.initialiseAndLoad(dbName, version)
            localStorage.setItem('dbName', dbName)
            localStorage.setItem('dbVersion', version)
            console.log('Database initialised successfully')
            toast.success('Database initialised successfully')
            onHide(true)
        } catch (error) {
            console.error('Error initialising database:', error)
            toast.error(error.message)
        }
    }

    async getDatabases() {
        if (window.indexedDB && window.indexedDB.databases) {
            const dbs = await window.indexedDB.databases()
            return dbs.map(db => ({ name: db.name, version: db.version })).filter(db => db.name) // Filter out null names
        } else {
            console.error("IndexedDB databases() method is not supported in this browser.")
            return []
        }
    }

    async addBadge() {
        // Check if the Badging API is supported
        if ("setAppBadge" in navigator && "clearAppBadge" in navigator) {
            try {
                let currentBadgeCount = parseInt(
                    localStorage.getItem("badgeCount") || "0"
                ) // Get the current badge count from local storage
                currentBadgeCount++ // Increment the badge count
                await navigator.setAppBadge(currentBadgeCount) // Set the new badge count
                localStorage.setItem("badgeCount", currentBadgeCount) // Store the updated badge count in local storage
            } catch (error) {
                console.error("Error updating badge count:", error)
            }
        } else {
            console.warn("Badging API is not supported in this browser.")
        }
    }

    async clearBadge() {
        // Check if the Badging API is supported
        if ("setAppBadge" in navigator && "clearAppBadge" in navigator) {
            try {
                let currentBadgeCount = 0
                await navigator.clearAppBadge() // Clears badge
                localStorage.setItem("badgeCount", currentBadgeCount) // Resets badge count
            } catch (error) {
                console.error("Error updating badge count:", error)
            }
        } else {
            console.warn("Badging API is not supported in this browser.")
        }
    }
}

export default TriathlonController
