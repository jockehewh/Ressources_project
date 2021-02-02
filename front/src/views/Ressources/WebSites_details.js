import React, {Component} from 'react';
import Web_siteService from "../../services/web_site.service"

export default class WebSites extends Component{

    constructor(props) {
        super(props);
        this.state = {
            site: {},
        }
    }
    
    async componentDidMount() {
        let {id} = this.props.match.params;
        let response = await Web_siteService.details(id);
        let site = response.data.site;
        this.setState({site: site});
    }


    render() {
        let {site} = this.state;

        return <div className="container-fluid">            
            <nav class="nav">
                <a class="nav-link" href="/ressources/WebArticles">Articles web</a>
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" href="/ressources/websites">Sites web</a>
                <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
                <a class="nav-link" href="/ressources/events">Evenements</a>
            </nav>

            <h1 class="title_page">Sites web</h1>

            <div class="text-center w-75 content_center">
                <img src={`${process.env.REACT_APP_HOST_API}/${site.thumbnail}`} class="rounded thumbnail" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{site.title}</h5>
                    <div class="text-left mb-3">
                        <p class="card-text"><b>Résumé : </b>{site.abstract}</p>
                        <p class="card-text"><b>Lien : </b><a href={site.link}>{site.link}</a></p>
                        <p class="card-text"><b>Société : </b>{site.organization}</p>
                    </div>
                    <a href="#" class="btn btn-success">Modifier</a>
                    <a href="#" class="btn btn-danger">Supprimer</a>
                </div>
            </div>

        </div>
        
    }
}
