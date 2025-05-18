class TriathlonController {
    constructor(data, member) {
        this.data = data
        this.member = member


        // Setup
        try {
            this.data.initialiseAndLoad()
            console.log('setup good');
        } catch (error) {
            console.error('Error setting up:', error);
        }
    }


    async handleLogin(username) {

        try {
            const loginResult = await this.member.login(username);
            if (!loginResult) {
                throw new Error('Invalid username');
            }
            console.log('User Logged in');
            return loginResult
        } catch (error) {
            console.error('Error Logging in user:', error);
            return
        }
    }

    async handleSignUp(userName, fName, lName) {
        try {
            await this.member.createMember(userName, fName, lName);
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }

    async handleLogout() {
        await this.member.logout();
        return true
    }
}


export default TriathlonController
