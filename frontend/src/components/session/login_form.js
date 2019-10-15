import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.changeForm = this.changeForm.bind(this)
    }

    // Once the user has been authenticated, redirect to the Profile page
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/profile');
        }

        // Set or clear errors
        this.setState({ errors: nextProps.errors })
    }

    // Handle field updates (called in the render method)
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(user);
    }

    // Render the session errors if there are any
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }
    
    openSessionFormContainer() {
        let sessionForm = document.getElementsByClassName('session-form-hidden')[0]
        sessionForm.className = 'session-form-content'
    }

    closeLoginFormContainer() {
        let loginForm = document.getElementsByClassName('login-form')[0]
        loginForm.className = 'login-form-hidden'

    }



    changeForm() {
        this.closeLoginFormContainer()
        this.openSessionFormContainer()
    }


    render() {
        return (
        <div className="session-background"> 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="session-form-content">
                        <p id="signup-message">Sign in and sharpen your skills!</p>
                            <br></br>
                            <br></br>
                        <div className="session-errors-container"> 
                            {this.renderErrors()}
                        </div>
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            className="session-input-field"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="session-input-field"
                        />
                        <br />
                        <br></br>
                        <br></br>
                        <a id="go-to-login" onClick={this.changeForm}>I am a new user</a>
                        <input type="submit" value="Sign In" className="session-submit-button" />

                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default withRouter(LoginForm);