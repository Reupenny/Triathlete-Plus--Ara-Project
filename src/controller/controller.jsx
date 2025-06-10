import { toast } from 'sonner'

class TriathlonController {
    constructor(triathlonData, member, swimmingSession) {
        this.triathlonData = triathlonData
        this.member = member
        this.swimmingSession = swimmingSession

        // Setup
        try {
            this.triathlonData.initialiseAndLoad()
            console.log('setup good');
        } catch (error) {
            console.error('Error setting up:', error);
        }
        this.findTrainingSessionByID = this.findTrainingSessionByID.bind(this);
        this.editTrainingSession = this.editTrainingSession.bind(this);
        this.HandleGettingUserDetails = this.HandleGettingUserDetails.bind(this);
    }

    async getAllTrainingSessions() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions();
        return trainingSessions;
    }

    async sortTrainingSessionsByDate(trainingSessions) {
        return await this.triathlonData.sortTrainingSessionsByDate(trainingSessions);
    }

    async sortTrainingSessionsBySportType(trainingSessions) {
        return await this.triathlonData.sortTrainingSessionsBySportType(trainingSessions);
    }

    async sortTrainingSessionsByDistance(trainingSessions) {
        return await this.triathlonData.sortTrainingSessionsByDistance(trainingSessions);
    }

    async searchTrainingSessions(searchType, searchQuery) {
        return await this.triathlonData.searchTrainingSessions(searchType, searchQuery);
    }

    async handleLogin(username, setLoggedIn, setFirstName) {
        try {
            const loginResult = await this.member.login(username);
            if (!loginResult) {
                throw new Error('Invalid username');
            }
            console.log('User Logged in');
            toast.success('Logged in')
            setLoggedIn(true)
            setFirstName(loginResult.fName);
            return loginResult
        } catch (error) {
            console.error('Error Logging in user:', error);
            toast.error(error.message)
            return
        }
    }
    async handleSignUp(userName, fName, lName, setShowRegister) {
        try {
            await this.member.createMember(userName, fName, lName);
            console.log('User registered successfully');
            toast.success('Registration successful!')

            setShowRegister(false)
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error(error.message);
        }
    }
    async handleLogout(setLoggedIn) {
        try {
            await this.member.logout();
            toast.success('Logged out')
            setLoggedIn(false)
            return true
        } catch (error) {
            console.error('Error logging out user:', error);
            toast.error('Logout failed.');
            return false;
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
        const trainingSessions = await this.triathlonData.getAllTrainingSessions();
        console.log(trainingSessions)
        return await this.triathlonData.calculateAveragePace(trainingSessions);
    }

    async calculateTotalDistance() {
        const trainingSessions = await this.triathlonData.getAllTrainingSessions();
        console.log(trainingSessions)
        return await this.triathlonData.calculateTotalDistanceForDatePeriod(trainingSessions)
    }

    async handleNewSession(formData, setNewSession) {
        try {
            if (formData.sportType === 'Swimming') {
                const parsedLapLength = parseFloat(formData.lapLength);
                const parsedWaterTemp = parseFloat(formData.waterTemp);
                const parsedLapTimes = formData.lapTimes.map(lapTime => parseFloat(lapTime));
                console.log(formData.notes + formData.strokeType)
                await this.triathlonData.CreateSwimmingSession(formData.date, formData.notes, parsedLapLength, formData.strokeType, parsedLapTimes, parsedWaterTemp)
                console.log('Swimming session created successfully');
                toast.success('Swimming Session Created');
                setNewSession(false)
            } else if (formData.sportType === 'Cycling') {
                const { date, notes, distance, duration, terrain, bikeUsed, airTemp, weather, } = formData;
                const parsedDistance = parseFloat(distance);
                const parsedDuration = parseFloat(duration);
                const parsedAirTemp = parseFloat(airTemp);
                await this.triathlonData.CreateCyclingSession(date, notes, parsedDistance, parsedDuration, terrain, bikeUsed, parsedAirTemp, weather)
                console.log('Cycling session created successfully');
                toast.success('Cycling Session Created');
                setNewSession(false)
            } else if (formData.sportType === 'Running') {
                const { date, notes, distance, duration, shoesUsed, weather, airTemp } = formData;
                const parsedDistance = parseFloat(distance);
                const parsedDuration = parseFloat(duration);
                const parsedAirTemp = parseFloat(airTemp);
                await this.triathlonData.CreateRunningSession(date, notes, parsedDistance, parsedDuration, shoesUsed, parsedAirTemp, weather);
                console.log('Running session created successfully');
                toast.success('Running Session Created');
                setNewSession(false)
            } else {
                console.log('Invalid sport type');
                toast.error('Invalid sport type');
            }
        } catch (error) {
            console.error('Error creating session:', error);
            toast.error(error.message);
        }
    }

    async findTrainingSessionByID(sessionID) {
        try {
            const sessionData = await this.triathlonData.findTrainingSessionByID(sessionID);
            return sessionData;
        } catch (error) {
            console.error('Error finding training session:', error);
            toast.error(error.message);
            return null;
        }
    }
    async searchTrainingSessions(searchType, searchQuery) {
        return this.triathlonData.searchTrainingSessions(searchType, searchQuery)
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
            toast.success('Training Session Restored.');
            onHide(true)
            return history
        } catch (error) {
            console.error('Error restoring training session:', error);
            toast.error(error.message);
            return null;
        }
    }

    async editTrainingSession(sessionID, updatedSession, setNewSession) {
        try {
            await this.triathlonData.editTrainingSession(sessionID, updatedSession);
            console.log('Training session edited successfully');
            toast.success('Training session edited successfully');
            setNewSession(false)
        } catch (error) {
            console.error('Error editing training session:', error);
            toast.error(error.message);
        }
    }
    async deleteTrainingSession(sessionID) {
        try {
            await this.triathlonData.deleteTrainingSession(sessionID)
            console.log('Training session deleted successfully');
            toast.success('Training session deleted successfully');
        } catch (error) {
            console.error('Error deleting training session:', error);
            toast.error(error.message);
        }
    }
}

export default TriathlonController
