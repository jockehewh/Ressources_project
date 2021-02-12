import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser, updateUserToken} from "../actions/users.actions";
import UserService from "../services/user.service";

class Account extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            role: {},
            last_name: {}, 
            first_name: {}, 
            password : {},
            password_new: {},
            password_comfirm :{},
            thumbnail: null,
            isError: false
        }
    }
    
    async componentDidMount() {
        let id = this.props.user;
        try{
            let response = await UserService.details(id);
            let user = response.data.user;
            let role = response.data.user.role;
            let last_name = response.data.user.last_name;
            let first_name = response.data.user.first_name;
            let password = response.data.user.password;
            this.setState({user : user, 
                role : role, last_name : last_name, 
                first_name : first_name, 
                password : password,
                password_new : password,
                password_comfirm : password });
        }catch (e) {
            console.error(e);
        }
    }

    handleChangeUpdate(e){
        this.setState({
            [e.target.id]: e.target.files[0]
        });
    }

    handleChangeThumbnail(e){
        this.setState({
            thumbnail: e.target.files[0]
        });
    }

    async submitUpdate(e){
        e.preventDefault();
        this.setState({isError: false});
        try{
            if(this.state.password_new === this.state.password_comfirm){
                var password = this.state.password_new;
                this.setState({password : this.state.password_new});
                let id = this.props.user;
                let body = {last_name: this.state.last_name, first_name: this.state.first_name, password: password};
                await UserService.update(id, body);
                window.location.reload(true);
            }else{
                this.setState({isError: true});
            }
        }catch (e) {
            console.error(e);
        }
    }

    async submitThumbnail(e){
        e.preventDefault();
        let {thumbnail} = this.state;
        let formData = new FormData();
        formData.append('thumbnail', thumbnail); //body

        let id = this.props.user;
        try{
            await UserService.updateThumbnail(id, formData);
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    render() {
        let {user, role, isError} = this.state;

        return <div className="container-fluid">
            <h1 class="title_page">Mon compte</h1>
            <div class="w-75 content_center">
                <div class="text-center">
                    <img src={`${process.env.REACT_APP_HOST_API}/${user.thumbnail}`} class="rounded thumbnail" alt="Profil picture"/><br/>
                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_update_thumbnail">Modifier</button>

                </div>
                <div class="mb-3">
                    <label for="first_name" class="form-label">Prénom :</label>
                    <input type="text" class="form-control" value={user.first_name} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Nom :</label>
                    <input type="text" class="form-control" value={user.last_name} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="mail" class="form-label">Adresse email :</label>
                    <input type="mail" class="form-control" value={user.email} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="mail" class="form-label">Role :</label>
                    <input type="mail" class="form-control" value={role.name} readOnly/>
                </div>

            {/*-- Button trigger modal --*/}
                <div class="text-center">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal_update_user"> Modifier mes imformations </button>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#modal_update_password"> Changer de mots de passe </button>
                </div>

            </div>


        {/*-- Modal --*/}
            {/*-- Update user infos --*/}
            <div class="modal fade" id="modal_update_user" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modification</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={(e) => this.submitUpdate(e)}>
                            <div class="form-group">
                                <label for="last_name">Nom</label>
                                <input type="text" class="form-control" id="last_name" defaultValue={user.last_name} onChange={(e) => this.handleChangeUpdate(e)}/>
                            </div>
                            <div class="form-group">
                                <label for="first_name">Prénom</label>
                                <input type="text" class="form-control" id="first_name" defaultValue={user.first_name} onChange={(e) => this.handleChangeUpdate(e)}/>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Modifier</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

            {/*-- update password --*/}
            <div class="modal fade" id="modal_update_password" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modification du mots de passe</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={(e) => this.submitUpdate(e)}>
                            <div class="form-group">
                                <label for="password">Nouveau mots de passe</label>
                                <input type="password" class="form-control" id="password_new" onChange={(e) => this.handleChangeUpdate(e)}/>
                            </div>
                            <div class="form-group">
                                <label for="password_comfirm">Comfirmation du mots de passe</label>
                                <input type="password" class="form-control" id="password_comfirm" onChange={(e) => this.handleChangeUpdate(e)}/>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Modifier</button>
                            </div>
                            {isError && <div class="alert alert-danger" role="alert">Les mots de passe ne correspondent pas</div>}
                        </form>
                    </div>
                    </div>
                </div>
            </div>

            {/*-- update thumbnail --*/}
            <div class="modal fade" id="modal_update_thumbnail" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modification de la photo de profil</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={(e) => this.submitThumbnail(e)}>
                            <div class="form-group">
                                <label for="thumbnail">Photo</label>
                                <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)}/>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Modifier</button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

        </div>
        
    }
}

const mapStateToProps = state => {
    return {user: state.user, token: state.token}
};

const mapDispatchToProps = dispatch => {
    return {updateUser: user => dispatch(updateUser(user)), 
        updateUserToken: token => dispatch(updateUserToken(token))}
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
