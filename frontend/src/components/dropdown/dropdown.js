import React from 'react';
import './dropdown.css';
// import DropdownContainer from './dropdown_container'

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
        };

        this.logoutUser = this.logoutUser.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    logoutUser(e) {
        debugger
        e.preventDefault();
        this.props.logoutDisp();
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    render() {
        debugger
        return (
            <div className="dropdown" style={{  width: "20px" }} >
                <div className="button" onClick={this.showDropdownMenu}><i className="fas fa-user-alt" id="profile-picture"></i></div>

                {(this.state.displayMenu)? (
                    <ul id="below-dropdown">
                        <li id="list"><a className="active" href="#profile">My profile</a></li>
                        <a id="list" onClick={this.logoutUser}>Logout</a>
                    </ul>
                ) :
                    (
                        null
                    )
                }

            </div>

        );
    }
}

export default Dropdown;