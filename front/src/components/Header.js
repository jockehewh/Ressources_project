import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from "../actions/users.actions";
import '../index.css';
import UserService from "../services/user.service";
import PartnerService from "../services/partner.service";

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            partner: {},
        }
    }
    
    async componentDidMount() {
        let id = sessionStorage.user_id
        let response = await UserService.details(id);
        let user = response.data.user;
        let id_partner = user.partner_id;
        let response2 = await PartnerService.details(id_partner);
        let partner = response2.data.partner;
        this.setState({user: user, partner: partner});
    }

    logout(){
        localStorage.removeItem('ThpToken');
        sessionStorage.clear();
        this.props.updateUser(null);
    }

    render() {
        let {user, partner} = this.state;

        return <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="navbar-brand" href="/myteam">{partner.name}</a>
                    
                    {
                        ! this.props.user !== null && <div className="navbar-nav">
                            <Link to={'/'} className="nav-link">Home</Link>
                            <Link to={'/ressources'} className="nav-link">Resources</Link>
                            <Link to={'/partners'} className="nav-link">Partenaires</Link>
                            <Link to={'/myaccount'} className="nav-link">{user.first_name} {user.last_name}</Link>
                        </div>
                    }

                    {
                        this.props.user !== null ?
                            <div className="nav-link" onClick={() => this.logout()}>Déconnexion</div>
                            : <Link to={'/login'} className="nav-link">Login</Link>
                    }
                </div>
            </div>
            <a className="navbar-brand">Trusted Health Partners</a>
        </nav>
    }
}

const mapStateToProps = state => {
    return {user: state.user};
};

const mapDispatchToProps = dispatch => {
    return {updateUser: user => dispatch(updateUser(user))}
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
