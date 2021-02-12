import React, {Component} from 'react';
import UserService from "../services/user.service";
import {connect} from 'react-redux';
import {updateUser, updateUserToken} from "../actions/users.actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            isError: false
        }
    }

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    async submit(e){
        e.preventDefault();
        this.setState({isError: false});
        let {email, password} = this.state;
        let body = {email, password};

        try{
            let response = await UserService.auth(body);
            delete response.data.user.password;
            let token = response.data.token;
            localStorage.setItem('user_token', token);
            this.props.updateUser(response.data.user._id);
            this.props.updateUserToken(token);
            this.props.history.push('/');
        }catch (e) {
            this.setState({isError: true});
        }
    }

    render() {
        let {isError} = this.state;
        return <div className="container-fluid">
            <h1 class="title_page">Login</h1>

            <form onSubmit={(e) => this.submit(e)}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" required className="form-control" id="email"
                        onChange={(e) => this.handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" required className="form-control" id="password"
                        onChange={(e) => this.handleChange(e)}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>

                {isError && <div class="alert alert-danger" role="alert">Erreur d'email et / ou de mot de passe</div>}

            </form>
        </div>
    }
}

const mapStateToProps = state => {
    return {user: state.user, token: state.token}
};

const mapDispatchToProps = dispatch => {
    return {updateUser: user => dispatch(updateUser(user)), updateUserToken: token => dispatch(updateUserToken(token))}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);