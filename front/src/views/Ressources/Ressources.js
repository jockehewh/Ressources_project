import React, {Component} from 'react';

export default class Ressources extends Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    async componentDidMount() {

    }

    render() {
        let {} = this.state;

        return <div className="container-fluid">            
            <nav class="nav">
                <a class="nav-link" href="/ressources/WebArticles">Articles web</a>
                <a class="nav-link" href="/ressources/websites">Sites web</a>
                <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
                <a class="nav-link" href="/ressources/events">Evenements</a>
            </nav>

            <h1 class="title_page">Ressources</h1>

            {/* Search bar */}
            <div class="input-group mb-4">
                <input type="search" placeholder="Rechercher une ressource" aria-describedby="button-addon5" class="form-control"/>
                <div class="input-group-append">
                    <button id="button-addon5" type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                </div>
            </div>

            <div class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            
        </div>
        
    }
}
