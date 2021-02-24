import React, {Component} from 'react';
import UserService from "../../services/user.service";
import Scientific_publicationService from "../../services/scientific_publication.service"
import moment from "moment";
import {connect} from 'react-redux';

class ScientificPublications extends Component{

    constructor(props) {
        super(props);
        this.state = {
            publications: [],  
            partner_id: null,
            user_id: this.props.user,

            title: null,
            link: null,
            authors: null,
            thumbnail: null,
            publication_date: null,
            abstract: null,
        }
    }
    
    async componentDidMount() {
        let id = this.props.user;
        let response = await UserService.details(id);
        let partner_id = response.data.user.partner._id;
        let response2 = await Scientific_publicationService.list_by_partner(partner_id);
        let publications = response2.data.publications;
        this.setState({ publications: publications, partner_id: partner_id});
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

    handleChangeUpdate(title, link, authors, publication_date, abstract){ 
        this.setState({
            title: title,
            link: link,
            authors: authors,
            publication_date: publication_date,
            abstract: abstract
        });
    }

    async deletePartner(id){
        try{
            await Scientific_publicationService.delete(id);
            //let response = await PartnerService.list();
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e){
            console.error(e);
        }
    }

    async submit(e){
        e.preventDefault();
        let {title, link, thumbnail, abstract, publication_date, authors, partner_id, user_id} = this.state;

        let formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        formData.append('thumbnail', thumbnail);
        formData.append('abstract', abstract);
        formData.append('publication_date', publication_date);
        formData.append('authors', authors);
        formData.append('partner', partner_id);
        formData.append('created_by', user_id);

        try{
            await Scientific_publicationService.create(formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdate(e, publication_id){
        e.preventDefault();
        try{
                let id = publication_id;
                let body = {title: this.state.title, link: this.state.link, authors: this.state.authors, publication_date: this.state.publication_date, abstract: this.state.abstract, updated_by: this.state.user_id};
                await Scientific_publicationService.update(id, body);
                //let response = await PartnerService.list;
                //this.setState({partners: response.data.partners});
                window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdateThumbnail(e, publication_id){
        e.preventDefault();
        let {thumbnail} = this.state;
        let formData = new FormData();
        formData.append('thumbnail', thumbnail); //body

        let id = publication_id;
        try{
            await Scientific_publicationService.updateThumbnail(id, formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }
    
    render() {
        let {publications} = this.state;

        return <div className="container-fluid">            
            <nav class="nav nav-pills nav-justified">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true" href="/ressources/WebArticles">Articles web</a>
                <a class="nav-link" href="/ressources/websites">Sites web</a>
                <a class="nav-link active" href="/ressources/scientificpublications">Publications scientifiques</a>
                <a class="nav-link" href="/ressources/events">Evenements</a>
            </nav>

            <h1 class="title_page">Publications scientifiques</h1>

            {/* Search bar */}
            <form>
                <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                    <div class="input-group">
                    <input type="search" placeholder="Rechercher une publication" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                    <div class="input-group-append">
                        <button id="button-addon1" type="submit" class="btn btn-link text-primary">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    </div>
                </div>
            </form>

            {/*-- Button trigger modal --*/}
            <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#modal_add">Ajouter une publication scientifique</button>

            {/*-- Modal add --*/}
            <div class="modal fade" id="modal_add" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Ajout de publication scientifique</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit ={(e) => this.submit(e)}>
                                <div class="form-group">
                                    <label for="title">Titre de la publication</label>
                                    <input type="text" class="form-control" id="title" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="link">Lien</label>
                                    <input type="url" class="form-control" id="link" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="authors">Auteurs</label>
                                    <input type="text" class="form-control" id="authors" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="thumbnail">Image</label>
                                    <input type="file" class="form-control" id="thumbnail" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="publication_date">Date de publication</label>
                                    <input type="date" class="form-control" id="publication_date" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="abstract">Résumé</label>
                                    <textarea class="form-control" id="abstract" onChange={(e) => this.handleChange(e)} required/>
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
                        <th scope="col">Auteurs</th>
                        <th scope="col">Date de publication</th>
                        <th scope="col" style={{"width":"5%"}}></th>
                    </tr>
                </thead>
                <tbody>
                {
                    publications.map((publication, index) => { 
                        return <tr>
                            <th scope="row">{index}</th>
                            <td data-toggle="modal" data-target={"#modal_details"+index}><a href="#">{publication.title}</a></td>
                            <td>{publication.authors}</td>
                            <td>{moment(publication.publication_date).format('DD/MM/YYYY')}</td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target={"#modal_update"+index}
                                        onClick={(e) => this.handleChangeUpdate(publication.title, publication.link, publication.authors, publication.publication_date, publication.abstract)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-outline-danger" onClick={() => this.deletePartner(publication._id)}>
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
                                            <h5 class="modal-title" id="staticBackdropLabel">{publication.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${publication.thumbnail}`} class="rounded text-center content_center thumbnail_partner" alt="..."/>
                                            </div>
                                            <div class="card-body">
                                                <div>
                                                    <p class="card-text"><b>Lien : </b><a href={publication.link}>{publication.link}</a></p>
                                                    <p class="card-text"><b>Résume : </b>{publication.abstract}</p>
                                                    <p class="card-text"><b>Auteurs : </b>{publication.authors}</p>
                                                    <p class="card-text"><b>Date de publication : </b>{moment(publication.publication_date).format('DD/MM/YYYY')}</p>                                                    
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                {/* btn update */}
                                                <a href="#" class="btn btn-success" data-toggle="modal" data-target={"#modal_update"+index}
                                                    onClick={(e) => this.handleChangeUpdate(publication.title, publication.link, publication.authors, publication.publication_date, publication.abstract)}>Modifier
                                                </a>
                                                {/* btn delete */}
                                                <a href="#" class="btn btn-danger" onClick={() => this.deletePartner(publication._id)}>Supprimer</a>
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
                                            <h5 class="modal-title" id="staticBackdropLabel">{publication.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${publication.thumbnail}`} class="rounded thumbnail_partner" alt="..."/>
                                            </div>
                                            <form  onSubmit={(e) => this.submitUpdateThumbnail(e, publication._id)}>
                                                <div class="form-group">
                                                    <label for="thumbnail">Image</label>
                                                    <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Modifier l'image</button>
                                                </div>
                                            </form>
                                            <form onSubmit={(e) => this.submitUpdate(e, publication._id)}>
                                                <div class="form-group">
                                                    <label for="title">Nom de la publication</label>
                                                    <input type="text" class="form-control" id="title" defaultValue={publication.title} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="link">Lien</label>
                                                    <input type="url" class="form-control" id="link" defaultValue={publication.link} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="authors">Auteurs</label>
                                                    <input type="text" class="form-control" id="authors" defaultValue={publication.authors} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="publication_date">Téléphone</label>
                                                    <input type="date" class="form-control" id="publication_date" defaultValue={moment(publication.publication_date).format('YYYY-MM-DD')} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="abstract">résumé</label>
                                                    <input type="text" class="form-control" id="abstract" defaultValue={publication.abstract} onChange={(e) => this.handleChange(e)}/>
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

export default connect(mapStateToProps, null)(ScientificPublications);