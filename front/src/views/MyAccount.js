import React, {Component} from 'react';
import UserService from "../services/user.service";
import RoleService from "../services/role.service";

export default class Account extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            role: {},
        }
    }
    
    async componentDidMount() {
        let id = sessionStorage.user_id
        let response = await UserService.details(id);
        let user = response.data.user;
        let role_id = user.role_id;
        let response2 = await RoleService.details(role_id);
        let role = response2.data.role;
        this.setState({user: user, role: role});
    }
    

    handleChange(e){
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    async submit(e){
        e.preventDefault();

        try{
            let id = sessionStorage.user_id;
            let body = {last_name: this.state.user.last_name, first_name: this.state.user.first_name, thumbnail: this.state.user.thumbnail};
            await UserService.update(id, body);
            this.props.history.push('/account');
        }catch (e) {
            console.error(e);
        }
    }

    render() {
        let {user, role} = this.state;

        return <div className="container-fluid">
            <h1 class="title_page">Mon compte</h1>
            <div class="w-75 content_center">
                <div class="text-center">
                    <img src={`${process.env.REACT_APP_HOST_API}/${user.thumbnail}`} class="rounded thumbnail" alt="Profil picture"/>
                </div>
                <div class="mb-3">
                    <label for="first_name" class="form-label">Prénom :</label>
                    <input type="text" class="form-control" id="first_name" value={user.first_name} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Nom :</label>
                    <input type="text" class="form-control" id="last_name" value={user.last_name} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="mail" class="form-label">Adresse email :</label>
                    <input type="mail" class="form-control" id="mail" value={user.email} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="mail" class="form-label">Role :</label>
                    <input type="mail" class="form-control" id="mail" value={role.name} readOnly/>
                </div>

                {/*-- Button trigger modal --*/}
                <div class="text-center">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop"> Modifier mes imformations </button>
                </div>
            </div>


            {/*-- Modal --*/}
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modification</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form enctype="multipart/form-data" onSubmit={(e) => this.submit(e)}>
                            <div class="form-group">
                                <label for="last_name_u">Nom</label>
                                <input type="text" class="form-control" id="last_name_u" defaultValue={user.last_name} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group">
                                <label for="first_name_u">Prénom</label>
                                <input type="text" class="form-control" id="first_name_u" defaultValue={user.first_name} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group">
                                <label for="password_u">Mots de passe</label>
                                <input type="password" class="form-control" id="password_u" defaultValue={user.password} onChange={(e) => this.handleChange(e)}/>
                            </div>
                            <div class="form-group">
                                <label for="thumbnail_u">Photo</label>
                                <input type="file" class="form-control" id="thumbnail_u" accept="image/png, image/jpeg" onChange={(e) => this.handleChange(e)}/>
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
