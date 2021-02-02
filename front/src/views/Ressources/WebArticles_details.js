import React, {Component} from 'react';
import Web_articleService from "../../services/web_article.service"
import moment from "moment";

export default class WebArticles extends Component{

    constructor(props) {
        super(props);
        this.state = {
            article: [],
        }
    }
    
    async componentDidMount() {
        let {id} = this.props.match.params;
        let response = await Web_articleService.details(id);
        let article = response.data.article;
        this.setState({article: article});
    }

    render() {
        let {article} = this.state;

        return <div className="container-fluid">            
            <nav class="nav">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true" href="/ressources/WebArticles">Articles web</a>
                <a class="nav-link" href="/ressources/websites">Sites web</a>
                <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
                <a class="nav-link" href="/ressources/events">Evenements</a>
            </nav>

            <h1 class="title_page">Articles web</h1>

            <div class="text-center w-75 content_center">
                <img src={`${process.env.REACT_APP_HOST_API}/${article.thumbnail}`} class="rounded thumbnail" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{article.title}</h5>
                    <div class="text-left mb-3">
                        <p class="card-text"><b>Résumé : </b>{article.abstract}</p>
                        <p class="card-text"><b>Lien : </b><a href={article.link}>{article.link}</a></p>
                        <p class="card-text"><b>Auteur : </b>{article.author}</p>
                        <p class="card-text"><b>Date de publication : </b>{moment(article.publication_date).format('DD/MM/YYYY')}</p>
                    </div>
                    <a href="#" class="btn btn-success">Modifier</a>
                    <a href="#" class="btn btn-danger">Supprimer</a>
                </div>
            </div>

        </div>        
    }
}
