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
            <div className="container-fluid">
                <ul class="nav">
                    <img  src={`${process.env.REACT_APP_HOST_API}/${partner.thumbnail}`} class="rounded thumbnail_header" alt="Profil picture"/>
                    <Link to={'/'} className="nav-link">Accueil</Link>
                    <Link to={'/myteam'} className="nav-link">Mon organisation</Link>                        
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ressources
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to={`/ressources/webarticles`} className="dropdown-item">Articles web</Link>
                            <Link to={`/ressources/websites`} className="dropdown-item">Sites web</Link>
                            <Link to={`/ressources/scientificpublications`} className="dropdown-item">Publications scientifiques</Link>
                            <Link to={`/ressources/events`} className="dropdown-item">Evenements</Link>
                        </div>
                    </li>
                </ul>
                <ul class="nav justify-content-center">
                    <Link to={'/myaccount'} className="nav-link"><img src={`${process.env.REACT_APP_HOST_API}/${user.thumbnail}`} class="rounded thumbnail_header-circle" alt="Profil picture"/></Link>
                    <div className="nav-link" onClick={() => this.logout()}><button type="button" class="btn btn-outline-danger">Déconnexion</button></div>
                </ul>
                <ul class="nav justify-content-end">
                    <Link to={'/partners'} className="nav-link">Partenaires</Link>
                    <Link to={'/contact'} className="nav-link" type="button" class="btn btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                        </svg>
                    </Link>
                    <a className="nav justify-content-end">Trusted Health Partners</a>
                </ul>
            </div>
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
