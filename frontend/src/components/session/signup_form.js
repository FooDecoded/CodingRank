import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css';
import LoginFormContainer from './login_form_container'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            handle: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
        this.changeForm = this.changeForm.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            handle: this.state.handle,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

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

    closeSessionFormContainer(){
        let sessionForm = document.getElementsByClassName('session-form-content')[0]
        sessionForm.className = 'session-form-hidden'
    }

    openLoginFormContainer(){
        let loginForm = document.getElementsByClassName('login-form-hidden')[0]
        loginForm.className = 'login-form'

    }



    changeForm(){
        this.closeSessionFormContainer()
        this.openLoginFormContainer()
    }

    render() {
        return (
    
            <div className="session-form-container">
                <form onSubmit={this.handleSubmit}>

                    <div className="session-form-content">
                        <p id="signup-message">Sign up and start learning, for free!</p>

                        <br /> 
                        <div className="session-errors-container">{this.renderErrors()}</div>
                        <br />
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            className="session-input-field"
                        />
                        <br />
                        <input type="text"
                            value={this.state.handle}
                            onChange={this.update('handle')}
                            placeholder="Handle"
                            className="session-input-field"
                        />
                        <br />
                        <input type="password"
                            className="session-input-field"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="session-input-field"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                            className="session-input-field"
                        />
                        <br/>
                        <input type="submit" value="Sign Up" className="session-submit-button"/>
                        <a id="go-to-login" onClick={this.changeForm}>I am a returning user</a>
                    </div>
                </form>
                <div className="login-form-hidden">
                    <LoginFormContainer ></LoginFormContainer>
                </div>
            </div>
        ); 
    }
}

export default withRouter(SignupForm);