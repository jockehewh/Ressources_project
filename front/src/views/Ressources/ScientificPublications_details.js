import React, {Component} from 'react';
import Scientific_publicationService from "../../services/scientific_publication.service"
import moment from "moment";

export default class ScientificPublications extends Component{

    constructor(props) {
        super(props);
        this.state = {
            publication: {},  
        }
    }
    
    async componentDidMount() {
        let {id} = this.props.match.params;
        let response = await Scientific_publicationService.details(id);
        let publication = response.data.publication;
        this.setState({publication: publication});
    }

    render() {
        let {publication} = this.state;

        return <div className="container-fluid">            
            <nav class="nav">
                <a class="nav-link" href="/ressources/WebArticles">Articles web</a>
                <a class="nav-link" href="/ressources/websites">Sites web</a>
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" href="/ressources/scientificpublications">Publications scientifiques</a>
                <a class="nav-link" href="/ressources/events">Evenements</a>
            </nav>

            <h1 class="title_page">Publications scientifiques</h1>

            <div class="text-center w-75 content_center">
                <img src={`${process.env.REACT_APP_HOST_API}/${publication.thumbnail}`} class="rounded thumbnail" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{publication.title}</h5>
                    <div class="text-left mb-3">
                        <p class="card-text"><b>Résumé : </b>{publication.abstract}</p>
                        <p class="card-text"><b>Lien : </b><a href={publication.link}>{publication.link}</a></p>
                        <p class="card-text"><b>Auteurs : </b>{publication.authors}</p>
                        <p class="card-text"><b>Date de publication : </b>{moment(publication.publication_date).format('DD/MM/YYYY')}</p>

                    </div>
                    <a href="#" class="btn btn-success">Modifier</a>
                    <a href="#" class="btn btn-danger">Supprimer</a>
                </div>
            </div>

        </div>
        
    }
}
