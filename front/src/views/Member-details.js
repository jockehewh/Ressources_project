import React, {Component} from 'react';
import UserService from "../services/user.service";

export default class MyAccount extends Component{

    constructor(props) {
        super(props);
        this.state = {
            member: {},
        }
    }
    
    async componentDidMount() {
        let {id} = this.props.match.params;
        let response = await UserService.details(id);
        let member = response.data.user;
        this.setState({member: member});
    }

    render() {
        let {member} = this.state;

        return <div className="container-fluid">
            <h1 class="title_page">Mon équipe</h1>

            <div class="w-75 content_center">
                <div class="text-center">
                    <img src={`${process.env.REACT_APP_HOST_API}/${member.thumbnail}`} class="rounded thumbnail" alt="Profil picture"/>
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Nom :</label>
                    <input type="text" class="form-control" id="last_name" value={member.last_name} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="first_name" class="form-label">Prénom :</label>
                    <input type="text" class="form-control" id="first_name" value={member.first_name} readOnly/>
                </div>
                <div class="mb-3">
                    <label for="mail" class="form-label">Adresse email :</label>
                    <input type="mail" class="form-control" id="mail" value={member.email} readOnly/>
                </div>
                <div class="mb-3 text-center">
                    <a href="#" class="btn btn-success">Modifier</a>
                    <a href="#" class="btn btn-danger">Supprimer</a>
                </div>

            </div>

        </div>
        
    }
}
