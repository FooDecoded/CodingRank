import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

import Dropdown from './dropdown';

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.session.isAuthenticated

});

const mapDispatchToProps = dispatch =>({
    logoutDisp: () => dispatch(logout())
})



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dropdown);