import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserService from "../services/user.service";

class MyTeam extends Component{

    constructor(props) {
        super(props);
        this.state = {
            members: [],
            partner: {},

            last_name: null,
            first_name: null,
            email: null,
            password: null,
            thumbnail: null,
            user_id: this.props.user,
            
        }
    }
    
    async componentDidMount() {
        let id = this.props.user;
        let user = await UserService.details(id);
            user = user.data.user; 
        let partner = user.partner;
        let response = await UserService.list_by_partner(partner._id);
        let members = response.data.users;
        console.log(members);
        this.setState({ members: members, partner: partner});
    }

    handleChange(e){ 
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    handleChangeUpdate(last_name, first_name, email){ 
        this.setState({
            last_name: last_name,
            first_name: first_name,
            email: email,
        });
    }

    handleChangeThumbnail(e){
        this.setState({
            thumbnail: e.target.files[0],
        });
    }

    async submit(e){
        e.preventDefault();
        let {last_name, first_name, email, password, thumbnail, partner, user_id} = this.state;

        let formData = new FormData();
        formData.append('last_name', last_name);
        formData.append('first_name', first_name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('thumbnail', thumbnail);
        formData.append('partner', partner._id);
        formData.append('created_by', user_id);
        try{
            await UserService.create(formData);
            //let response = await UserService.list;
            //this.setState({members: response.data.users});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdate(e, id){
        e.preventDefault();
        try{
                let body = {last_name: this.state.last_name, first_name: this.state.first_name, email: this.state.email, updated_by: this.state.user_id};
                await UserService.update(id, body);
                //let response = await PartnerService.list;
                //this.setState({partners: response.data.partners});
                window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdateThumbnail(e, id){
        e.preventDefault();
        let {thumbnail} = this.state;
        let formData = new FormData();
        formData.append('thumbnail', thumbnail); //body

        try{
            await UserService.updateThumbnail(id, formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async deleteMember(id){
        try{
            await UserService.delete(id);
            //let response = await PartnerService.list();
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e){
            console.error(e);
        }
    }

    render() {
        let {members, partner} = this.state;

        return <div className="container-fluid">
            <h1 class="title_page">Mon organisation</h1>

            <div class="text-center mb-3">
                <img src={`${process.env.REACT_APP_HOST_API}/${partner.thumbnail}`} class="rounded thumbnail mb-3" alt="Profil picture"/>
                <h5 class="mb-3">{partner.name}</h5>
                <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#modal_facture"> Factures </button>
            </div>

            {/*-- modal facture --*/}
            <div class="modal fade" id="modal_facture" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <b>Aucune facture</b>
                        </div>
                    </div>
                </div>
            </div>

            {/*-- Button trigger modal --*/}
            <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#modal_add_member"> Ajouter un membre </button>

            {/*-- Modal add--*/}
            <div class="modal fade" id="modal_add_member" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Ajout de membre</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit ={(e) => this.submit(e)}>
                                <div class="form-group">
                                    <label for="last_name">Nom</label>
                                    <input type="text" class="form-control" id="last_name" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="first_name">Prénom</label>
                                    <input type="text" class="form-control" id="first_name" onChange={(e) => this.handleChange(e)} required/>
                                </div>                        <div class="form-group">
                                    <label for="email">Adresse email</label>
                                    <input type="email" class="form-control" id="email" onChange={(e) => this.handleChange(e)} required/>
                                </div>                        <div class="form-group">
                                    <label for="password">Mots de passe</label>
                                    <input type="password" class="form-control" id="password" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="thumbnail">Photo</label>
                                    <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)} required/>
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
                            <td data-toggle="modal" data-target={"#modal_details_member"+index}><a href="#">{member.last_name} {member.first_name}</a></td>
                            <td>{member.email}</td>
                            <td>{member.role.name}</td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target={"#modal_update_member"+index}
                                    onClick={(e) => this.handleChangeUpdate(member.last_name, member.first_name, member.email)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-outline-danger" onClick={() => this.deleteMember(member._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                    </svg>
                                </button>
                            </td>

                            {/*-- Modal details --*/}
                            <div class="modal fade" id={"modal_details_member"+index} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">{partner.name}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${member.thumbnail}`} class="rounded text-center content_center thumbnail_partner" alt="..."/>
                                            </div>
                                            <div class="card-body">
                                                <div>
                                                    <p class="card-text"><b>Nom : </b>{member.last_name}</p>
                                                    <p class="card-text"><b>prénom : </b>{member.first_name}</p>
                                                    <p class="card-text"><b>Email : </b><a href={"mailto:"+member.email}>{member.email}</a></p>
                                                    <p class="card-text"><b>Role : </b>{member.role.name}</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                {/* btn update */}
                                                <a href="#" class="btn btn-success" data-toggle="modal" data-target={"#modal_update_member"+index}
                                                    onClick={(e) => this.handleChangeUpdate(member.last_name, member.first_name, member.email)}>Modifier
                                                </a>
                                                {/* btn delete */}
                                                <a href="#" class="btn btn-danger" onClick={() => this.deleteMember(member._id)}>Supprimer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*-- Modal update --*/}
                            <div class="modal fade" id={"modal_update_member"+index} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">{partner.name}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${member.thumbnail}`} class="rounded thumbnail_partner" alt="..."/>
                                            </div>
                                            <form  onSubmit={(e) => this.submitUpdateThumbnail(e, member._id)}>
                                                <div class="form-group">
                                                    <label for="thumbnail">Photo</label>
                                                    <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Modifier la photo</button>
                                                </div>
                                            </form>
                                            <form onSubmit={(e) => this.submitUpdate(e, member._id)}>
                                                <div class="form-group">
                                                    <label for="last_name">Nom</label>
                                                    <input type="text" class="form-control" id="last_name" defaultValue={member.last_name} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="first_name">Prénom</label>
                                                    <input type="text" class="form-control" id="first_name" defaultValue={member.first_name} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="mail" class="form-control" id="email" defaultValue={member.email} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Modifier</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    })
                }     
                </tbody>

            </table>

        </div>        
    }
}

const mapStateToProps = state => {
    return {user: state.user}
};

export default connect(mapStateToProps, null)(MyTeam);
