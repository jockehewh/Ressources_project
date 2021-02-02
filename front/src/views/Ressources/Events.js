import React, {Component} from 'react';
import UserService from "../../services/user.service";
import EventService from "../../services/event.service"
import {Link} from 'react-router-dom';
import moment from "moment";

export default class Events extends Component{

    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }
    
    async componentDidMount() {
        let id = sessionStorage.user_id
        let response = await UserService.details(id);
        let partner_id = response.data.user.partner_id;
        let response2 = await EventService.list_by_partner(partner_id);
        let events = response2.data.events;
        this.setState({ events: events});
    }

    render() {
        let {events} = this.state;

        return <div className="container-fluid">            
        <nav class="nav">
            <a class="nav-link" href="/ressources/WebArticles">Articles web</a>
            <a class="nav-link" href="/ressources/websites">Sites web</a>
            <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" href="/ressources/events">Evenements</a>
        </nav>

        <h1 class="title_page">Evenements</h1>

        {/* Search bar */}
        <div class="input-group mb-4">
            <input type="search" placeholder="Rechercher un évènement" aria-describedby="button-addon5" class="form-control"/>
            <div class="input-group-append">
                <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
            </div>
        </div>

        {/*-- Button trigger modal --*/}
        <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#staticBackdrop">Ajouter un évènement</button>

        {/*-- Modal --*/}
        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Ajout d'évènement</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="title">Titre de l'évènement</label>
                            <input type="text" class="form-control" id="title"/>
                        </div>
                        <div class="form-group">
                            <label for="thumbnail">Image</label>
                            <input type="file" class="form-control" id="thumbnail"/>
                        </div>
                        <div class="form-group">
                            <label for="abstract">Résumé</label>
                            <textarea class="form-control" id="abstract"/>
                        </div>
                        <div class="form-group">
                            <label for="price">Prix</label>
                            <input type="number" class="form-control" id="price"/>
                        </div> 
                        <div class="form-group">
                            <label for="promoter">Organisateur</label>
                            <input type="text" class="form-control" id="promoter"/>
                        </div>
                        <div class="form-group">
                            <label for="location">Lieu</label>
                            <input type="text" class="form-control" id="location"/>
                        </div>
                        <div class="form-group">
                            <label for="address">Adresse</label>
                            <input type="text" class="form-control" id="address"/>
                        </div>
                        <div class="form-group">
                            <label for="city">Ville</label>
                            <input type="text" class="form-control" id="city"/>
                        </div>
                        <div class="form-group">
                            <label for="mail">Email</label>
                            <input type="email" class="form-control" id="mail"/>
                        </div>                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input type="tel" class="form-control" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                        </div>
                        <div class="form-group">
                            <label for="start_date">Date et heure de début</label>
                            <input type="datetime-local" class="form-control" id="start_date"/>
                        </div>                         <div class="form-group">
                            <label for="end_date">Date et heure de fin</label>
                            <input type="datetime-local" class="form-control" id="end_date"/>
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
                    <th scope="col">Date de début</th>
                    <th scope="col">Date de fin</th>
                    <th scope="col" style={{"width":"5%"}}></th>
                </tr>
            </thead>
            <tbody>
            {
                events.map((event, index) => { 
                    return <tr>
                        <th scope="row"><Link to={`/ressources/events/${event._id}`}>{index}</Link></th>
                        <td><Link to={`/ressources/events/${event._id}`}>{event.title}</Link></td>
                        <td><Link to={`/ressources/events/${event._id}`}>{event.promoter}</Link></td>
                        <td><Link to={`/ressources/events/${event._id}`}>{event.location}</Link></td>
                        <td><Link to={`/ressources/events/${event._id}`}>{moment(event.start_at).format('DD/MM/YYYY')}</Link></td>
                        <td><Link to={`/ressources/events/${event._id}`}>{moment(event.end_at).format('DD/MM/YYYY')}</Link></td>
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
