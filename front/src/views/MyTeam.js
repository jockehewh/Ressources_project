import React, {Component} from 'react';
import UserService from "../services/user.service";
import RoleService from "../services/role.service";
import PartnerService from "../services/partner.service";

import {Link} from 'react-router-dom';

export default class MyAccount extends Component{

    constructor(props) {
        super(props);
        this.state = {
            members: [],
            partner: {},
        }
    }
    
    async componentDidMount() {
        let id = sessionStorage.user_id
        let response = await UserService.details(id);
        let partner_id = response.data.user.partner_id;
        let response2 = await UserService.list_by_partner(partner_id);
        let members = response2.data.users;
        let response3 = await PartnerService.details(partner_id);
        let partner = response3.data.partner;
        this.setState({ members: members, partner: partner});
    }

    render() {
        let {members, partner} = this.state;

        return <div className="container-fluid">
            <h1 class="title_page">Mon organisation</h1>

            <div class="text-center mb-3">
                <img src={`${process.env.REACT_APP_HOST_API}/${partner.thumbnail}`} class="rounded thumbnail mb-3" alt="Profil picture"/>
                <h5 class="mb-3">{partner.name}</h5>
                <button type="button" class="btn btn-primary mb-3"> Accéder aux factures </button>
            </div>

            {/*-- Button trigger modal --*/}
            <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#staticBackdrop"> Ajouter un membre </button>

            {/*-- Modal --*/}
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Ajout de membre</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="last_name">Nom</label>
                            <input type="text" class="form-control" id="last_name"/>
                        </div>
                        <div class="form-group">
                            <label for="first_name">Prénom</label>
                            <input type="text" class="form-control" id="first_name"/>
                        </div>                        <div class="form-group">
                            <label for="mail">Adresse email</label>
                            <input type="email" class="form-control" id="mail"/>
                        </div>                        <div class="form-group">
                            <label for="password">Mots de passe</label>
                            <input type="password" class="form-control" id="password"/>
                        </div>
                        <div class="form-group">
                            <label for="thumbnail_u">Photo</label>
                            <input type="file" class="form-control" id="thumbnail_u" accept="image/png, image/jpeg"/>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Ajouter</button>
                        </div>
                    </form>
                    </div>

                    </div>
                </div>
            </div>

            {/*-- Liste of partners --*/}
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" style={{"width":"5%"}}>#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col" style={{"width":"5%"}}></th>
                    </tr>
                </thead>

                <tbody>
                {
                    members.map((member, index) => { 
                        return <tr>
                            <th scope="row">{index}</th>
                            <td><Link to={`/myteam/member/${member._id}`}>{member.last_name}</Link></td>
                            <td><Link to={`/myteam/member/${member._id}`}>{member.first_name}</Link></td>
                            <td><Link to={`/myteam/member/${member._id}`}>{member.email}</Link></td>
                            <td></td>
                            <td>
                                <button type="button" class="btn btn-outline-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-outline-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    })

                }     
                </tbody>

            </table>
        </div>
        
    }
}
