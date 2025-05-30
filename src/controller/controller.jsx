import { toast } from 'sonner'

class TriathlonController {
    constructor(triathlonData, member) {
        this.triathlonData = triathlonData
        this.member = member

        // Setup
        try {
            this.triathlonData.initialiseAndLoad()
            console.log('setup good');
        } catch (error) {
            console.error('Error setting up:', error);
        }
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

    async handleNewSession(formData, setNewSession) {
        try {
            if (formData.sport === 'swimming') {
                const parsedLapLength = parseFloat(formData.lapLength);
                const parsedWaterTemp = parseFloat(formData.waterTemp);
                const parsedLapTimes = formData.lapTimes.map(lapTime => parseFloat(lapTime));
                console.log(formData.notes + formData.strokeType)
                await this.triathlonData.CreateSwimmingSession(formData.date, formData.notes, parsedLapLength, formData.strokeType, parsedLapTimes, parsedWaterTemp)
                console.log('Swimming session created successfully');
                toast.success('Swimming Session Created');
                setNewSession(false)
            } else if (formData.sport === 'cycling') {
                const { date, notes, distance, duration, terrain, bikeUsed, airTemp, weather, } = formData;
                const parsedDistance = parseFloat(distance);
                const parsedDuration = parseFloat(duration);
                const parsedAirTemp = parseFloat(airTemp);
                await this.triathlonData.CreateCyclingSession(date, notes, parsedDistance, parsedDuration, terrain, bikeUsed, parsedAirTemp, weather)
                console.log('Cycling session created successfully');
                toast.success('Cycling Session Created');
                setNewSession(false)
            } else if (formData.sport === 'running') {
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

}

export default TriathlonController
