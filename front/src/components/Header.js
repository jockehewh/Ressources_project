import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser, updateUserToken} from "../actions/users.actions";
import '../index.css';
import UserService from "../services/user.service";

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            partner : {},
        }
    }
    
    async componentDidMount() {
        let id = this.props.user;
        try{
            let response = await UserService.details(id);
            let user = response.data.user;
            let partner = response.data.user.partner;
            this.setState({user : user , partner : partner});
        }catch (e) {
            console.error(e);
        }
    }

    logout(){
        this.props.updateUser(null);
        this.props.updateUserToken(null);
        localStorage.removeItem('user_token');
    }

    render() {
        let {user, partner} = this.state;

        return <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="navbar-brand" href="/myteam">{partner.name}</a>
                     <div className="navbar-nav">
                            <Link to={'/'} className="nav-link">Home</Link>
                            <Link to={'/ressources'} className="nav-link">Resources</Link>
                            <Link to={'/partners'} className="nav-link">Partenaires</Link>
                            <Link to={'/myaccount'} className="nav-link">{user.first_name} {user.last_name}</Link>
                    </div>
                    <div className="nav-link" onClick={() => this.logout()}>Déconnexion</div>
                </div>
            </div>
            <a className="navbar-brand">Trusted Health Partners</a>
        </nav>
    }
}

const mapStateToProps = state => {
    return {user: state.user, token: state.token}
};

const mapDispatchToProps = dispatch => {
    return {updateUser: user => dispatch(updateUser(user)), 
        updateUserToken: token => dispatch(updateUserToken(token))}
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
