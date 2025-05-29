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

    async handleNewSession(userName, fName, lName, setShowRegister) {
        // Swimming Session
        try {
            await this.triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature)
            console.log('User registered successfully');
            toast.success('Session Created');// Shows notification
            setShowRegister(false)
        } catch (error) {
            console.error('Error creating session:', error);
            toast.error(error.message);// Shows notification
        }
        // Cycling Session
        try {
            await this.triathlonData.CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTemperature, weatherCondition)
            console.log('User registered successfully');
            toast.success('Session Created');// Shows notification
            setShowRegister(false)
        } catch (error) {
            console.error('Error creating session:', error);
            toast.error(error.message);// Shows notification
        }
        // Running Session
        try {
            await this.triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTemperature, weatherCondition)
            console.log('User registered successfully');
            toast.success('Session Created');// Shows notification
            setShowRegister(false)
        } catch (error) {
            console.error('Error creating session:', error);
            toast.error(error.message);// Shows notification
        }
    }

}

export default TriathlonController