import React, {Component} from 'react';
import EventService from "../../services/event.service"
import moment from "moment";

export default class Events extends Component{

    constructor(props) {
        super(props);
        this.state = {
            event: {},
        }
    }
    
    async componentDidMount() {
        let {id} = this.props.match.params;
        let response = await EventService.details(id);
        let event = response.data.event;
        this.setState({event: event});
    }

    render() {
        let {event} = this.state;

        return <div className="container-fluid">            
        <nav class="nav">
            <a class="nav-link" href="/ressources/WebArticles">Articles web</a>
            <a class="nav-link" href="/ressources/websites">Sites web</a>
            <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" href="/ressources/events">Evenements</a>
        </nav>

        <h1 class="title_page">Evenements</h1>

        <div class="text-center w-75 content_center">
            <img src={`${process.env.REACT_APP_HOST_API}/${event.thumbnail}`} class="rounded thumbnail" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{event.title}</h5>
                <div class="text-left mb-3">
                    <p class="card-text"><b>Résumé : </b>{event.abstract}</p>
                    <p class="card-text"><b>Date : </b>Du : {moment(event.start_at).format('DD/MM/YYYY')} au : {moment(event.end_at).format('DD/MM/YYYY')}</p>
                    <p class="card-text"><b>Lieu : </b>{event.location}</p>
                    <p class="card-text"><b>Organisateur : </b>{event.promoter}</p>
                    <p class="card-text"><b>Contact : </b>{event.email}</p>

                </div>
                <a href="#" class="btn btn-success">Modifier</a>
                <a href="#" class="btn btn-danger">Supprimer</a>
            </div>
        </div>

    </div>     
        
    }
}
