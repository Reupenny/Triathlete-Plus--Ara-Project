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

    async handleLogin(username, showNotification, setLoggedIn, setFirstName) {
        try {
            const loginResult = await this.member.login(username);
            if (!loginResult) {
                throw new Error('Invalid username');
            }
            console.log('User Logged in');
            showNotification('Login successful!', 'success'); // Shows notification
            setLoggedIn(true)
            setFirstName(loginResult.fName);
            return loginResult
        } catch (error) {
            console.error('Error Logging in user:', error);
            showNotification(error.message, 'error'); // Shows notification
            return
        }
    }
    async handleSignUp(userName, fName, lName, showNotification, setShowRegister) {
        try {
            await this.member.createMember(userName, fName, lName);
            console.log('User registered successfully');
            showNotification('Registration successful!', 'success');
            setShowRegister(false)
        } catch (error) {
            console.error('Error registering user:', error);
            showNotification(error.message, 'error');
        }
    }
    async handleLogout(showNotification, setLoggedIn) {
        try {
            await this.member.logout();
            showNotification('Logout successful!', 'success');
            setLoggedIn(false)
            return true
        } catch (error) {
            console.error('Error logging out user:', error);
            showNotification('Logout failed.', 'error');
            return false;
        }
    }
            //User Testing
        HandleGettingUserDetails(){
            const currentUser = window.localStorage.getItem("currentUser")
            if (currentUser){
                const user = JSON.parse(currentUser)
                return user
        }
    }

        async handleNewSession(userName, fName, lName, showNotification, setShowRegister) {
            // Swimming Session
        try {
            await this.triathlonData.CreateSwimmingSession(date, notes, lapLength, strokeType, lapTimes, waterTemperature)
            console.log('User registered successfully');
            showNotification('Session Created', 'success');// Shows notification
            setShowRegister(false)
        } catch (error) {
            console.error('Error creating session:', error);
            showNotification(error.message, 'error');// Shows notification
        }
        // Cycling Session
        try {
            await this.triathlonData.CreateCyclingSession(date, notes, distance, duration, terrain, bikeUsed, airTemperature, weatherCondition)
            console.log('User registered successfully');
            showNotification('Session Created', 'success');// Shows notification
            setShowRegister(false)
        } catch (error) {
            console.error('Error creating session:', error);
            showNotification(error.message, 'error');// Shows notification
        }
        // Running Session
        try {
            await this.triathlonData.CreateRunningSession(date, notes, distance, duration, shoesUsed, airTemperature, weatherCondition)
            console.log('User registered successfully');
            showNotification('Session Created', 'success');// Shows notification
            setShowRegister(false)
        } catch (error) {
            console.error('Error creating session:', error);
            showNotification(error.message, 'error');// Shows notification
        }
    }

}

export default TriathlonController