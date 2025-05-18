class TriathlonController {
    constructor(data, view, member) {
        this.data = data
        this.view = view
        this.member = member

        // DOM Elements
        this.LoginForm = document.getElementById('LoginForm');
        this.registerNewUser = document.getElementById('signup-btn');


        // Bind event listeners
        if (this.LoginForm) {
            this.LoginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
        if (this.registerNewUser) {
            this.registerNewUser.addEventListener('click', this.registerUser.bind(this));
        }

        // Initial render

        // Setup
        this.data.initialiseAndLoad()

    }


    handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        console.log('Login ' + username)
        const login = this.member.login(username)

        if (login === true) {
            console.log("hello world")
        }
        else {
            console.log("hello womp")
        }
    }

    registerUser() {
        console.log('register')
        document.getElementById('hide').style.display = 'block';
        this.view.Register();
    }
}

export default TriathlonController
