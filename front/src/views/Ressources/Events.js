import React, {Component} from 'react';
import UserService from "../../services/user.service";
import EventService from "../../services/event.service"
import moment from "moment";
import {connect} from 'react-redux';

class Events extends Component{

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            partner_id: null,
            user_id: this.props.user,
            
            title: null,
            link: null,
            location: null,
            thumbnail: null,
            abstract: null,
            address: null,
            promoter: null,
            phone: null,
            email: null,
            price: null,
            start_datetime: null,
            end_datetime: null,
        }
    }
    
    async componentDidMount() {
        let id = this.props.user;
        let response = await UserService.details(id);
        let partner_id = response.data.user.partner._id;
        let response2 = await EventService.list_by_partner(partner_id);
        let events = response2.data.events;
        this.setState({ events: events, partner_id: partner_id});
    }

    handleChange(e){ 
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    handleChangeThumbnail(e){
        this.setState({
            thumbnail: e.target.files[0],
        });
    }

    handleChangeUpdate(title, link, location, abstract, address, promoter, phone, email, price, start_datetime, end_datetime){ 
        this.setState({
            title: title,
            link: link,
            location: location,
            abstract: abstract,
            address: address,
            promoter: promoter,
            phone: phone,
            email: email,
            price: price,
            start_datetime: start_datetime,
            end_datetime: end_datetime,
        });
    }

    async deletePartner(id){
        try{
            await EventService.delete(id);
            //let response = await PartnerService.list();
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e){
            console.error(e);
        }
    }

    async submit(e){
        e.preventDefault();
        let {title, link, thumbnail, abstract, location, address, promoter, phone, email, price, start_datetime, end_datetime, partner_id, user_id} = this.state;

        let formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        formData.append('thumbnail', thumbnail);
        formData.append('abstract', abstract);
        formData.append('location', location);
        formData.append('address', address);
        formData.append('promoter', promoter);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('price', price);
        formData.append('start_datetime', start_datetime);
        formData.append('end_datetime', end_datetime);
        formData.append('partner', partner_id);
        formData.append('created_by', user_id);
        try{
            await EventService.create(formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdate(e, event_id){
        e.preventDefault();
        try{
                let id = event_id;
                let body = {title: this.state.title, link: this.state.link, location: this.state.location, abstract: this.state.abstract, address: this.state.address, 
                        promoetr: this.state.promoter, phone: this.state.phone, email: this.state.email, price: this.state.price, start_datetime: this.state.start_datetime, 
                        end_datetime: this.state.end_datetime, updated_by: this.state.user_id};
                await EventService.update(id, body);
                //let response = await PartnerService.list;
                //this.setState({partners: response.data.partners});
                window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdateThumbnail(e, event_id){
        e.preventDefault();
        let {thumbnail} = this.state;
        let formData = new FormData();
        formData.append('thumbnail', thumbnail); //body

        let id = event_id;
        try{
            await EventService.updateThumbnail(id, formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    render() {
        let {events} = this.state;

        return <div className="container-fluid">            
        <nav class="nav nav-pills nav-justified">
            <a class="nav-link " href="#" tabindex="-1" aria-disabled="true" href="/ressources/WebArticles">Articles web</a>
            <a class="nav-link" href="/ressources/websites">Sites web</a>
            <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
            <a class="nav-link active" href="/ressources/events">Evenements</a>
        </nav>

        <h1 class="title_page">Evenements</h1>

        {/* Search bar */}
        <form>
            <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                <div class="input-group">
                <input type="search" placeholder="Rechercher un évènement" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                <div class="input-group-append">
                    <button id="button-addon1" type="submit" class="btn btn-link text-primary">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
                </div>
            </div>
        </form>

        {/*-- Button trigger modal --*/}
        <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#modal_add">Ajouter un évènement</button>

        {/*-- Modal add --*/}
        <div class="modal fade" id="modal_add" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Ajout d'évènement</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit ={(e) => this.submit(e)}>
                            <div class="form-group">
                                <label for="title">Titre de l'évènement</label>
                                <input type="text" class="form-control" id="title" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="thumbnail">Image</label>
                                <input type="file" class="form-control" id="thumbnail" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="abstract">Résumé</label>
                                <textarea class="form-control" id="abstract" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="link">Lien</label>
                                <input type="text" class="form-control" id="link" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="price">Prix (en €)</label>
                                <input type="number" class="form-control" id="price" onChange={(e) => this.handleChange(e)} required/>
                            </div> 
                            <div class="form-group">
                                <label for="promoter">Organisateur</label>
                                <input type="text" class="form-control" id="promoter" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="location">Lieu</label>
                                <input type="text" class="form-control" id="location" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="address">Adresse</label>
                                <input type="text" class="form-control" id="address" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" onChange={(e) => this.handleChange(e)} required/>
                            </div>                        
                            <div class="form-group">
                                <label for="phone">Téléphone</label>
                                <input type="tel" class="form-control" id="phone" onChange={(e) => this.handleChange(e)} required/>
                            </div>
                            <div class="form-group">
                                <label for="start_datetime">Date et heure de début</label>
                                <input type="datetime-local" class="form-control" id="start_datetime" onChange={(e) => this.handleChange(e)} required/>
                            </div>                         
                            <div class="form-group">
                                <label for="end_datetime">Date et heure de fin</label>
                                <input type="datetime-local" class="form-control" id="end_datetime" onChange={(e) => this.handleChange(e)} required/>
                            </div> 

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">Ajouter</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

        {/* Liste of articles*/}
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" style={{"width":"5%"}}>#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Organisateur</th>
                    <th scope="col">Lieu</th>
                    <th scope="col">Date</th>
                    <th scope="col" style={{"width":"5%"}}></th>
                </tr>
            </thead>
            <tbody>
            {
                events.map((event, index) => { 
                    return <tr>
                        <th scope="row">{index}</th>
                        <td data-toggle="modal" data-target={"#modal_details"+index}><a href="#">{event.title}</a></td>
                        <td>{event.promoter}</td>
                        <td>{event.location}</td>
                        <td>Du {moment(event.start_datetime).format('DD/MM/YYYY')} au {moment(event.end_datetime).format('DD/MM/YYYY')}</td>
                        <td>
                            <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target={"#modal_update"+index}
                                    onClick={(e) => this.handleChangeUpdate(event.title, event.link, event.location, 
                                        event.abstract, event.address, event.promoter, event.phone, event.email, event.price, event.start_datetime, event.end_datetime)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-danger" onClick={() => this.deletePartner(event._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                </svg>
                            </button>
                        </td>

                            {/*-- Modal details --*/}
                            <div class="modal fade" id={"modal_details"+index} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">{event.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${event.thumbnail}`} class="rounded text-center content_center thumbnail_partner" alt="..."/>
                                            </div>
                                            <div class="card-body">
                                                <div>
                                                    <p class="card-text"><b>Lien : </b><a href={event.link}>{event.link}</a></p>
                                                    <p class="card-text"><b>Résume : </b>{event.abstract}</p>
                                                    <p class="card-text"><b>Lieu : </b>{event.location}</p>
                                                    <p class="card-text"><b>Adresse : </b>{event.address}</p>
                                                    <p class="card-text"><b>Organisateur : </b>{event.promoter}</p>
                                                    <p class="card-text"><b>Téléphone : </b><a href={"tel:"+event.phone}>{event.phone}</a></p>
                                                    <p class="card-text"><b>Email : </b><a href={"mailto:"+event.email}>{event.email}</a></p>
                                                    <p class="card-text"><b>Prix : </b>{event.price} €</p>
                                                    <p class="card-text"><b>Date de début : </b>{moment(event.start_datetime).format('DD/MM/YYYY')}</p>
                                                    <p class="card-text"><b>Date de fin : </b>{moment(event.end_datetime).format('DD/MM/YYYY')}</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                {/* btn update */}
                                                <a href="#" class="btn btn-success" data-toggle="modal" data-target={"#modal_update"+index}
                                                    onClick={(e) => this.handleChangeUpdate(event.title, event.link, event.location, 
                                                        event.abstract, event.address, event.promoter, event.phone, event.email, event.price, event.start_datetime, event.end_datetime)}>Modifier
                                                </a>
                                                {/* btn delete */}
                                                <a href="#" class="btn btn-danger" onClick={() => this.deletePartner(event._id)}>Supprimer</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*-- Modal update --*/}
                            <div class="modal fade" id={"modal_update"+index} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">{event.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${event.thumbnail}`} class="rounded thumbnail_partner" alt="..."/>
                                            </div>
                                            <form  onSubmit={(e) => this.submitUpdateThumbnail(e, event._id)}>
                                                <div class="form-group">
                                                    <label for="thumbnail">Image</label>
                                                    <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Modifier l'image</button>
                                                </div>
                                            </form>
                                            <form onSubmit={(e) => this.submitUpdate(e, event._id)}>
                                                <div class="form-group">
                                                    <label for="name">Nom de l'évènement</label>
                                                    <input type="text" class="form-control" id="name" defaultValue={event.title} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="link">Lien</label>
                                                    <input type="url" class="form-control" id="link" defaultValue={event.link} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="location">lieu</label>
                                                    <input type="text" class="form-control" id="location" defaultValue={event.location} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="abstract">Résumé</label>
                                                    <input type="text" class="form-control" id="abstract" defaultValue={event.abstract} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="address">Adresse</label>
                                                    <input type="text" class="form-control" id="address" defaultValue={event.address} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="promoter">Organisateur</label>
                                                    <input type="text" class="form-control" id="promoter" defaultValue={event.promoter} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="phone">Téléphone</label>
                                                    <input type="tel" class="form-control" id="phone" defaultValue={event.phone} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="email">Email</label>
                                                    <input type="mail" class="form-control" id="email" defaultValue={event.email} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="price">Prix (en €)</label>
                                                    <input type="number" class="form-control" id="price" defaultValue={event.price}  onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="start_datetime">Date de début</label>
                                                    <input type="datetime-local" class="form-control" id="start_datetime" defaultValue={moment(event.start_datetime).format("YYYY-MM-DDTHH:mm")} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="end_datetime">Date de fin</label>
                                                    <input type="datetime-local" class="form-control" id="end_datetime" defaultValue={moment(event.end_datetime).format("YYYY-MM-DDTHH:mm")} onChange={(e) => this.handleChange(e)}/>
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

export default connect(mapStateToProps, null)(Events);