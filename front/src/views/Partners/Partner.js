import React, {Component} from 'react';
import {connect} from 'react-redux';
import PartnerService from "../../services/partner.service";
import CityService from "../../services/city.service";

class Partner extends Component{

    constructor(props) {
        super(props);
        this.state = {
            partners: [],
            //cities: [],

            name: null, 
            thumbnail: null,
            website: null, 
            email: null,
            phone: null,
            address: null,
            //activatedCity: null,
            user_id: this.props.user,
        }
    }

    async componentDidMount() {
        try{      
            let response1 = await PartnerService.list();
            let partners = response1.data.partners;
            /*let response2= await CityService.list();
            let cities = response2.data.cities;*
            this.setState({partners: partners, cities : cities, activatedCity: cities[0]._id});*/
            this.setState({partners: partners});
        }catch (e) {
            console.error(e)
        }
    }

    handleChange(e){ 
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    handleChangeUpdate(name, website, email, phone, address){ 
        this.setState({
            name: name,
            website: website,
            email: email,
            phone: phone,
            address: address
        });
    }

    handleChangeThumbnail(e){
        this.setState({
            thumbnail: e.target.files[0],
        });
    }

    async submit(e){
        e.preventDefault();
        let {name, thumbnail, website, email, phone, address, activatedCity, user_id} = this.state;

        let formData = new FormData();
        formData.append('name', name);
        formData.append('thumbnail', thumbnail);
        formData.append('website', website);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        //formData.append('city', [activatedCity]);
        formData.append('subscription', false);
        formData.append('created_by', user_id);

        try{
            await PartnerService.create(formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdate(e, partner_id){
        e.preventDefault();
        try{
                let id = partner_id;
                let body = {name: this.state.name, website: this.state.website, email: this.state.email, phone: this.state.phone, address: this.state.address, updated_by: this.state.user_id};
                await PartnerService.update(id, body);
                //let response = await PartnerService.list;
                //this.setState({partners: response.data.partners});
                window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdateThumbnail(e, partner_id){
        e.preventDefault();
        let {thumbnail} = this.state;
        let formData = new FormData();
        formData.append('thumbnail', thumbnail); //body

        let id = partner_id;
        try{
            await PartnerService.updateThumbnail(id, formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async deletePartner(id){
        try{
            await PartnerService.delete(id);
            //let response = await PartnerService.list();
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e){
            console.error(e);
        }
    }

    render() {
        let {partners, /*cities*/} = this.state;
        
        return <div className="container-fluid">
            <h1 class="title_page">Partenaires</h1>

            {/* search bar */}
            <form>
                <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                    <div class="input-group">
                    <input type="search" placeholder="Rechercher un partenaire" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                    <div class="input-group-append">
                        <button id="button-addon1" type="submit" class="btn btn-link text-primary">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    </div>
                </div>
            </form>

            {/*-- Button trigger modal --*/}
            <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#modal_add_partner"> Ajouter un partenaire </button>

            {/*-- Modal add--*/}
            <div class="modal fade" id="modal_add_partner" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Ajout de partenaire</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <form onSubmit ={(e) => this.submit(e)}>
                        <div class="form-group">
                            <label for="name">Nom du partenaire</label>
                            <input type="text" class="form-control" id="name" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <label for="thumbnail">Photo</label>
                            <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg"  onChange={(e) => this.handleChangeThumbnail(e)} required/>
                        </div>
                        <div class="form-group">
                            <label for="website">Site web</label>
                            <input type="text" class="form-control" id="website" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="mail" class="form-control" id="email" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input type="tel" class="form-control" id="phone" onChange={(e) => this.handleChange(e)} required/>
                        </div>
                        <div class="form-group">
                            <label for="address">Adresse</label>
                            <input type="text" class="form-control" id="address" onChange={(e) => this.handleChange(e)}/>
                        </div>
                        {/*<div class="form-group">
                            <label for="city">Ville</label>
                            <select class="form-control" id="activatedCity" onChange={(e) => this.handleChange(e)} required>
                                {
                                    cities.map((city, index) => {
                                        return <option key={index} value={city._id}>{city.nom}</option>
                                    })
                                }
                            </select >
                            </div>*/}
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Ajouter</button>
                        </div>
                    </form>
                    </div>

                    </div>
                </div>
            </div>

            {/*-- Liste of partners --*/}
            <table class="table border">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" style={{"width":"5%"}}>#</th>
                        <th scope="col" style={{"width":"50%"}}>Nom</th>
                        <th scope="col" style={{"width":"40%"}}>Abonnement</th>
                        <th scope="col" style={{"width":"5%"}}></th>
                    </tr>
                </thead>
                <tbody>
                {
                    partners.map((partner, index) => { 
                        return <tr>
                                <th>{index}</th>
                                <td data-toggle="modal" data-target={"#modal_details_partner"+index}><a href="#">{partner.name}</a></td>
                                {
                                    partner.subscription === true
                                    ? <td>Formule payante</td>
                                    : <td>Formule gratuite</td>
                                }
                            <td>
                                {/* btn update */}
                                <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target={"#modal_update_partner"+index} 
                                    onClick={(e) => this.handleChangeUpdate(partner.name, partner.website, partner.email, partner.phone, partner.address)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                </button>
                                {/* btn delete */}
                                <button type="button" class="btn btn-outline-danger" onClick={() => this.deletePartner(partner._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                    </svg>
                                </button>
                            </td>

                            {/*-- Modal details --*/}
                            <div class="modal fade" id={"modal_details_partner"+index} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                                <img src={`${process.env.REACT_APP_HOST_API}/${partner.thumbnail}`} class="rounded text-center content_center thumbnail_partner" alt="..."/>
                                            </div>
                                            <div class="card-body">
                                                <div>
                                                    <p class="card-text"><b>Site web : </b><a href={partner.website}>{partner.website}</a></p>
                                                    <p class="card-text"><b>Abonnement : </b>                                                    
                                                        {partner.subscription === true ? "Formule payante" : "Formule gratuite"}</p>
                                                    <p class="card-text"><b>Email : </b><a href={"mailto:"+partner.email}>{partner.email}</a></p>
                                                    <p class="card-text"><b>Téléphone : </b><a href={"tel:"+partner.phone}>{partner.phone}</a></p>
                                                    <p class="card-text"><b>Adresse : </b>{partner.address}</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                {/* btn update */}
                                                <a href="#" class="btn btn-success" data-toggle="modal" data-target={"#modal_update_partner"+index}
                                                    onClick={(e) => this.handleChangeUpdate(partner.name, partner.website, partner.email, partner.phone, partner.address)}>Modifier
                                                </a>
                                                {/* btn delete */}
                                                <a href="#" class="btn btn-danger" onClick={() => this.deletePartner(partner._id)}>Supprimer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*-- Modal update --*/}
                            <div class="modal fade" id={"modal_update_partner"+index} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                                <img src={`${process.env.REACT_APP_HOST_API}/${partner.thumbnail}`} class="rounded thumbnail_partner" alt="..."/>
                                            </div>
                                            <form  onSubmit={(e) => this.submitUpdateThumbnail(e, partner._id)}>
                                                <div class="form-group">
                                                    <label for="thumbnail">Photo</label>
                                                    <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Modifier la photo</button>
                                                </div>
                                            </form>
                                            <form onSubmit={(e) => this.submitUpdate(e, partner._id)}>
                                                <div class="form-group">
                                                    <label for="name">Nom du partenaire</label>
                                                    <input type="text" class="form-control" id="name" defaultValue={partner.name} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="website">Site web</label>
                                                    <input type="text" class="form-control" id="website" defaultValue={partner.website} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="mail" class="form-control" id="email" defaultValue={partner.email} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="phone">Téléphone</label>
                                                    <input type="tel" class="form-control" id="phone" defaultValue={partner.phone} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="address">Adresse</label>
                                                    <input type="text" class="form-control" id="address" defaultValue={partner.address} onChange={(e) => this.handleChange(e)}/>
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

export default connect(mapStateToProps, null)(Partner);
