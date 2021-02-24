import React, {Component} from 'react';
import UserService from "../../services/user.service";
import Web_siteService from "../../services/web_site.service"
import {connect} from 'react-redux';

class WebSites extends Component{

    constructor(props) {
        super(props);
        this.state = {
            sites: [],
            partner_id: null,
            user_id: this.props.user,

            title: null,
            abstract: null,
            thumbnail: null,
            link: null,
            organization: null,
        }
    }
    

    async componentDidMount() {
        let id = this.props.user;
        let response = await UserService.details(id);
        let partner_id = response.data.user.partner._id;
        let response2 = await Web_siteService.list_by_partner(partner_id);
        let sites = response2.data.sites;
        this.setState({sites: sites, partner_id: partner_id});
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

    handleChangeUpdate(title, abstract, link, organization){ 
        this.setState({
            title: title,
            abstract: abstract,
            link: link,
            organization: organization
        });
    }

    async deletePartner(id){
        try{
            await Web_siteService.delete(id);
            //let response = await PartnerService.list();
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e){
            console.error(e);
        }
    }

    async submit(e){
        e.preventDefault();
        let {title, link, thumbnail, abstract, organization, partner_id, user_id} = this.state;

        let formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        formData.append('thumbnail', thumbnail);
        formData.append('abstract', abstract);
        formData.append('organization', organization);
        formData.append('partner', partner_id);
        formData.append('created_by', user_id);

        try{
            await Web_siteService.create(formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdate(e, site_id){
        e.preventDefault();
        try{
                let id = site_id;
                let body = {title: this.state.title, abstract: this.state.abstract, link: this.state.link, organization: this.state.organization, updated_by: this.state.user_id};
                await Web_siteService.update(id, body);
                //let response = await PartnerService.list;
                //this.setState({partners: response.data.partners});
                window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    async submitUpdateThumbnail(e, site_id){
        e.preventDefault();
        let {thumbnail} = this.state;
        let formData = new FormData();
        formData.append('thumbnail', thumbnail); //body

        let id = site_id;
        try{
            await Web_siteService.updateThumbnail(id, formData);
            //let response = await PartnerService.list;
            //this.setState({partners: response.data.partners});
            window.location.reload(true);
        }catch (e) {
            console.error(e);
        }
    }

    render() {
        let {sites} = this.state;

        return <div className="container-fluid">            
            <nav class="nav nav-pills nav-justified">
                <a class="nav-link" href="#" tabindex="-1" aria-disabled="true" href="/ressources/WebArticles">Articles web</a>
                <a class="nav-link active" href="/ressources/websites">Sites web</a>
                <a class="nav-link" href="/ressources/scientificpublications">Publications scientifiques</a>
                <a class="nav-link" href="/ressources/events">Evenements</a>
            </nav>

            <h1 class="title_page">Sites web</h1>

            {/* Search bar */}
            <form>
                <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                    <div class="input-group">
                    <input type="search" placeholder="Rechercher un site" aria-describedby="button-addon1" class="form-control border-0 bg-light"/>
                    <div class="input-group-append">
                        <button id="button-addon1" type="submit" class="btn btn-link text-primary">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                    </div>
                </div>
            </form>

            {/*-- Button trigger modal --*/}
            <button type="button" class="btn btn-primary btn_add" data-toggle="modal" data-target="#modal_add">Ajouter un site web</button>

            {/*-- Modal add--*/}
            <div class="modal fade" id="modal_add" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Ajout de site web</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit ={(e) => this.submit(e)}>
                                <div class="form-group">
                                    <label for="title">Nom du site</label>
                                    <input type="text" class="form-control" id="title" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="link">Lien</label>
                                    <input type="url" class="form-control" id="link" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="organization">Société</label>
                                    <input type="text" class="form-control" id="organization" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="abstract">Résumé</label>
                                    <textarea class="form-control" id="abstract" onChange={(e) => this.handleChange(e)} required/>
                                </div>
                                <div class="form-group">
                                    <label for="thumbnail">Image</label>
                                    <input type="file" class="form-control" id="thumbnail" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">Ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste of web sites*/}
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" style={{"width":"5%"}}>#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Société</th>
                        <th scope="col" style={{"width":"5%"}}></th>
                    </tr>
                </thead>
                <tbody>
                {
                    sites.map((site, index) => { 
                        return <tr>
                            <th scope="row">{index}</th>
                            <td data-toggle="modal" data-target={"#modal_details"+index}><a href="#">{site.title}</a></td>
                            <td>{site.organization}</td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target={"#modal_update"+index}
                                        onClick={(e) => this.handleChangeUpdate(site.title, site.abstract, site.link, site.organization)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-outline-danger" onClick={() => this.deletePartner(site._id)}>
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
                                            <h5 class="modal-title" id="staticBackdropLabel">{site.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${site.thumbnail}`} class="rounded text-center content_center thumbnail_partner" alt="..."/>
                                            </div>
                                            <div class="card-body">
                                                <div>
                                                    <p class="card-text"><b>Lien : </b><a href={site.link}>{site.link}</a></p>
                                                    <p class="card-text"><b>Société : </b>{site.organization}</p>                
                                                    <p class="card-text"><b>Résume : </b>{site.abstract}</p>                
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                {/* btn update */}
                                                <a href="#" class="btn btn-success" data-toggle="modal" data-target={"#modal_update"+index}
                                                    onClick={(e) => this.handleChangeUpdate(site.title, site.abstract, site.link, site.organization)}>Modifier
                                                </a>
                                                {/* btn delete */}
                                                <a href="#" class="btn btn-danger" onClick={() => this.deletePartner(site._id)}>Supprimer</a>
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
                                            <h5 class="modal-title" id="staticBackdropLabel">{site.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="text-center content_center">
                                                <img src={`${process.env.REACT_APP_HOST_API}/${site.thumbnail}`} class="rounded thumbnail_partner" alt="..."/>
                                            </div>
                                            <form  onSubmit={(e) => this.submitUpdateThumbnail(e, site._id)}>
                                                <div class="form-group">
                                                    <label for="thumbnail">Image</label>
                                                    <input type="file" class="form-control" id="thumbnail" accept="image/png, image/jpeg" onChange={(e) => this.handleChangeThumbnail(e)} required/>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-primary">Modifier l'image</button>
                                                </div>
                                            </form>
                                            <form onSubmit={(e) => this.submitUpdate(e, site._id)}>
                                                <div class="form-group">
                                                    <label for="title">Nom du site</label>
                                                    <input type="text" class="form-control" id="title" defaultValue={site.title} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="link">Lien</label>
                                                    <input type="url" class="form-control" id="link" defaultValue={site.link} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="organization">Société</label>
                                                    <input type="text" class="form-control" id="organization" defaultValue={site.organization} onChange={(e) => this.handleChange(e)} required/>
                                                </div>
                                                <div class="form-group">
                                                    <label for="abstract">Résumé</label>
                                                    <input type="text" class="form-control" id="abstract" defaultValue={site.abstract} onChange={(e) => this.handleChange(e)} required/>
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

export default connect(mapStateToProps, null)(WebSites);
